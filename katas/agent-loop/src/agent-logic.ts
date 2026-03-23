import { tools } from './tools.js'
import type { Action, Tool } from './types.js'

export const analyzeContext = (prompt: string): Map<string, boolean> => {
  const p = prompt.toLowerCase()
  const context = new Map<string, boolean>()

  context.set('has_secret_result', p.includes('le code secret est 42'))
  context.set('has_calc_result', p.includes('résultat outil : 25'))

  return context
}

const extractResults = (prompt: string): string => {
  const p = prompt.toLowerCase()
  const parts: string[] = []
  if (p.includes('le code secret est 42')) parts.push('le code secret est 42')
  if (p.includes('résultat outil : 25')) parts.push('le résultat du calcul est 25')
  if (parts.length === 0) return ''
  return `${parts.join(', ')}. `
}

export const decideAction = (prompt: string): Action => {
  const context = analyzeContext(prompt)
  const p = prompt.toLowerCase()

  const needsSecret = p.includes('secret')
  const needsCalc =
    p.includes('calcule') || p.includes('calcul') || p.includes('*') || p.includes('+')
  const needsNothing = !needsSecret && !needsCalc

  const allDone =
    (!needsSecret || context.get('has_secret_result')) &&
    (!needsCalc || context.get('has_calc_result'))

  if (!needsNothing && allDone) {
    const results = extractResults(prompt)
    return { type: 'complete', message: `${results}Objectif atteint ! Fin de la mission.` }
  }

  if (needsSecret && !context.get('has_secret_result')) {
    return {
      type: 'use_tool',
      toolName: 'get_secret_info',
      message: `Vous devriez utiliser l'outil 'get_secret_info'.`,
    }
  }

  if (needsCalc && !context.get('has_calc_result')) {
    const goal = p.split('objectif :')[1]?.split('mémoire :')[0]?.trim() || ''
    const tool = getToolByName('complex_calculation')
    const calcArgs = tool?.parseArgs?.(goal) || [3, 5]
    return {
      type: 'use_tool',
      toolName: 'complex_calculation',
      args: calcArgs,
      message: `Vous devriez utiliser l'outil 'complex_calculation' avec les arguments ${calcArgs.join(', ')}.`,
    }
  }

  const timeTool = tools.find(t => t.keywords.some(kw => p.includes(kw)))
  if (timeTool) {
    return {
      type: 'use_tool',
      toolName: timeTool.name,
      message: `Vous devriez utiliser l'outil '${timeTool.name}'.`,
    }
  }

  if (p.includes('objectif atteint') || p.includes('fin')) {
    const results = extractResults(prompt)
    return { type: 'complete', message: `${results}Objectif atteint ! Fin de la mission.` }
  }

  return {
    type: 'unknown',
    message: 'Je ne sais pas comment répondre. Essayez une autre approche ou demandez un outil.',
  }
}

export const getToolByName = (name: string): Tool | undefined => {
  return tools.find(tool => tool.name === name)
}

export const executeToolAction = (action: Action): unknown => {
  if (action.type !== 'use_tool' || !action.toolName) {
    return null
  }

  const tool = getToolByName(action.toolName)
  if (!tool) {
    throw new Error(`Tool not found: ${action.toolName}`)
  }

  return tool.execute(action.args || [])
}

export const processResponse = (action: Action): string => {
  return action.message || 'Action inconnue'
}
