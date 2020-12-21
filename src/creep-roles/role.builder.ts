import { CreepRoleDefinition } from "."
import { updateAction } from "../creep-actions"

const run = (creep: Creep) => {
  if (
    !_.includes(
      ["building", "harvesting", "loading", "unloading", "upgrading"],
      creep.memory.action
    )
  ) {
    updateAction(creep, "loading")
  }

  const hasEnergyCapacity = creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0
  const isEnergyEmpty = creep.store[RESOURCE_ENERGY] == 0

  if (
    _.includes(["building", "unloading", "upgrading"], creep.memory.action) &&
    isEnergyEmpty
  ) {
    updateAction(creep, "loading")
  }
  if (
    _.includes(["loading", "harvesting"], creep.memory.action) &&
    !hasEnergyCapacity
  ) {
    updateAction(creep, "building")
  }
}

const role: CreepRoleDefinition = {
  run,
  bodyParts: [
    [WORK, CARRY, MOVE, MOVE], // 250
    [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], // 500,
  ],
}

export default role