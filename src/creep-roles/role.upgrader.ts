import { CreepRoleDefinition } from "."
import { updateAction } from "../creep-actions"

const run = (creep: Creep) => {
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

const role: CreepRoleDefinition = {
  run,
  bodyParts: [
    [WORK, CARRY, MOVE, MOVE], // 250
    [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], // 500
  ],
}

export default role
