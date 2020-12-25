import { CreepRole, CreepRoleName, roleDefinitions } from "./creep-roles"

const spawnCreep = (
  spawn: StructureSpawn,
  role: CreepRole<CreepRoleName, any>
) => {
  role.levels
    .filter((level) => !level.shouldSpawn || level.shouldSpawn(spawn))
    .reverse()
    .some((level) => {
      const status = spawn.spawnCreep(
        level.bodyParts,
        role.name + Memory.creepCounter[role.name],
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
            role: role.initialMemory,
          },
        }
      )
      if (status === OK) {
        console.log(
          "Spawned creep '" +
            role.name +
            "' level " +
            (role.levels.indexOf(level) + 1) +
            "[" +
            level.bodyParts +
            "]"
        )
        Memory.creepCounter[role.name]++
        return true
      }
    })
}

export const run = (spawn: StructureSpawn) => {
  const creepsByRole = _.groupBy(
    spawn.room.find(FIND_MY_CREEPS),
    (creep) => creep.memory.role.name
  ) as { [key in CreepRoleName]?: Creep[] }

  _.some(
    [
      "harvester",
      "walker",
      "upgrader",
      "builder",
      "combat",
      "influencer",
    ] as const,
    (role) => {
      const roleCreeps = creepsByRole[role]
      const roleDef = roleDefinitions[role]

      if ((roleCreeps?.length || 0) < roleDef.targetAmount(spawn)) {
        spawn.room.visual.text(role, spawn.pos)
        spawnCreep(spawn, roleDef)
        return true
      }
    }
  )
}
