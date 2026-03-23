// biome-ignore lint/correctness/noUnusedImports: FIXME
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// biome-ignore lint/correctness/noUnusedVariables: FIXME
const HOUSE_FILE_PATH = path.join(__dirname, 'house.json')

const server = new McpServer({ name: 'smart-house', version: '1.0.0' })

interface Device {
  name: string
  value: string
  type: string
}

interface HouseState {
  devices: Record<string, Device>
}

// TODO Étape 1 : Implémenter la lecture de l'état
const readHouseState = (): HouseState => {
  // 1. Lire le contenu du fichier HOUSE_FILE_PATH en format 'utf-8'
  // 2. Parser le contenu en JSON et le retourner
  return { devices: {} } // TODO: À remplacer par la vraie logique
}

// TODO Étape 2 : Implémenter l'écriture de l'état
// biome-ignore lint/correctness/noUnusedVariables: FIXME
// biome-ignore lint/correctness/noUnusedFunctionParameters: FIXME
const writeHouseState = (state: HouseState): void => {
  // 1. Convertir l'objet 'state' en chaîne de caractères JSON formatée (avec une indentation de 2 espaces)
  // 2. Écrire ce JSON dans le fichier HOUSE_FILE_PATH
}

// Outil pour lire l'état de la maison
server.registerTool(
  'get_house_state',
  {
    description:
      "Récupère l'état actuel de tous les objets connectés de la maison (lumières, thermostat, alarme, portes).",
    inputSchema: z.object({}),
  },
  async () => {
    try {
      const state = readHouseState()
      let output = '=== État de la Maison Connectée ===\n'
      for (const [id, device] of Object.entries(state.devices)) {
        output += `- ${device.name} (${id}) : ${device.value} [Type: ${device.type}]\n`
      }
      return {
        content: [{ type: 'text', text: output }],
      }
    } catch (e: unknown) {
      return {
        content: [
          { type: 'text', text: `Erreur lors de la lecture de l'état : ${(e as Error).message}` },
        ],
        isError: true,
      }
    }
  }
)

// Outil pour modifier l'état d'un appareil
server.registerTool(
  'set_device_state',
  {
    description: "Modifie l'état d'un appareil connecté spécifique dans la maison.",
    inputSchema: z.object({
      deviceId: z
        .string()
        .describe("L'identifiant de l'appareil (ex: 'lumiere_salon', 'thermostat', 'alarme')"),
      value: z
        .string()
        .describe(
          "La nouvelle valeur à appliquer (ex: 'on', 'off', '18', 'armed', 'disarmed', 'locked', 'unlocked')"
        ),
    }),
  },
  // biome-ignore lint/correctness/noUnusedFunctionParameters: FIXME
  async ({ deviceId, value }) => {
    try {
      // TODO Étape 3 : Compléter la logique de modification
      // 1. Lire l'état actuel de la maison
      // 2. Vérifier si l'appareil (deviceId) existe dans state.devices. Si non, renvoyer une erreur.
      // 3. Conserver l'ancienne valeur pour l'afficher dans le message de succès.
      // 4. Mettre à jour la valeur de l'appareil.
      // 5. Sauvegarder le nouvel état dans le fichier JSON.

      return {
        content: [
          {
            type: 'text',
            text: `TODO: Renvoyer un message de succès indiquant que l'appareil a été mis à jour de l'ancienne valeur vers la nouvelle.`,
          },
        ],
      }
    } catch (e: unknown) {
      return {
        content: [
          { type: 'text', text: `Erreur lors de la modification : ${(e as Error).message}` },
        ],
        isError: true,
      }
    }
  }
)

const transport = new StdioServerTransport()
await server.connect(transport)
