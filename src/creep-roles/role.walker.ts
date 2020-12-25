import { updateAction } from "../creep-actions"
import { needCreepsOfRole, shouldSpawnFirstLevel } from "./common"
import { CreepRole } from "./_role"

export const run = (creep: Creep) => {
  const structuresBeingFilled = creep.room
    .find(FIND_MY_CREEPS, {
      filter: (creep) =>
        creep.memory.role.name === "harvester" && creep.memory.role.filling,
    })
    .map(
      (creep) =>
        creep.memory.role.name === "harvester" && creep.memory.role.filling
    )
    .filter((id): id is Id<any> => !!id)

  if (!_.includes(["unloading", "loading"], creep.memory.action.type)) {
    updateAction(creep, "unloading", { ignoreIds: structuresBeingFilled })
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
    updateAction(creep, "unloading", { ignoreIds: structuresBeingFilled })
  }

  if (creep.memory.action.type === "idle") {
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    } else {
      const spawn = creep.room.find(FIND_MY_SPAWNS)[0]
      if (spawn) creep.moveTo(spawn)
    }
  }
}

interface WalkerMemory {}

const initialWalkerMemory: WalkerMemory = {}

export default CreepRole(
  "walker",
  [
    {
      bodyParts: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], // 300
      shouldSpawn: shouldSpawnFirstLevel,
    },
    {
      bodyParts: [
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        MOVE,
        MOVE,
        MOVE,
        MOVE,
        MOVE,
      ], // 500,
      shouldSpawn: (spawn): boolean => needCreepsOfRole("walker", spawn.room),
    },
  ],
  run,
  initialWalkerMemory
)
