import { isStructureOfType } from "../helpers"
import { CreepAction, rerunAction } from "./actions"

const findTarget = (creep: Creep) => {
  const targets = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      if (!isStructureOfType(structure, creep.room.memory.unloadOrder)) {
        return false
      }
      const store = structure.store as Store<RESOURCE_ENERGY, false>
      return store && store.getFreeCapacity(RESOURCE_ENERGY) > 0
    },
  })

  const structureByType = _.groupBy(
    targets,
    (structure) => structure.structureType
  )

  let potentialStructure: AnyStructure | undefined
  creep.room.memory.unloadOrder.some((structureType) => {
    const structure = structureByType[structureType]?.[0]
    if (structure) {
      potentialStructure = structure
      return true
    }
  })

  return (
    potentialStructure?.id ||
    (creep.getActiveBodyparts(WORK) > 0 ? creep.room.controller?.id : undefined)
  )
}

const perform = (
  creep: Creep,
  target: AnyStoreStructure | StructureController
) => {
  if (isStructureOfType(target, [STRUCTURE_CONTROLLER])) {
    const status = creep.upgradeController(target)
    if (status === OK) {
      return
    } else if (status === ERR_NOT_IN_RANGE) {
      creep.moveTo(target)
    } else {
      return rerunAction(creep)
    }
  } else {
    if (
      (target.store as Store<RESOURCE_ENERGY, false>).getFreeCapacity(
        RESOURCE_ENERGY
      ) === 0
    ) {
      return rerunAction(creep)
    }
    const transferStatus = creep.transfer(target, RESOURCE_ENERGY)
    if (transferStatus === ERR_NOT_IN_RANGE) {
      creep.moveTo(target)
    } else if (transferStatus === ERR_FULL) {
      return rerunAction(creep)
    }
  }
}

const action: CreepAction<"unloading"> = {
  type: "unloading",
  findTarget,
  perform,
  icon: "📤",
}

export default action
