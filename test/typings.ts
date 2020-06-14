import { engines, formats, renderGraphFromSource } from '../lib/index'

exports['test exports layout engines'] = assert => {
  assert.ok(Array.isArray(engines), 'exported')
  assert.ok(engines.length > 0, 'not empty')
}

exports['test exports outout formats'] = assert => {
  assert.ok(Array.isArray(formats), 'exported')
  assert.ok(formats.length > 0, 'not empty')
}

/* eslint-disable @typescript-eslint/no-unused-vars */
exports['lint exports'] = async () => {
  const output: string = await renderGraphFromSource()
  await renderGraphFromSource({})
  await renderGraphFromSource(undefined, {})
  await renderGraphFromSource({ name: '', input: '' },
    { name: '', engine: 'dot', format: 'dot', yInvert: true, nop: 0 })
}

if (require.main === module) require('test').run(exports) // eslint-disable-line @typescript-eslint/no-var-requires
