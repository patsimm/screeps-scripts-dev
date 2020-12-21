import { CreepRole } from "../src/creep-roles"
import { LoDashStatic } from "lodash"
import { CreepActionType } from "../src/creep-actions"

declare global {
  interface CreepMemory {
    role: CreepRole
    action: CreepActionType
    actionTarget: Id<any>
  }

  interface RoomMemory {
    creepTargetAmounts: { [key in CreepRole]: number }
  }

  interface SpawnMemory {
    pathsBuilt: Id<any>[]
  }

  interface Memory {
    creepCounter: { [key in CreepRole]: number }
  }

  const _: LoDashStatic
}
