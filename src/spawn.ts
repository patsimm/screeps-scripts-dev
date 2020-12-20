import { CreepRole, roleDefinitions } from "./creep-roles"

const spawnCreep = (spawn: StructureSpawn, role: CreepRole) => {
  const roleDef = roleDefinitions[role]
  spawn.spawnCreep(roleDef.bodyParts, role + Memory.creepCounter[role], {
    memory: { role: role },
  })
}

export const run = (spawn: StructureSpawn) => {
  const harvestersInRoom = spawn.room.find(FIND_MY_CREEPS, {
    filter: (creep) => creep.memory.role === "harvester",
  })

  if (harvestersInRoom.length < spawn.room.memory.minHarvesters) {
    spawnCreep(spawn, "harvester")
  }
}
