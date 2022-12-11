import { createGraphExample, configureGraphviz } from './graph-support.js'
import dot2svg from '@aduh95/viz.js/async'
import benchmnark from 'benchmark'

const { Suite } = benchmnark
const { graph, dot } = createGraphExample()
const options = configureGraphviz('svg')

function renderWithExec (deferred) {
  graph.render(options, () => deferred.resolve(), (_code, _output, message) => console.error(message))
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
