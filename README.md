# graphviz-cli

[![npm](https://img.shields.io/npm/v/graphviz-cli)](https://www.npmjs.com/package/graphviz-cli#top)
[![codecov](https://codecov.io/gh/prantlf/graphviz-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/prantlf/graphviz-cli)
[![codebeat badge](https://codebeat.co/badges/9d85c898-df08-42fb-8ab9-407dc2ce2d22)](https://codebeat.co/projects/github-com-prantlf-graphviz-cli-master)
![Dependency status](https://img.shields.io/librariesio/release/npm/graphviz-cli)

Command-line tool and [API] for generating graph images from [Graphviz] source scripts.

Features:

* Runs in pure JavaScript. Except for the `png` output.
* No need to install the native [Graphviz] package.
* Most output formats of the native [Graphviz] (inluding `svg` and `png`) available.
* TypeScript type declarations (typings) for the [API].
* [A lot faster](perf/README.md) then calling `dot` as a separate process.

Uses [@aduh95/viz.js] to render [Graphviz] scripts in pure JavaScript by [WASM]. Uses [node-canvas] for the optional `png` output.

Related tools:

* [graphviz-builder] - generates the source script for [Graphviz] consumable by this tool
* [graphviz-webcomponent] - WebComponent for web browsers to display graph images from the source scripts in HTML pages on-the-fly

## Synopsis

```
graphviz -Tsvg -ohello.svg hello.dot
```

```js
import { renderGraphFromSource } from 'graphviz-cli'
// Render a string with the graph script to a string with the SVG output.
const svg = await renderGraphFromSource({ input: 'graph G { ... }' }, { format: 'svg' })
// Render a file with a graph script to a file with the PNG output.
await renderGraphFromSource({ name: 'hello.dot' }, { format: 'png', name: 'hello.png' })
```

## Installation

Make sure that you have installed [Node.js] 14.8 or newer.

If you want to use the command-line tool, install this package globally using your favourite package manager ([NPM], [Yarn] or [PNPM]):

```
npm i -g graphviz-cli
yarn global add graphviz-cli
pnpm i -g graphviz-cli
```

If you want to use this package programmatically, install it locally using your favourite package manager. Add `-D` on the command line if you need the tool only to build you package:

```
npm i graphviz-cli
yarn add graphviz-cli
pnpm i graphviz-cli
```

If you want to render graphs to `png`, install the [node-canvas] module in addition. Add `-g/global` or `-D` arguments according to you choice above:

```
npm i canvas
yarn add canvas
pnpm i canvas
```

Starting from the version 2.0.0, [node-canvas] is not a peer dependency any more, because NPM installs the peer dependencies automatically, making them not optional any more.

## Command-line

Command-line parameters are the same as for the `dot` tool from the [Graphviz] package, as long as they are implemented, of course.

```
$ graphviz -?

Generates graph images from Graphviz source scripts.

Usage: graphviz [-Vvy?] [-(KTon)<value>] <dot files>

Options:
  -Tv           - set output format to 'v'
  -Kv           - set layout engine to 'v' (overrides source script)
  -ofile        - write output to 'file'
  -O            - automatically generate an output filename based on the input
                  filename with a .'format' appended. (Causes all -ofile
                  options to be ignored.)
  -y            - invert y coordinate in output
  -n[v]         - no layout mode 'v' (=1)
  -v            - enable verbose mode
  -V            - print version and exit
  -?            - print usage and exit

Examples:
  graphviz -Tsvg -O diagrams/*.dot
  graphviz -Tpng -Kneato -odiagram.png diagram.dot
```

## API

### renderGraphFromSource(source: object, options: object): Promise\<string | Buffer\>

Renders a graph script to a specified output. If the output format is binary (`png`, for example), the Promise will contain `Buffer` instead of `string`.

```js
import { renderGraphFromSource } from 'graphviz-cli'
// Render a string with the graph script to a string with the SVG output.
const svg = await renderGraphFromSource({ input: 'graph G { ... }' }, { format: 'svg' })
// Render a file with a graph script to a file with the PNG output.
await renderGraphFromSource({ name: 'hello.dot' }, { format: 'png', name: 'hello.png' })
```

Source properties:

|  name   |  type    | description                     |
|---------|----------|---------------------------------|
| `name`  | `string` | file name with the graph script |
| `input` | `string` | graph script                    |

If neither `name` nor `input` are provided, or the whole `source` parameter is omitted, the graph script will be read from the standard input.

Available options:

|  name     |  type     | description                                 |
|-----------|-----------|---------------------------------------------|
| `name`    | `string`  | file name for the generated graph output    |
| `engine`  | `string`  | type of the layout to use for the graph rendering (`circo`, `dot`, `fdp`, `neato`, `osage`, `twopi`, default is `dot`)                   |
| `format`  | `string`  | type of the output for the rendered graph (`svg`, `png`, `dot`, `xdot`, `plain`, `plain-ext`, `ps`, `ps2`, `json`, `json0`, `canon`, default is `dot`) |
| `yInvert` | `boolean` | invert the y-coordinate in the graph output |
| `nop`     | `number`  | no layout mode 'v' (`0` or `1`)             |

If `name` is not provided the output will be available only in the Promise. If the format `png` is specified, the NPM module [node-canvas] has to be installed, which is required as a peer-dependency of this package.

### engines

List of available graph layout engines: `circo`, `dot`, `fdp`, `neato`, `osage`, `twopi`.

### formats

List of available graph outout formats: `svg`, `png`, `dot`, `xdot`, `plain`, `plain-ext`, `ps`, `ps2`, `json`, `json0`, `canon`.

## License

Copyright (c) 2020-2022 Ferdinand Prantl

Licensed under the MIT license.

[Graphviz]: https://graphviz.org/
[WASM]: https://developer.mozilla.org/en-US/docs/WebAssembly
[@aduh95/viz.js]: https://github.com/aduh95/viz.js#readme
[node-canvas]: https://github.com/Automattic/node-canvas#readme
[graphviz-builder]: https://github.com/prantlf/graphviz-builder#readme
[graphviz-webcomponent]: https://github.com/prantlf/graphviz-webcomponent#readme
[Node.js]: https://nodejs.org/
[NPM]: https://docs.npmjs.com/cli/npm
[Yarn]: https://classic.yarnpkg.com/docs/cli/
[PNPM]: https://pnpm.js.org/pnpm-cli
[API]: #api
