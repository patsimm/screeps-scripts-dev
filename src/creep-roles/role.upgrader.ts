import { updateAction } from "../creep-actions"
import { isStructureOfType } from "../helpers"
import { shouldSpawnFirstLevel } from "./common"
import { CreepRole } from "./_role"

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

interface UpgraderMemory {}

const initialUpgraderMemory: UpgraderMemory = {}

export default CreepRole(
  "upgrader",
  [
    {
      bodyParts: [WORK, CARRY, MOVE, MOVE], // 250
      shouldSpawn: shouldSpawnFirstLevel,
    },
    {
      bodyParts: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], // 500
      shouldSpawn: (spawn) =>
        shouldSpawnFirstLevel(spawn) &&
        spawn.room.find(FIND_MY_STRUCTURES, {
          filter: (structure) =>
            isStructureOfType(structure, [STRUCTURE_EXTENSION]),
        }).length < 10,
    },
    {
      bodyParts: [
        WORK,
        WORK,
        WORK,
        WORK,
        CARRY,
        CARRY,
        MOVE,
        MOVE,
        MOVE,
        MOVE,
        MOVE,
        MOVE,
      ], // 800
    },
  ],
  run,
  initialUpgraderMemory,
  (spawn: StructureSpawn): number =>
    spawn.room.memory.creepTargetAmounts["upgrader"]
)
