import type { Tool } from './types.js'

export const tools: Tool[] = [
  {
    name: 'get_current_time',
    description: "Récupère l'heure actuelle",
    execute: () => new Date().toLocaleString(),
    keywords: ['heure', 'temps', 'time'],
  },
  {
    name: 'get_secret_info',
    description: "Récupère l'information secrète",
    execute: () => 'Le code secret est 42.',
    keywords: ['secret'],
  },
  {
    name: 'complex_calculation',
    description: 'Effectue un calcul complexe',
    execute: (args: unknown[]) => {
      const [a, b, c] = args as [number, number, number]
      return a * b + (c ?? 10)
    },
    parseArgs: (goal: string) => {
      const fullMatch = goal.match(/(\d+)\s*\*\s*(\d+)(?:\s*\+\s*(\d+))?/)
      if (fullMatch) {
        const args = [Number.parseInt(fullMatch[1], 10), Number.parseInt(fullMatch[2], 10)]
        if (fullMatch[3]) args.push(Number.parseInt(fullMatch[3], 10))
        return args
      }
      const simpleMatch = goal.match(/(\d+)\s*\*\s*(\d+)/)
      if (simpleMatch) {
        return [Number.parseInt(simpleMatch[1], 10), Number.parseInt(simpleMatch[2], 10)]
      }
      return []
    },
    keywords: ['calcule', 'calcul', 'calculate'],
  },
]
