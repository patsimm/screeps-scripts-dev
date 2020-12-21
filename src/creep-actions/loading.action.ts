import { isStructureOfType } from "../helpers"
import { CreepAction, updateAction } from "./index"

const findTarget = (creep: Creep) => {
  if (creep.memory.role !== "walker") {
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) =>
        isStructureOfType(structure, [
          STRUCTURE_CONTAINER,
          STRUCTURE_STORAGE,
        ]) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0,
    })
    if (targets[0]) {
      return targets[0].id
    }
  }

  const walkersInRoom =
    creep.room.find(FIND_MY_CREEPS, {
      filter: (creep) => creep.memory.role === "walker",
    }).length > 0

  if (walkersInRoom) {
    const harvesters = creep.room.find(FIND_MY_CREEPS, {
      filter: (potentialHarvester) =>
        potentialHarvester.memory.role === "harvester" &&
        potentialHarvester.store.getFreeCapacity(RESOURCE_ENERGY) === 0,
    })
    return harvesters.length > 0
      ? creep.pos.findClosestByPath(harvesters)?.id
      : undefined
  }
}

const perform = (creep: Creep, target: AnyStructure | Creep) => {
  if (target instanceof Creep) {
    creep.moveTo(target)
  } else if (target instanceof Structure) {
    const result = creep.withdraw(target, RESOURCE_ENERGY)
    if (result === ERR_NOT_IN_RANGE) {
      creep.moveTo(target)
    } else {
      updateAction(creep, "loading")
    }
  } else {
    console.log(target)
  }
}

const action: CreepAction = {
  findTarget,
  perform,
  fallback: "harvesting",
  icon: "📥",
}

export default action
