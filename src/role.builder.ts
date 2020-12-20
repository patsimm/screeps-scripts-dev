import { updateAction } from "./creep-actions"

export const run = (creep: Creep) => {
  const constructionSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES)

  if (
    !_.includes(["building", "harvesting", "unloading"], creep.memory.action)
  ) {
    updateAction(creep, "harvesting")
  }

  const sitesExist = constructionSites.length > 0
  const hasEnergyCapacity = creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0
  const isEnergyEmpty = creep.store[RESOURCE_ENERGY] == 0

  if (creep.memory.action === "building" && (isEnergyEmpty || !sitesExist)) {
    updateAction(creep, "harvesting")
  }
  if (creep.memory.action === "unloading" && isEnergyEmpty) {
    updateAction(creep, "harvesting")
  }
  if (creep.memory.action === "unloading" && sitesExist) {
    updateAction(creep, "building")
  }
  if (
    creep.memory.action === "harvesting" &&
    !hasEnergyCapacity &&
    sitesExist
  ) {
    updateAction(creep, "building")
  }
  if (
    creep.memory.action === "harvesting" &&
    !hasEnergyCapacity &&
    !sitesExist
  ) {
    updateAction(creep, "unloading")
  }
}
