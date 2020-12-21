export const initialize = () => {
  Object.keys(Memory.creeps).forEach((creepName) => {
    if (!Game.creeps[creepName]) {
      delete Memory.creeps[creepName]
    }
  })

  Memory.creepCounter = {
    harvester: Memory.creepCounter?.harvester || 0,
    builder: Memory.creepCounter?.builder || 0,
    upgrader: Memory.creepCounter?.upgrader || 0,
    combat: Memory.creepCounter?.combat || 0,
  }

  for (const roomName in Game.rooms) {
    const room = Game.rooms[roomName]
    room.memory.creepTargetAmounts = {
      harvester: room.memory.creepTargetAmounts?.harvester || 2,
      builder: room.memory.creepTargetAmounts?.builder || 3,
      upgrader: room.memory.creepTargetAmounts?.upgrader || 1,
      combat: room.memory.creepTargetAmounts?.combat || 1,
    }
    room.memory.buildOrder = room.memory.buildOrder || [
      STRUCTURE_CONTAINER,
      STRUCTURE_EXTENSION,
      STRUCTURE_ROAD,
    ]
    room.memory.unloadOrder = room.memory.unloadOrder || [
      STRUCTURE_SPAWN,
      STRUCTURE_EXTENSION,
      STRUCTURE_CONTAINER,
      STRUCTURE_TOWER,
    ]
  }

  for (const spawnName in Game.spawns) {
    const spawn = Game.spawns[spawnName]
    spawn.memory.pathsBuilt = spawn.memory.pathsBuilt || []
  }
}
