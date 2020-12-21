import { CreepAction } from "./index"

export const findTarget = (creep: Creep) => {
  if (creep.getActiveBodyparts(WORK) < 0) {
    return undefined
  }

  if (creep.room.controller) {
    return creep.room.controller.id
  }
}

export const perform = (creep: Creep, target: any) => {
  if (creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  }
}

const action: CreepAction = {
  findTarget,
  perform,
  icon: "⏫",
}

export default action
