import { updateAction } from "./creep-actions"

export const run = (creep: Creep) => {
  if (
    !_.includes(
      ["building", "harvesting", "loading", "unloading", "upgrading"],
      creep.memory.action
    )
  ) {
    console.log(creep.memory.action)
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
