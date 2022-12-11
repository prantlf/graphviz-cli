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

export const engines: string[]
export const formats: string[]

export function renderGraphFromSource (source?: Source, options?: Options): Promise<string>
