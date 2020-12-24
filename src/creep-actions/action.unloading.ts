import { isStructureOfType } from "../helpers"
import { rerunAction } from "./actions"
import {
  buildAction,
  CreepActionFunction,
  CreepActionTargeter,
} from "./build-action"

export interface UnloadingOpts {
  ignoreIds?: Id<any>[]
}

const findTarget: CreepActionTargeter<UnloadingOpts> = (
  creep: Creep,
  options: UnloadingOpts
) => {
  const targets = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      if (!isStructureOfType(structure, creep.room.memory.unloadOrder)) {
        return false
      }
      if (options.ignoreIds && _.includes(options.ignoreIds, structure.id)) {
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

const perform: CreepActionFunction<UnloadingOpts> = (
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

const action = buildAction("unloading", findTarget, perform, "📤")

export default action
