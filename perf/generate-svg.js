const { createGraphExample, configureGraphviz } = require('./graph-support')
const dot2svg = require('@aduh95/viz.js/async')
const { Suite } = require('benchmark')

const { graph, dot } = createGraphExample()
const options = configureGraphviz('svg')

function renderWithExec (deferred) {
  graph.render(options, () => deferred.resolve(), (code, output, message) => console.error(message))
}

function renderWithWasm (deferred) {
  dot2svg(dot).then(() => deferred.resolve(), error => console.error(error))
}

const suite = new Suite()
console.log('generate-svg:')
suite
  .add('exec', renderWithExec, { defer: true })
  .add('wasm', renderWithWasm, { defer: true })
  .on('cycle', ({ target }) => console.log(`  ${String(target)}`))
  .on('complete', () => console.log(`  fastest is ${suite.filter('fastest').map('name')}`))
  .run({ async: true })
