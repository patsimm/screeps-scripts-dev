import { CreepRole } from "../src/creep-roles"
import { LoDashStatic } from "lodash"
import { CreepActionType } from "../src/creep-actions"

declare global {
  interface CreepMemory {
    role: CreepRole
    action: CreepActionType
    actionTarget: Id<any>
    actionCounter: number
    triedTargets: Array<Id<any>>
  }

  interface RoomMemory {
    creepTargetAmounts: { [key in CreepRole]: number }
    buildOrder: BuildableStructureConstant[]
    unloadOrder: Array<
      | STRUCTURE_EXTENSION
      | STRUCTURE_FACTORY
      | STRUCTURE_LAB
      | STRUCTURE_LINK
      | STRUCTURE_NUKER
      | STRUCTURE_POWER_SPAWN
      | STRUCTURE_SPAWN
      | STRUCTURE_STORAGE
      | STRUCTURE_TERMINAL
      | STRUCTURE_TOWER
      | STRUCTURE_CONTAINER
    >
  }

  interface SpawnMemory {
    pathsBuilt: Id<any>[]
  }

  interface Memory {
    creepCounter: { [key in CreepRole]: number }
  }

  const _: LoDashStatic
}
