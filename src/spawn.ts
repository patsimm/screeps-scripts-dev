import { CreepRole, roleDefinitions } from "./creep-roles"

const spawnCreep = (spawn: StructureSpawn, role: CreepRole) => {
  const roleDef = roleDefinitions[role]

  roleDef.levels
    .filter((level) => !level.shouldSpawn || level.shouldSpawn(spawn))
    .reverse()
    .some((level) => {
      const status = spawn.spawnCreep(
        level.bodyParts,
        role + Memory.creepCounter[role],
        {
          memory: {
            action: {
              type: "idle",
              target: spawn.id,
              counter: 0,
              triedTargets: [],
              opts: {},
              fallback: [],
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
            (roleDef.levels.indexOf(level) + 1) +
            "[" +
            level.bodyParts +
            "]"
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
