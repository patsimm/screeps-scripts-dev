import { CreepRole, roleDefinitions } from "./creep-roles"

const spawnCreep = (spawn: StructureSpawn, role: CreepRole) => {
  const roleDef = roleDefinitions[role]
  const status = spawn.spawnCreep(
    roleDef.bodyParts,
    role + Memory.creepCounter[role],
    {
      memory: { role: role, action: "idle" },
    }
  )
  if (status === OK) {
    Memory.creepCounter[role]++
  }
  return status
}

export const run = (spawn: StructureSpawn) => {
  const creepsByRole = _.groupBy(
    spawn.room.find(FIND_MY_CREEPS),
    (creep) => creep.memory.role
  ) as { [key in CreepRole]?: Creep[] }

  _.some(["harvester", "upgrader", "builder"] as const, (role) => {
    if (
      (creepsByRole[role]?.length || 0) <
      spawn.room.memory.creepTargetAmounts[role]
    ) {
      spawn.room.visual.text(role, spawn.pos)
      spawnCreep(spawn, role)
      return true
    }
  })
}
