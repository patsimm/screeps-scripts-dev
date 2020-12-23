import { CreepRoleDefinition } from "./index"
import { updateAction } from "../creep-actions"

const run = (creep: Creep) => {
  if (
    !_.includes(
      [
        "building",
        "harvesting",
        "loading",
        "unloading",
        "upgrading",
        "repairing",
      ],
      creep.memory.action.type
    )
  ) {
    updateAction(creep, "building")
  }

  const hasEnergyCapacity = creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0
  const isEnergyEmpty = creep.store[RESOURCE_ENERGY] == 0

  if (
    _.includes(
      ["building", "unloading", "upgrading", "repairing"],
      creep.memory.action.type
    ) &&
    isEnergyEmpty
  ) {
    updateAction(creep, "loading")
  }
  if (
    _.includes(["loading", "harvesting"], creep.memory.action.type) &&
    !hasEnergyCapacity
  ) {
    updateAction(creep, "building")
  }
}

const role: CreepRoleDefinition<"builder", { name: "builder" }> = {
  name: "builder",
  run,
  bodyParts: [
    [WORK, CARRY, MOVE, MOVE], // 250
    [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], // 500,
  ],
  initialMemory: {
    name: "builder",
  },
}

export default role
