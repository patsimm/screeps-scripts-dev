import { CreepRoleDefinition } from "./index"
import { updateAction } from "../creep-actions"

const run = (creep: Creep) => {
  if (
    !_.includes(
      ["upgrading", "harvesting", "loading"],
      creep.memory.action.type
    )
  ) {
    updateAction(creep, "upgrading", {})
  }
  if (
    creep.memory.action.type === "upgrading" &&
    creep.store[RESOURCE_ENERGY] == 0
  ) {
    updateAction(creep, "loading", {}, ["harvesting"])
  }
  if (
    _.includes(["harvesting", "loading"], creep.memory.action.type) &&
    creep.store.getFreeCapacity() == 0
  ) {
    updateAction(creep, "upgrading", {})
  }
}

const role: CreepRoleDefinition<"upgrader", { name: "upgrader" }> = {
  name: "upgrader",
  run,
  bodyParts: [
    [WORK, CARRY, MOVE, MOVE], // 250
    [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], // 500
  ],
  initialMemory: { name: "upgrader" },
}

export default role
