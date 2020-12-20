import { performAction, updateAction } from "./creep-actions"

export const run = (creep: Creep) => {
  if (!_.includes(["upgrading", "harvesting"], creep.memory.action)) {
    updateAction(creep, "harvesting")
  }
  if (
    creep.memory.action === "upgrading" &&
    creep.store[RESOURCE_ENERGY] == 0
  ) {
    updateAction(creep, "harvesting")
  }
  if (
    creep.memory.action === "harvesting" &&
    creep.store.getFreeCapacity() == 0
  ) {
    updateAction(creep, "upgrading")
  }

  performAction(creep)
}
