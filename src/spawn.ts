import { CreepRole, roleDefinitions } from "./creep-roles"

const spawnCreep = (spawn: StructureSpawn, role: CreepRole) => {
  const roleDef = roleDefinitions[role]

  roleDef.bodyParts.reverse().some((bodyParts, index) => {
    const status = spawn.spawnCreep(
      bodyParts,
      role + Memory.creepCounter[role],
      {
        memory: {
          action: {
            type: "idle",
            target: spawn.id,
            counter: 0,
            triedTargets: [],
          },
          role: roleDefinitions[role].initialMemory,
        },
      }
    )
    if (status === OK) {
      console.log(
        "Spawned creep '" +
          role +
          "' level " +
          (roleDef.bodyParts.length - index)
      )
      Memory.creepCounter[role]++
      return true
    }
  })
}

export const run = (spawn: StructureSpawn) => {
  const creepsByRole = _.groupBy(
    spawn.room.find(FIND_MY_CREEPS),
    (creep) => creep.memory.role.name
  ) as { [key in CreepRole]?: Creep[] }

  _.some(
    ["harvester", "walker", "upgrader", "builder", "combat"] as const,
    (role) => {
      if (
        (creepsByRole[role]?.length || 0) <
        spawn.room.memory.creepTargetAmounts[role]
      ) {
        spawn.room.visual.text(role, spawn.pos)
        spawnCreep(spawn, role)
        return true
      }
    }
  )
}
