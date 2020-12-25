import { getCreepsByRole, isStructureOfType } from "../helpers"

export const shouldSpawnFirstLevel = (spawn: StructureSpawn): boolean => {
  const creepsByRole = getCreepsByRole(spawn.room)
  const walkersExist = (creepsByRole.walker?.length || 0) > 0
  const harvestersExist = (creepsByRole.harvester?.length || 0) > 0
  const extensions = spawn.room.find(FIND_MY_STRUCTURES, {
    filter: (structure) => isStructureOfType(structure, [STRUCTURE_EXTENSION]),
  })

  return !(walkersExist && harvestersExist && extensions.length >= 5)
}
