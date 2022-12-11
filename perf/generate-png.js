import { createGraphExample, configureGraphviz } from './graph-support.js'
import dot2svg from '@aduh95/viz.js/async'
import { createCanvas, Image } from 'canvas'
import benchmnark from 'benchmark'

const { Suite } = benchmnark
const { graph, dot } = createGraphExample()
const options = configureGraphviz('png')

function renderWithExec (deferred) {
  graph.render(options, () => deferred.resolve(), (_code, _output, message) => console.error(message))
}

function convertSVGToPNG (svg) {
  return new Promise((resolve, reject) => {
    const canvas = createCanvas(200, 200)
    const context = canvas.getContext('2d')
    const image = new Image()
    image.onload = () => {
      context.drawImage(image, 0, 0)
      resolve(canvas.toBuffer())
    }
    image.onerror = reject
    image.src = Buffer.from(svg)
  })
}

function renderWithWasm (deferred) {
  dot2svg(dot).then(convertSVGToPNG).then(() => deferred.resolve(), error => console.error(error))
}

const suite = new Suite()
console.log('generate-png:')
suite
  .add('exec', renderWithExec, { defer: true })
  .add('wasm', renderWithWasm, { defer: true })
  .on('cycle', ({ target }) => console.log(`  ${String(target)}`))
  .on('complete', () => console.log(`  fastest is ${suite.filter('fastest').map('name')}`))
  .run({ async: true })
