const { formats, renderGraphFromSource } = require('graphviz-cli')
const convertSVGToPNG = require('../lib/svg-to-png.cjs')
const { join } = require('path')
const { readFile } = require('fs/promises')
const test = require('tehanu')(__filename)
const { fail, ok, strictEqual } = require('assert')

test('test cli generates expected output', async () => {
  for (const format of formats) {
    const encoding = format === 'png' ? undefined : 'utf-8'
    const expected = await readFile(join(__dirname, `expected/hello.dot.${format}`), encoding)
    const actual = await readFile(join(__dirname, `actual/hello.dot.${format}`), encoding)
    if (format === 'png') {
      if (process.env.CI) console.log(`Skipping PNG test. Size ${actual.length} bytes.`)
      else ok(expected.equals(actual), format)
    } else {
      strictEqual(expected, actual, format)
    }
  }
})

test('test renderGraphFromSource accepts undefined options', async () => {
  const output = await renderGraphFromSource({ input: 'graph G {}' })
  ok(output, 'generates output')
})

test('test renderGraphFromSource fails with wrong nop', async () => {
  try {
    await renderGraphFromSource({ input: 'graph G {}' }, { nop: 2 })
    fail({ message: 'fails' })
  } catch (error) {
    ok(error.message, 'fails')
  }
})

test('test SVG of unknown size is detected', async () => {
  try {
    await convertSVGToPNG('<svg width="109x" height="158x"')
    fail({ message: 'fails' })
  } catch (error) {
    ok(error.message, 'fails')
  }
})

test('test SVG with invalid content is detected', async () => {
  try {
    await convertSVGToPNG('<svg width="109pt" height="158pt"><</svg>')
    fail({ message: 'fails' })
  } catch (error) {
    ok(error.message, 'fails')
  }
})
