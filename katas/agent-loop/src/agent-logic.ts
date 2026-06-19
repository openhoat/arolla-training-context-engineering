import { tools } from './tools.js'
import type { Action, Tool } from './types.js'

const WEATHER_KEYWORDS = ['météo', 'meteo', 'weather', 'todo']

const isWeatherGoal = (p: string): boolean => WEATHER_KEYWORDS.some(kw => p.includes(kw))

export const analyzeContext = (prompt: string): Map<string, boolean> => {
  const p = prompt.toLowerCase()
  const context = new Map<string, boolean>()

  context.set('has_secret_result', p.includes('le code secret est 42'))
  context.set('has_calc_result', p.includes('résultat outil : 25'))
  context.set(
    'has_weather_result',
    p.includes('résultat outil :') && (p.includes('stormy') || p.includes('sunny'))
  )

  return context
}

const extractResults = (prompt: string): string => {
  const p = prompt.toLowerCase()
  const parts: string[] = []
  if (p.includes('le code secret est 42')) parts.push('le code secret est 42')
  if (p.includes('résultat outil : 25')) parts.push('le résultat du calcul est 25')
  if (p.includes('résultat outil :') && p.includes('stormy'))
    parts.push('la météo du code est orageuse (STORMY)')
  if (p.includes('résultat outil :') && p.includes('sunny'))
    parts.push('la météo du code est ensoleillée (SUNNY)')
  if (parts.length === 0) return ''
  return `${parts.join(', ')}. `
}

export const decideAction = (prompt: string): Action => {
  const context = analyzeContext(prompt)
  const p = prompt.toLowerCase()

  const needsSecret = p.includes('secret')
  const needsCalc =
    p.includes('calcule') || p.includes('calcul') || p.includes('*') || p.includes('+')
  const weatherGoal = isWeatherGoal(p)
  const needsNothing = !needsSecret && !needsCalc && !weatherGoal

  const allDone =
    (!needsSecret || context.get('has_secret_result')) &&
    (!needsCalc || context.get('has_calc_result')) &&
    (!weatherGoal || context.get('has_weather_result'))

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

  if (weatherGoal && !context.get('has_weather_result')) {
    const goal = p.split('objectif :')[1]?.split('mémoire :')[0]?.trim() || ''
    const fileMatch =
      goal.match(/(?:fichier|file|dans)\s+([^\s]+)/i) ||
      goal.match(/([\w./-]+\.(?:ts|js|tsx|jsx))/i)
    const filePath = fileMatch ? fileMatch[1] : 'user-preferences.sample.ts'
    return {
      type: 'use_tool',
      toolName: 'get_code_weather',
      args: [filePath],
      message: `Vous devriez utiliser l'outil 'get_code_weather' pour analyser le fichier ${filePath}.`,
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
