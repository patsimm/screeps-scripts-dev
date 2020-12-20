import { CreepRole } from "./creep-roles"
import { LoDashStatic } from "lodash"
import { CreepAction } from "./creep-actions"

declare global {
  interface CreepMemory {
    role: CreepRole
    action: CreepAction
    actionTarget: Id<any>
  }

  interface RoomMemory {
    creepTargetAmounts: { [key in CreepRole]: number }
  }

  interface Memory {
    creepCounter: { [key in CreepRole]: number }
  }

  const _: LoDashStatic
}
