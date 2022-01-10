const { Canvas, Image } = require('canvas')

const svgSizeRegExp = /<svg width="(\d+)pt" height="(\d+)pt"/

function convertSVGToPNG (svg) {
  return new Promise((resolve, reject) => {
    const size = svgSizeRegExp.exec(svg)
    if (!size) throw new Error('Unknown SVG size.')
    const canvas = new Canvas(size[1] / 0.75, size[2] / 0.75)
    const context = canvas.getContext('2d')
    const image = new Image()
    image.onload = () => {
      try {
        context.drawImage(image, 0, 0)
        resolve(canvas.toBuffer())
      } catch (error) {
        /* istanbul ignore next */
        reject(error)
      }
    }
    image.onerror = reject
    image.src = Buffer.from(svg)
  })
}

module.exports = convertSVGToPNG
