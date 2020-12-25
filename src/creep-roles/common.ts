import { getCreepsByRole } from "../helpers"

export const shouldSpawnFirstLevel = (spawn: StructureSpawn): boolean => {
  const creepsByRole = getCreepsByRole(spawn.room)
  const walkersExist = creepsByRole.walker && creepsByRole.walker.length > 0
  const harvestersExist =
    creepsByRole.harvester && creepsByRole.harvester.length > 0

  return !(
    walkersExist &&
    harvestersExist &&
    spawn.room.controller &&
    spawn.room.controller.level > 1
  )
}
