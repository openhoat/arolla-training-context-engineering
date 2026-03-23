import { stdin as input, stdout as output } from 'node:process'
import * as readline from 'node:readline/promises'
import { agentLoop } from './agent-loop.js'
import { logger } from './logger.js'
import { tools } from './tools.js'

export const startAgent = async (goal: string): Promise<void> => {
  const rl = readline.createInterface({ input, output })
  const memory: string[] = []

  logger.info(`\n🚀 Objectif de l'agent : ${goal}`)
  if (logger.getLevel() === 'debug') {
    logger.info(
      `\n📋 Outils disponibles:\n${tools.map(t => `- ${t.name}: ${t.description}`).join('\n')}\n`
    )
  }

  try {
    await agentLoop(goal, rl, memory)
  } finally {
    rl.close()
  }
}

const goal = process.argv[2] || 'Trouve le code secret et calcule 3*5+10.'
startAgent(goal).catch(err => {
  logger.error(err.stack)
  process.exit(1)
})
