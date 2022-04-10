import {
  CreepRoleName,
  CreepRoleMemory,
  ConcreteCreepRoleMemory,
} from "../src/creep-roles"
import { LoDashStatic } from "lodash"
import {
  ConcreteCreepActionMemory,
  CreepActionMemory,
  CreepActionType,
} from "../src/creep-actions/actions"

declare global {
  interface CreepMemory {
    role: CreepRoleMemory
    action: CreepActionMemory
  }

  interface RoomMemory {
    creepTargetAmounts: {
      [key in Exclude<CreepRoleName, "influencer">]: number
    }
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
    creepCounter: { [key in CreepRoleName]: number }
  }

  interface FlagMemory {
    influenced: boolean
  }

  const _: LoDashStatic
}
