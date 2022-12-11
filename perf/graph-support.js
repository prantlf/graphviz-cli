import { readFileSync } from 'fs'
import { digraph } from 'graphviz'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function mergeDefaults (defaults, options) {
  if (options) {
    for (const name in options) {
      const value = options[name]
      if (value !== undefined) defaults[name] = value
    }
  }
  return defaults
}

export function configureGraphviz (type) {
  return {
    type,
    G: mergeDefaults({
      overlap: false,
      pad: 0.3,
      rankdir: 'LR',
      layout: 'dot',
      bgcolor: '#111111'
    }),
    E: mergeDefaults({
      color: '#757575'
    }),
    N: mergeDefaults({
      fontname: 'Arial',
      fontsize: 14,
      color: '#c6c5fe',
      shape: 'box',
      style: 'rounded',
      height: 0,
      fontcolor: '#c6c5fe'
    })
  }
}

function setNodeColor (node, color) {
  node.set('color', color)
  node.set('fontcolor', color)
}

function createGraph (modules) {
  const graph = digraph('G')
  const nodes = new Map()
  for (const module in modules) {
    const node = getOrCreateNode(module)
    const dependencies = modules[module]
    if (!dependencies.length) setNodeColor(node, '#79d7fc')
    for (const dependency of dependencies) {
      const dependencyNode = getOrCreateNode(dependency)
      if (!modules[dependency]) setNodeColor(dependencyNode, '#cfffac')
      graph.addEdge(node, dependencyNode)
    }
  }
  return graph

  function getOrCreateNode (module) {
    let node = nodes.get(module)
    if (!node) {
      node = graph.addNode(module)
      nodes.set(module, node)
    }
    return node
  }
}

export function createGraphExample () {
  const tree = JSON.parse(readFileSync(`${__dirname}/example.json`, 'utf-8'))
  const graph = createGraph(tree)
  const dot = graph.to_dot()
  return { graph, dot }
}
