import { isStructureOfType } from "../helpers"
import { CreepAction, performAction, updateAction } from "./index"

const findTarget = (creep: Creep) => {
  let targets: Array<Creep | AnyStoreStructure> = []

  if (creep.memory.role !== "walker") {
    targets.push(
      ...(creep.room.find(FIND_STRUCTURES, {
        filter: (structure) =>
          isStructureOfType(structure, [
            STRUCTURE_CONTAINER,
            STRUCTURE_STORAGE,
          ]) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0,
      }) as any)
    )
  }

  const walkersInRoom =
    creep.room.find(FIND_MY_CREEPS, {
      filter: (creep) => creep.memory.role === "walker",
    }).length > 0

  if (walkersInRoom) {
    targets.push(
      ...creep.room.find(FIND_MY_CREEPS, {
        filter: (potentialHarvester) =>
          potentialHarvester.memory.role === "harvester",
      })
    )
  }

  return _(targets)
    .sortBy((target) => {
      const distance = creep.pos.getRangeTo(target.pos) + 1
      const energy = (target.store as Store<
        RESOURCE_ENERGY,
        false
      >).getUsedCapacity(RESOURCE_ENERGY)
      return _.floor(energy / (distance * 0.5)) + _.random(10)
    })
    .last()?.id
}

const perform = (creep: Creep, target: AnyStructure | Creep) => {
  if (target instanceof Creep) {
    if (target.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
      updateAction(creep, "idle")
      performAction(creep)
      return
    }

    creep.moveTo(target)
  } else if (target instanceof Structure) {
    const result = creep.withdraw(target, RESOURCE_ENERGY)
    if (result === ERR_BUSY || result === OK) {
      return
    } else if (result === ERR_NOT_IN_RANGE) {
      creep.moveTo(target)
    } else {
      updateAction(creep, "loading")
      performAction(creep)
    }
  }
}

const action: CreepAction = {
  findTarget,
  perform,
  fallback: "harvesting",
  icon: "📥",
}

export default action
