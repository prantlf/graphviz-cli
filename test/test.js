import { engines, formats, renderGraphFromSource } from 'graphviz-cli'
import convertSVGToPNG from '../lib/svg-to-png.js'
import tehanu from 'tehanu'
import { ok, strictEqual } from 'assert'

const test = tehanu(import.meta.url)

test('test exports layout engines', () => {
  ok(Array.isArray(engines), 'exported')
  ok(engines.length > 0, 'not empty')
})

test('test exports output formats', () => {
  ok(Array.isArray(formats), 'exported')
  ok(formats.length > 0, 'not empty')
})

test('test exports functions', () => {
  strictEqual(typeof renderGraphFromSource, 'function')
  strictEqual(typeof convertSVGToPNG, 'function')
})
