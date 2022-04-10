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

export const getInfluenceFlags = () =>
  Object.keys(Game.flags)
    .filter((flagName) => _(flagName.toLocaleLowerCase()).includes("influence"))
    .map((flagName) => Game.flags[flagName])

export const getPioneerFlags = () =>
  Object.keys(Game.flags)
    .filter((flagName) => _(flagName.toLocaleLowerCase()).includes("pioneer"))
    .map((flagName) => Game.flags[flagName])

export const needCreepsOfRole = (
  role: keyof RoomMemory["creepTargetAmounts"],
  room: Room
): boolean =>
  room.memory.creepTargetAmounts[role] >
  room.find(FIND_MY_CREEPS, {
    filter: (creep) => creep.memory.role.name === role,
  }).length
