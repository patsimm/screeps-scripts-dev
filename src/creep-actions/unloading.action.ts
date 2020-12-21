import { isStructureOfType } from "../helpers"
import { CreepAction, performAction, updateAction } from "./index"

const findTarget = (creep: Creep) => {
  const targets = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) =>
      isStructureOfType(structure, [
        STRUCTURE_SPAWN,
        STRUCTURE_TOWER,
        STRUCTURE_EXTENSION,
      ]) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
  })
  return targets[0]?.id || creep.room.controller?.id
}

const perform = (creep: Creep, target: AnyStructure) => {
  if (isStructureOfType(target, [STRUCTURE_CONTROLLER])) {
    if (creep.upgradeController(target) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target)
    }
  } else {
    const transferStatus = creep.transfer(target, RESOURCE_ENERGY)
    if (transferStatus === ERR_NOT_IN_RANGE) {
      creep.moveTo(target)
    } else if (transferStatus === ERR_FULL) {
      updateAction(creep, "unloading")
      performAction(creep)
    }
  }
}

const action: CreepAction = {
  findTarget,
  perform,
}

export default action
