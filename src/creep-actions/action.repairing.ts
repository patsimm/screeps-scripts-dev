import { CreepAction, performAction, updateAction } from "./index"

const findTarget = (creep: Creep) => {
  const repairableStructures = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => structure.hits < structure.hitsMax,
  })

  return _.sortBy(repairableStructures, (structure) => {
    const distance = creep.pos.getRangeTo(structure) + 1
    const hitsRatio = 100 - (structure.hits * 100) / structure.hitsMax

    return hitsRatio / (distance * 0.5)
  })[0]?.id
}

const perform = (creep: Creep, target: AnyStructure) => {
  const status = creep.repair(target)
  if (status === OK) {
    return
  } else if (status === ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  } else {
    updateAction(creep, "idle")
    performAction(creep)
  }
}

const action: CreepAction = {
  findTarget,
  perform,
  fallback: "upgrading",
  icon: "👨‍🔧",
}

export default action
