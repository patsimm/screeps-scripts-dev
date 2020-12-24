import {
  buildAction,
  CreepActionFunction,
  CreepActionTargeter,
} from "./build-action"

export const findTarget: CreepActionTargeter = (creep: Creep) => {
  if (creep.getActiveBodyparts(WORK) < 0) {
    return undefined
  }

  if (creep.room.controller) {
    return creep.room.controller.id
  }
}

export const perform: CreepActionFunction = (creep: Creep, target: any) => {
  if (creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  }
}

const action = buildAction("upgrading", findTarget, perform, "⏫")

export default action
