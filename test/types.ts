import { engines, formats, renderGraphFromSource } from 'graphviz-cli'

export const _engines: string[] = engines
export const _formats: string[] = formats

interface Source {
  name?: string
  input?: string
}

interface Options {
  name?: string
  engine?: 'circo' | 'dot' | 'fdp' | 'neato' | 'osage' | 'twopi'
  format?: 'svg' | 'png' | 'dot' | 'xdot' | 'plain' | 'plain-ext' | 'ps' | 'ps2' | 'json' | 'json0' | 'canon'
  yInvert?: boolean
  nop?: 0 | 1
}

const _graph: Promise<string> = renderGraphFromSource ({}, {})

renderGraphFromSource ({
  name: '',
  input: ''
}, {
  name: '',
  engine: 'circo',
  format: 'svg',
  yInvert: true,
  nop: 0
})
