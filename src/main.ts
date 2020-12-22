import * as spawn from "./spawn"
import * as memory from "./memory"
import * as structures from "./structures"
import * as creepRoles from "./creep-roles"

export const loop = () => {
  memory.initialize()

  for (const roomName in Game.rooms) {
    structures.run(Game.rooms[roomName])
  }

  for (const spawnName in Game.spawns) {
    spawn.run(Game.spawns[spawnName])
  }

  for (const creepName in Game.creeps) {
    creepRoles.run(Game.creeps[creepName])
  }
}
