import * as spawn from "./spawn"
import * as memory from "./memory"
import { roleDefinitions } from "./creep-roles"

export const loop = () => {
  memory.initialize()

  for (const spawnName in Game.spawns) {
    spawn.run(Game.spawns[spawnName])
  }

  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName]
    roleDefinitions[creep.memory.role].run(creep)
  }
}
