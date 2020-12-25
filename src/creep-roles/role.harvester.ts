import { updateAction } from "../creep-actions"
import { needCreepsOfRole, shouldSpawnFirstLevel } from "./common"
import { CreepRole } from "./_role"

const run = (creep: Creep) => {
  if (
    !_.includes(
      ["harvesting", "transferring", "unloading"],
      creep.memory.action.type
    )
  ) {
    updateAction(creep, "harvesting", {})
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
        creep.memory.action.type === "loading" &&
        creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0
    )

  const walkersInRoom =
    creep.room.find(FIND_MY_CREEPS, {
      filter: (creep) => creep.memory.role.name === "walker",
    }).length > 0

  if (!walkersInRoom) {
    if (!_.includes(["harvesting", "unloading"], creep.memory.action.type)) {
      updateAction(creep, "harvesting", {})
    }

    if (
      _.includes(["harvesting"], creep.memory.action.type) &&
      creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0 &&
      !walkersInRoom
    ) {
      updateAction(creep, "unloading", {})
    }

    if (
      !_.includes(["harvesting"], creep.memory.action.type) &&
      creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0
    ) {
      updateAction(creep, "harvesting", {})
    }
  } else {
    if (
      _.includes(["harvesting"], creep.memory.action.type) &&
      creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0
    ) {
      updateAction(creep, "idle", {})
    }

    if (
      !_.includes(["harvesting"], creep.memory.action.type) &&
      creep.store.getFreeCapacity(RESOURCE_ENERGY) !== 0
    ) {
      updateAction(creep, "harvesting", {})
    }

    if (
      !_.includes(["transferring"], creep.memory.action.type) &&
      (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0 ||
        loadingCreeps.some(
          (loadingCreep) =>
            loadingCreep.store.getFreeCapacity(RESOURCE_ENERGY) <
            creep.store.getUsedCapacity(RESOURCE_ENERGY)
        )) &&
      loadingCreeps.length > 0
    ) {
      updateAction(creep, "transferring", {})
    }
  }
}

interface HarvesterMemory {
  filling?: Id<any>
}

const initialMemory: HarvesterMemory = {
  filling: undefined,
}

export default CreepRole(
  "harvester",
  [
    {
      bodyParts: [WORK, CARRY, MOVE, MOVE], // 250
      shouldSpawn: (spawn: StructureSpawn): boolean =>
        needCreepsOfRole("harvester", spawn.room) &&
        shouldSpawnFirstLevel(spawn),
    },
    {
      bodyParts: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], // 500
      shouldSpawn: (spawn: StructureSpawn): boolean =>
        needCreepsOfRole("harvester", spawn.room),
    },
  ],
  run,
  initialMemory
)
