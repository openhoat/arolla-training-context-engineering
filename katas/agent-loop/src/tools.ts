import * as fs from 'node:fs'
import * as path from 'node:path'
import type { Tool } from './types.js'

const KATA_DIR = 'katas/agent-loop/src'

const resolvePath = (filePath: string): string => {
  if (fs.existsSync(filePath)) return filePath
  const alt = path.join(KATA_DIR, path.basename(filePath))
  if (fs.existsSync(alt)) return alt
  return filePath
}

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
  {
    name: 'get_code_weather',
    description:
      'Analyse un fichier source pour compter les TODOs et retourne la météo du code (STORMY si >= 3 TODOs, SUNNY sinon)',
    execute: (args: unknown[]) => {
      const rawPath = String(args[0] || 'user-preferences.sample.ts')
      const filePath = resolvePath(rawPath)
      try {
        const content = fs.readFileSync(filePath, 'utf-8')
        const todoCount = (content.match(/TODO/gi) || []).length
        return todoCount >= 3 ? 'STORMY' : 'SUNNY'
      } catch (error) {
        return `ERROR: ${error instanceof Error ? error.message : String(error)}`
      }
    },
    keywords: ['météo', 'weather', 'code', 'todo'],
  },
]
