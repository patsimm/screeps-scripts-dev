import { updateAction } from "../creep-actions"
import { needCreepsOfRole, shouldSpawnFirstLevel } from "./common"
import { CreepRole, CreepRoleFunction } from "./_role"

const run: CreepRoleFunction = (creep: Creep) => {
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
    updateAction(creep, "building", {}, ["repairing", "upgrading"])
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
    updateAction(creep, "loading", {}, ["harvesting"])
  }
  if (
    _.includes(["loading", "harvesting"], creep.memory.action.type) &&
    !hasEnergyCapacity
  ) {
    updateAction(creep, "building", {}, ["repairing", "upgrading"])
  }
}

interface BuilderMemory {}

const initializeBuilderMemory = (): BuilderMemory => ({})

export default CreepRole(
  "builder",
  [
    {
      bodyParts: [WORK, CARRY, MOVE, MOVE], // 250
      shouldSpawn: (spawn: StructureSpawn): boolean =>
        needCreepsOfRole("builder", spawn.room) && shouldSpawnFirstLevel(spawn),
    },
    {
      bodyParts: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], // 500
      shouldSpawn: (spawn: StructureSpawn): boolean =>
        needCreepsOfRole("builder", spawn.room),
    },
  ],
  run,
  initializeBuilderMemory
)
