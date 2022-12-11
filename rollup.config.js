import replace from 'rollup-plugin-re'

export default [
  {
    input: 'lib/index.js',
    output: {
      file: 'lib/index.cjs',
      format: 'cjs'
    },
    external: ['@aduh95/viz.js/async', 'fs/promises', './svg-to-png.js'],
    plugins: [
      replace({
        patterns: [{
          match: /index\.js$/,
          test: 'await import(\'./svg-to-png.js\')',
          replace: 'require(\'./svg-to-png.cjs\')',
        }]
      })
    ]
  },
  {
    input: 'lib/svg-to-png.js',
    output: {
      file: 'lib/svg-to-png.cjs',
      format: 'cjs'
    },
    external: ['canvas']
  }
]