import type * as readline from 'node:readline/promises'
import { decideAction, executeToolAction, getToolByName, processResponse } from './agent-logic.js'
import { logger } from './logger.js'

export const agentLoop = async (
  goal: string,
  rl: readline.Interface,
  memory: string[],
  maxIterations: number = 10
): Promise<void> => {
  let iteration = 0
  while (true) {
    iteration++

    if (iteration > maxIterations) {
      logger.info(`\n⏱️ Limite de ${maxIterations} itérations atteinte !`)
      logger.info(`Mémoire finale : ${memory.join(' | ')}`)
      break
    }

    logger.debug(`--- Itération ${iteration} ---`)
    logger.debug(`Mémoire avant: ${memory.length} éléments`)
    logger.info(`\n[${iteration}]`)

    const prompt = `Objectif : ${goal}\nMémoire : ${memory.join(' | ')}\nProchaine action :`
    const action = decideAction(prompt)
    const response = processResponse(action)

    logger.debug(`🤖 Réponse du LLM : ${response}`)
    memory.push(response)

    logger.debug(`Mémoire après: ${memory.length} éléments`)

    if (action.type === 'use_tool' && action.toolName) {
      try {
        const result = executeToolAction(action)
        const tool = getToolByName(action.toolName)
        logger.debug(`🛠️ Résultat de l'outil (${tool?.name}) : ${result}`)
        logger.info(`  → ${tool?.name}: ${result}`)
        memory.push(`Résultat outil : ${result}`)
      } catch (error) {
        logger.error(`Erreur lors de l'exécution de l'outil: ${error}`)
      }
    }

    if (action.type === 'complete') {
      logger.success(action.message)
      break
    }

    await rl.question('\n⌨️ Appuyez sur Entrée pour continuer le tour de boucle...')
  }
}
