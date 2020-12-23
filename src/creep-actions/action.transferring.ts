import { CreepAction, rerunAction } from "./actions"

const findTarget = (creep: Creep) => {
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

const perform = (creep: Creep, target: Creep) => {
  const status = creep.transfer(target, RESOURCE_ENERGY)
  if (status !== OK) {
    return rerunAction(creep)
  }
}

const action: CreepAction = {
  findTarget,
  perform,
  icon: "⛏",
}

export default action
