import { CreepAction, performAction, updateAction } from "./index"

const findTarget = (creep: Creep) => {
  const repairableStructures = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => structure.hits < structure.hitsMax,
  })

  return _.sortBy(repairableStructures, (structure) => {
    const distance = creep.pos.getRangeTo(structure) + 1
    const hitsRatio = 100 - (structure.hits * 100) / structure.hitsMax

    return hitsRatio + 300 / distance
  })[0]?.id
}

const perform = (creep: Creep, target: AnyStructure) => {
  if (target.hits === target.hitsMax) {
    updateAction(creep, "repairing")
    performAction(creep)
    return
  }
  target.room.visual.circle(target.pos, { fill: "#ff0000" })
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
