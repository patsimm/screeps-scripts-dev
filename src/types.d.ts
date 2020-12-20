import { CreepRole } from "./creep-roles"

declare global {
  interface CreepMemory {
    role: CreepRole
  }

  interface RoomMemory {
    minHarvesters: number
  }

  interface Memory {
    creepCounter: { [key in CreepRole]: number }
  }
}
