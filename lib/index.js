const renderGraph = require('@aduh95/viz.js/async')
const readStandardInput = require('./read-stdin')
const { promisify } = require('util')
const { readFile: readFileOld, writeFile: writeFileOld } = require('fs')
const readFile = promisify(readFileOld)
const writeFile = promisify(writeFileOld)
let convertSVGToPNG

const engines = ['circo', 'dot', 'fdp', 'neato', 'osage', 'twopi']
const formats = ['svg', 'png', 'dot', 'xdot', 'plain', 'plain-ext', 'ps', 'ps2', 'json', 'json0']

function getConvertSVGToPNG () {
  if (!convertSVGToPNG) convertSVGToPNG = require('./svg-to-png')
  return convertSVGToPNG
}

async function renderGraphFromSource ({ name: inputName, input } = {},
  { name: outputName, engine, format, yInvert, nop } = {}) {
  if (engine && !engines.includes(engine)) throw new Error(`Invalid layout engine: "${engine}".`)
  if (format && !formats.includes(format)) throw new Error(`Invalid output format: "${format}".`)
  if (nop !== undefined && nop !== 0 && nop !== 1) throw new Error(`Invalid no-layout mode: "${nop}".`)
  if (!input) input = await (inputName ? readFile(inputName, 'utf-8') : readStandardInput())
  const isPNG = format === 'png'
  if (isPNG) format = 'svg'
  let output = await renderGraph(input, { engine, format, yInvert })
  if (isPNG) output = await getConvertSVGToPNG()(output)
  if (outputName) await writeFile(outputName, output)
  return output
}

module.exports = { engines, formats, renderGraphFromSource }
