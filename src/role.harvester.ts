import { updateAction } from "./creep-actions"

export const run = (creep: Creep) => {
  if (!_.includes(["unloading", "harvesting"], creep.memory.action)) {
    updateAction(creep, "harvesting")
  }
  if (
    creep.memory.action === "unloading" &&
    creep.store[RESOURCE_ENERGY] == 0
  ) {
    updateAction(creep, "harvesting")
  }
  if (
    creep.memory.action === "harvesting" &&
    creep.store.getFreeCapacity() == 0
  ) {
    updateAction(creep, "unloading")
  }
}
