const { formats, renderGraphFromSource } = require('../lib/index')
const convertSVGToPNG = require('../lib/svg-to-png')
const { join } = require('path')
const { promisify } = require('util')
const readFile = promisify(require('fs').readFile)

exports['test cli generates expected output'] = async assert => {
  for (const format of formats) {
    const encoding = format === 'png' ? undefined : 'utf-8'
    const expected = await readFile(join(__dirname, `expected/hello.dot.${format}`), encoding)
    const actual = await readFile(join(__dirname, `actual/hello.dot.${format}`), encoding)
    if (format === 'png') {
      if (process.env.CI) console.log(`Skipping PNG test. Size ${actual.length} bytes.`)
      else assert.ok(expected.equals(actual), format)
    } else {
      assert.strictEqual(expected, actual, format)
    }
  }
}

exports['test renderGraphFromSource accepts undefined options'] = async assert => {
  const output = await renderGraphFromSource({ input: 'graph G {}' })
  assert.ok(output, 'generates output')
}

exports['test renderGraphFromSource fails with wrong nop'] = async assert => {
  try {
    await renderGraphFromSource({ input: 'graph G {}' }, { nop: 2 })
    assert.fail({ message: 'fails' })
  } catch (error) {
    assert.ok(error.message, 'fails')
  }
}

exports['test SVG of unknown size is detected'] = async assert => {
  try {
    await convertSVGToPNG('<svg width="109x" height="158x"')
    assert.fail({ message: 'fails' })
  } catch (error) {
    assert.ok(error.message, 'fails')
  }
}

exports['test SVG with invalid content is detected'] = async assert => {
  try {
    await convertSVGToPNG('<svg width="109pt" height="158pt"><</svg>')
    assert.fail({ message: 'fails' })
  } catch (error) {
    assert.ok(error.message, 'fails')
  }
}

if (require.main === module) require('test').run(exports)
