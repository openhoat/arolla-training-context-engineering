/** biome-ignore-all lint/suspicious/noConsole: only place where console is allowed */
export type LogLevel = 'info' | 'debug'

/**
 * Utilitaire de journalisation qualitatif écrivant directement sur les flux de sortie
 * standard (stdout) et d'erreur standard (stderr) du processus Node.js, avec coloration ANSI.
 */
export const logger = {
  /**
   * Récupère le niveau de log actuel à partir de la variable d'environnement.
   * Par défaut, retourne 'info' sauf si LOG_LEVEL=debug est explicitement défini.
   */
  getLevel: (): LogLevel => {
    const envLevel = process.env.LOG_LEVEL?.toLowerCase()
    return envLevel === 'debug' ? 'debug' : 'info'
  },

  /**
   * Écrit un message informatif standard sur stdout.
   */
  info: (message: string): void => {
    process.stdout.write(`${message}\n`)
  },

  /**
   * Écrit un message de debug (gris) sur stdout uniquement si le niveau est configuré à 'debug'.
   */
  debug: (message: string): void => {
    if (logger.getLevel() === 'debug') {
      process.stdout.write(`\x1b[90m⚙️  [DEBUG] ${message}\x1b[0m\n`)
    }
  },

  /**
   * Écrit un en-tête d'étape (cyan) sur stdout.
   */
  header: (message: string): void => {
    process.stdout.write(`\n\x1b[36m${message}\x1b[0m\n`)
  },

  /**
   * Écrit un message de succès (vert) sur stdout.
   */
  success: (message: string): void => {
    process.stdout.write(`\n✅ \x1b[32m${message}\x1b[0m\n`)
  },

  /**
   * Écrit un message d'erreur (rouge) sur stderr.
   */
  error: (message: string | Error): void => {
    const text = message instanceof Error ? message.stack || message.message : message
    process.stderr.write(`❌ \x1b[31m${text}\x1b[0m\n`)
  },
}
