import { CreepAction } from "./index"

const findTarget = (creep: Creep) => {
  if (creep.getActiveBodyparts(WORK) < 0) {
    return undefined
  }

  const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {
    filter: (source) =>
      source.pos.findInRange(FIND_HOSTILE_CREEPS, 5).length === 0 &&
      source.pos.findInRange(FIND_HOSTILE_STRUCTURES, 5).length === 0,
  })
  return source?.id
}

const perform = (creep: Creep, target: any) => {
  if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  }
}

const action: CreepAction = {
  findTarget,
  perform,
  icon: "⛏",
}

export default action
