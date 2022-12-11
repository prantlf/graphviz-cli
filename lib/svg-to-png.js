import { Canvas, Image } from'canvas'

const svgSizeRegExp = /<svg width="(\d+)pt" height="(\d+)pt"/

export default function convertSVGToPNG (svg) {
  return new Promise((resolve, reject) => {
    const size = svgSizeRegExp.exec(svg)
    /* c8 ignore next */
    if (!size) throw new Error('Unknown SVG size.')
    const canvas = new Canvas(size[1] / 0.75, size[2] / 0.75)
    const context = canvas.getContext('2d')
    const image = new Image()
    image.onload = () => {
      try {
        context.drawImage(image, 0, 0)
        resolve(canvas.toBuffer())
      /* c8 ignore next 3 */
      } catch (error) {
        reject(error)
      }
    }
    image.onerror = reject
    image.src = Buffer.from(svg)
  })
}
