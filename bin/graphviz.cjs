#!/usr/bin/env node

const { inspect } = require('util')
const { version } = require('../package.json')
const { engines, formats, renderGraphFromSource } = require('..')

const sources = []
let singleOutput, manyOutputs, verbose
let engine = 'dot'
let format = 'dot'
let yInvert = false
let nop

function usage () {
  process.stdout.write(`Generates graph images from Graphviz source scripts.

Usage: graphviz [-Vvy?] [-(KTon)<value>] <dot files>

Options:
  -Tv           - set output format to 'v'
  -Kv           - set layout engine to 'v' (overrides source script)
  -ofile        - write output to 'file'
  -O            - automatically generate an output filename based on the input
                  filename with a .'format' appended. (Causes all -ofile
                  options to be ignored.)
  -y            - invert y coordinate in output
  -n[v]         - no layout mode 'v' (=1)
  -v            - enable verbose mode
  -V            - print version and exit
  -?            - print usage and exit

Available layout engines are: ${engines.join(', ')}.
The default is dot. Available output formats are: ${formats.slice(0, 4).join(', ')},
${formats.slice(4).join(', ')}. The default is dot.

Examples:
  graphviz -Tsvg -O diagrams/*.dot
  graphviz -Tpng -Kneato -odiagram.png diagram.dot
`)
  process.exit(0)
}

function fail (message) {
  if (message instanceof Error) message = verbose ? message.stack : message.message
  log(message)
  process.exit(1)
}

function log (message) {
  process.stderr.write(`${message}
`)
}

// iterate over all arguments staring after the node and script
for (let i = 2, args = process.argv, l = args.length; i < l; ++i) {
  const name = args[i]
  let match
  // recognize -<Option>[Value]
  if ((match = /^-([?a-zA-Z])([^ ]+)?$/.exec(name))) {
    const checkNoValue = () => {
      if (match[2]) fail(`'Unexpected option value: "${match[0]}".`)
    }
    switch (match[1]) {
      case 'K':
        engine = match[2]
        if (!engine) fail('`Missing engine layout.')
        continue
      case 'T':
        format = match[2]
        if (!format) fail('Missing output output format.')
        continue
      case 'n':
        nop = match[2]
        /* c8 ignore next */
        nop = nop ? +nop : 0
        if (nop !== 0 && nop !== 1) fail(`Invalid no-layout mode: "${match[2]}".`)
        continue
      case 'o':
        singleOutput = match[2]
        if (!singleOutput) fail('Missing output file name.')
        continue
      case 'O':
        checkNoValue()
        manyOutputs = true
        continue
      case 'y':
        checkNoValue()
        yInvert = true
        continue
      case 'v':
        checkNoValue()
        verbose = true
        continue
      case 'V':
        checkNoValue()
        process.stdout.write(`${version}
`)
        process.exit(0)
        /* istanbul ignore next */
        break
      case '?':
        checkNoValue()
        usage()
    }
    fail(`Unknown option: "${match[0]}".`)
  }
  // arguments not starting with dash are script file names
  sources.push(name)
}

async function processSources () {
  const options = { engine, format, yInvert, nop }
  if (verbose) log(`Using options ${inspect(options)}.`)
  if (!sources.length) {
    if (verbose) {
      const output = singleOutput ? `"${singleOutput}"` : 'to standard output'
      log(`Reading from standard input, writing ${output}.`)
    }
    const output = await renderGraphFromSource({}, { name: singleOutput, ...options })
    if (!singleOutput) process.stdout.write(output)
  }
  return Promise.all(sources.map(async name => {
    const outputName = manyOutputs ? `${name}.${format}` : singleOutput
    if (verbose) {
      const output = outputName ? `"${outputName}"` : 'to standard output'
      log(`Reading "${name}", writing ${output}.`)
    }
    const output = await renderGraphFromSource({ name }, { name: outputName, ...options })
    if (!outputName) process.stdout.write(output)
  }))
}

processSources().catch(fail)
