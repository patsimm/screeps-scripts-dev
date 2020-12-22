import { CreepAction, rerunAction } from "./actions"

const findTarget = (creep: Creep) => {
  const repairableStructures = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => structure.hits < structure.hitsMax,
  })

  return _(repairableStructures)
    .sortBy((structure) => {
      const distance = creep.pos.getRangeTo(structure) + 1
      const hitsRatio = 100 - (structure.hits * 100) / structure.hitsMax
      return hitsRatio - 300 / distance
    })
    .last()?.id
}

const perform = (creep: Creep, target: AnyStructure) => {
  if (target.hits === target.hitsMax) {
    return rerunAction(creep)
  }
  target.room.visual.circle(target.pos, { fill: "#ff0000" })
  const status = creep.repair(target)
  if (status === OK) {
    return
  } else if (status === ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  } else {
    return rerunAction(creep)
  }
}

const action: CreepAction = {
  findTarget,
  perform,
  fallback: "upgrading",
  icon: "👨‍🔧",
}

export default action
