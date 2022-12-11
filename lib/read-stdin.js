export default function readStandardInput () {
  return new Promise(resolve => {
    let input = ''
    process.stdin.setEncoding('utf8')
    process.stdin
      .on('data', chunk => (input += chunk))
      .on('end', () => resolve(input))
      .resume()
  })
}
