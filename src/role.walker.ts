import { updateAction } from "./creep-actions"

export const run = (creep: Creep) => {
  if (!_.includes(["unloading", "loading"], creep.memory.action)) {
    updateAction(creep, "loading")
  }
  if (
    creep.memory.action === "unloading" &&
    creep.store[RESOURCE_ENERGY] == 0
  ) {
    updateAction(creep, "loading")
  }
  if (
    _.includes(["loading"], creep.memory.action) &&
    creep.store.getFreeCapacity() == 0
  ) {
    updateAction(creep, "unloading")
  }

  if (creep.memory.action === "idle") {
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    } else {
      const spawn = creep.room.find(FIND_MY_SPAWNS)[0]
      if (spawn) creep.moveTo(spawn)
    }
  }
}
