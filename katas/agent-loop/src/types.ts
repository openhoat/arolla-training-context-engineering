export interface Tool {
  name: string
  description: string
  execute: (args: unknown[]) => unknown
  keywords: string[]
  parseArgs?: (goal: string) => unknown[]
}

export interface Action {
  type: 'use_tool' | 'complete' | 'unknown'
  toolName?: string
  args?: unknown[]
  message: string
}
