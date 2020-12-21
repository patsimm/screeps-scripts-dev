import { CreepRoleDefinition } from "."
import { updateAction } from "../creep-actions"

const run = (creep: Creep) => {
  if (
    !_.includes(
      ["harvesting", "transferring", "unloading"],
      creep.memory.action
    )
  ) {
    updateAction(creep, "harvesting")
  }

  const lookResults = creep.room.lookForAtArea(
    LOOK_CREEPS,
    creep.pos.y - 1,
    creep.pos.x - 1,
    creep.pos.y + 1,
    creep.pos.x + 1,
    true
  )
  const loadingCreeps = lookResults
    .map((result) => result.creep)
    .filter(
      (creep) =>
        creep.memory.action === "loading" &&
        creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0
    )

  const walkersInRoom =
    creep.room.find(FIND_MY_CREEPS, {
      filter: (creep) => creep.memory.role === "walker",
    }).length > 0

  if (!walkersInRoom) {
    if (!_.includes(["harvesting", "unloading"], creep.memory.action)) {
      updateAction(creep, "harvesting")
    }

    if (
      _.includes(["harvesting"], creep.memory.action) &&
      creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0 &&
      !walkersInRoom
    ) {
      updateAction(creep, "unloading")
    }

    if (
      !_.includes(["harvesting"], creep.memory.action) &&
      creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0
    ) {
      updateAction(creep, "harvesting")
    }
  } else {
    if (
      _.includes(["harvesting"], creep.memory.action) &&
      creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0
    ) {
      updateAction(creep, "idle")
    }

    if (
      !_.includes(["harvesting"], creep.memory.action) &&
      creep.store.getFreeCapacity(RESOURCE_ENERGY) !== 0
    ) {
      updateAction(creep, "harvesting")
    }

    if (
      !_.includes(["transferring"], creep.memory.action) &&
      creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0 &&
      loadingCreeps.length > 0
    ) {
      updateAction(creep, "transferring")
    }
  }
}

const role: CreepRoleDefinition = {
  run,
  bodyParts: [
    [WORK, CARRY, MOVE, MOVE], // 250
    [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], // 500
  ],
}

export default role
