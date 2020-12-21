import { isStructureOfType } from "../helpers"
import { CreepAction, updateAction } from "./index"

const findTarget = (creep: Creep) => {
  const targets = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) =>
      isStructureOfType(structure, [STRUCTURE_CONTAINER, STRUCTURE_STORAGE]) &&
      structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0,
  })
  return targets[0]?.id
}

const perform = (creep: Creep, target: AnyStructure) => {
  const result = creep.withdraw(target, RESOURCE_ENERGY)
  if (result === ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  } else {
    updateAction(creep, "loading")
  }
}

const action: CreepAction = {
  findTarget,
  perform,
  fallback: "harvesting",
  icon: "📥",
}

export default action
