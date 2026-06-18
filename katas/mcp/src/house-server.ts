import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
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

const readHouseState = (): HouseState => {
  const content = fs.readFileSync(HOUSE_FILE_PATH, 'utf-8')
  return JSON.parse(content)
}

const writeHouseState = (state: HouseState): void => {
  fs.writeFileSync(HOUSE_FILE_PATH, JSON.stringify(state, null, 2), 'utf-8')
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
  async ({ deviceId, value }) => {
    try {
      const state = readHouseState()
      if (!state.devices[deviceId]) {
        return {
          content: [{ type: 'text', text: `Erreur : L'appareil '${deviceId}' n'existe pas.` }],
          isError: true,
        }
      }

      const device = state.devices[deviceId]
      const oldValue = device.value
      device.value = value
      writeHouseState(state)

      return {
        content: [
          {
            type: 'text',
            text: `Succès : L'appareil '${device.name}' (${deviceId}) a été mis à jour de '${oldValue}' à '${value}'.`,
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
