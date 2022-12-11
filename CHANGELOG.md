# [2.0.0](https://github.com/prantlf/graphviz-cli/compare/v1.0.1...v2.0.0) (2022-12-11)

### Features

* Support ESM, upgrade dependencies ([dbb0927](https://github.com/prantlf/graphviz-cli/commit/dbb09277072a7ec80fe195c25895aec117e8ce19))

### BREAKING CHANGES

* The minimum Node.js version is 14.8 now. Declaring CJS and ESM exports in `package.json` works reliably in Node.js 14.8 or newer.
* The package `canvas` is not a peer dependency any more. NPM 7 or newer installs the peer dependencies automatically, making them not optional any more. If you want to use the output format `png`, install `canvas` in addition to this package.

## [1.0.1](https://github.com/prantlf/graphviz-cli/compare/v1.0.0...v1.0.1) (2022-01-10)

### Bug Fixes

* Upgrade dependencies and fix lint warnings ([ef70977](https://github.com/prantlf/graphviz-cli/commit/ef7097742cc2199c7b825567d9966d28a27f85a7))

## [1.0.0](https://github.com/prantlf/graphviz-cli/compare/v0.0.1...v1.0.0) (2020-06-14)

### Bug Fixes

* Set minimum Node.js version to 12 ([8b922e9](https://github.com/prantlf/graphviz-cli/commit/8b922e9fd9fbf6f9c433a4c2ca23f0a12c15ed6c))

## 0.0.1 (2020-06-14)

Initial release.
