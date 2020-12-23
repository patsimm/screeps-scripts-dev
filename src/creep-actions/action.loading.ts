import { isStructureOfType } from "../helpers"
import { CreepAction, rerunAction } from "./actions"

const findTarget = (creep: Creep) => {
  let targets: Array<Creep | AnyStoreStructure> = []

  if (creep.memory.role.name !== "walker") {
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
      filter: (creep) => creep.memory.role.name === "walker",
    }).length > 0

  const harvesters = creep.room.find(FIND_MY_CREEPS, {
    filter: (potentialHarvester) =>
      potentialHarvester.memory.role.name === "harvester",
  })

  if (
    walkersInRoom &&
    harvesters.some(
      (harvester) => harvester.store.getUsedCapacity(RESOURCE_ENERGY) >= 5
    )
  ) {
    targets.push(
      ...harvesters.map(
        (harvester) =>
          (harvester.memory.role.name === "harvester" &&
          harvester.memory.role.filling
            ? Game.getObjectById(harvester.memory.role.filling)
            : undefined) || harvester
      )
    )
  }

  return _(targets)
    .uniq((target) => target.id)
    .filter(
      (target) => !_.includes(creep.memory.action.triedTargets, target.id)
    )
    .sortBy((target) => {
      const distance = creep.pos.getRangeTo(target.pos)
      const energy = (target.store as Store<
        RESOURCE_ENERGY,
        false
      >).getUsedCapacity(RESOURCE_ENERGY)
      return energy - 2 * distance + _.random(50)
    })
    .last()?.id
}

const perform = (creep: Creep, target: AnyStructure | Creep) => {
  if (target instanceof Creep) {
    if (target.store.getUsedCapacity(RESOURCE_ENERGY) < 5) {
      return rerunAction(creep)
    }
    creep.moveTo(target)
  } else if (target instanceof Structure) {
    const result = creep.withdraw(target, RESOURCE_ENERGY)
    if (result === ERR_BUSY || result === OK) {
      return
    } else if (result === ERR_NOT_IN_RANGE) {
      creep.moveTo(target)
    } else {
      return rerunAction(creep)
    }
  }
}

const action: CreepAction<"loading"> = {
  type: "loading",
  findTarget,
  perform,
  // fallback: "harvesting",
  icon: "📥",
}

export default action
