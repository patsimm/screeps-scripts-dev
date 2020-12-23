import { CreepRoleDefinition } from "./index"
import { updateAction } from "../creep-actions"

export const run = (creep: Creep) => {
  if (!_.includes(["unloading", "loading"], creep.memory.action.type)) {
    updateAction(creep, "unloading", {})
  }
  if (
    creep.memory.action.type === "unloading" &&
    creep.store[RESOURCE_ENERGY] === 0
  ) {
    updateAction(creep, "loading", {}, ["harvesting"])
  }
  if (
    _.includes(["loading"], creep.memory.action.type) &&
    creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0
  ) {
    updateAction(creep, "unloading", {})
  }

  if (creep.memory.action.type === "idle") {
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    } else {
      const spawn = creep.room.find(FIND_MY_SPAWNS)[0]
      if (spawn) creep.moveTo(spawn)
    }
  }
}

const role: CreepRoleDefinition<"walker", { name: "walker" }> = {
  name: "walker",
  run,
  bodyParts: [
    [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], // 300
    [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], // 500,
  ],
  initialMemory: { name: "walker" },
}

export default role
