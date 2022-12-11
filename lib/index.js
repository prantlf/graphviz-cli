import renderGraph from '@aduh95/viz.js/async'
import readStandardInput from './read-stdin.js'
import { readFile, writeFile } from 'fs/promises'

let convertSVGToPNG

export const engines = ['circo', 'dot', 'fdp', 'neato', 'osage', 'twopi']
export const formats = ['svg', 'png', 'dot', 'xdot', 'plain', 'plain-ext', 'ps', 'ps2', 'json', 'json0', 'canon']

async function getConvertSVGToPNG () {
  if (!convertSVGToPNG) {
    try {
      convertSVGToPNG = await import('./svg-to-png.js')
    /* c8 ignore next 4 */
    } catch (err) {
      console.error('Did you forget to install the NPM package "canvas"?')
      throw err
    }
  }
  return convertSVGToPNG
}

export async function renderGraphFromSource ({ name: inputName, input } = {},
  { name: outputName, engine, format, yInvert, nop } = {}) {
  if (engine && !engines.includes(engine)) throw new Error(`Invalid layout engine: "${engine}".`)
  if (format && !formats.includes(format)) throw new Error(`Invalid output format: "${format}".`)
  if (nop !== undefined && nop !== 0 && nop !== 1) throw new Error(`Invalid no-layout mode: "${nop}".`)
  if (!input) input = await (inputName ? readFile(inputName, 'utf-8') : readStandardInput())
  const isPNG = format === 'png'
  if (isPNG) format = 'svg'
  let output = await renderGraph(input, { engine, format, yInvert })
  if (isPNG) output = await (await getConvertSVGToPNG())(output)
  if (outputName) await writeFile(outputName, output)
  return output
}
