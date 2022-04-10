import { CreepRole, CreepRoleName, roleDefinitions } from "./creep-roles"

const spawnCreep = (
  spawn: StructureSpawn,
  role: CreepRole<CreepRoleName, any>
): boolean => {
  const levelsThatShouldSpawn = role.levels.filter(
    (level) => !level.shouldSpawn || level.shouldSpawn(spawn)
  )

  if (levelsThatShouldSpawn.length === 0) return false

  levelsThatShouldSpawn.reverse().some((level) => {
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
          role: role.initializeMemory(spawn),
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
  return true
}

export const run = (spawn: StructureSpawn) => {
  _.some(
    [
      "harvester",
      "walker",
      "upgrader",
      "builder",
      "guard",
      "pioneer",
      "influencer",
    ] as const,
    (role) => {
      const spawning = spawnCreep(spawn, roleDefinitions[role])
      if (spawning) spawn.room.visual.text(role, spawn.pos)
      return spawning
    }
  )
}
