import { updateAction } from "./creep-actions"

export const run = (creep: Creep) => {
  if (
    !_.includes(["upgrading", "harvesting", "loading"], creep.memory.action)
  ) {
    updateAction(creep, "loading")
  }
  if (
    creep.memory.action === "upgrading" &&
    creep.store[RESOURCE_ENERGY] == 0
  ) {
    updateAction(creep, "loading")
  }
  if (
    _.includes(["harvesting", "loading"], creep.memory.action) &&
    creep.store.getFreeCapacity() == 0
  ) {
    updateAction(creep, "upgrading")
  }
}
