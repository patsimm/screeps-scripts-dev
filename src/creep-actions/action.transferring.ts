import { rerunAction } from "./actions"
import {
  buildAction,
  CreepActionFunction,
  CreepActionTargeter,
} from "./build-action"

const findTarget: CreepActionTargeter = (creep: Creep) => {
  const lookResults = creep.room.lookForAtArea(
    LOOK_CREEPS,
    creep.pos.y - 1,
    creep.pos.x - 1,
    creep.pos.y + 1,
    creep.pos.x + 1,
    true
  )
  const loadingCreeps = lookResults
    .map((result) => result.creep)
    .filter(
      (creep) =>
        creep.memory.action.type === "loading" &&
        creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0
    )
  return loadingCreeps[0]?.id
}

const perform: CreepActionFunction = (creep: Creep, target: Creep) => {
  const status = creep.transfer(target, RESOURCE_ENERGY)
  if (status !== OK) {
    return rerunAction(creep)
  }
}

const action = buildAction("transferring", findTarget, perform, "⛏")

export default action
