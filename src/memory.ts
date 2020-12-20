export const initialize = () => {
  Memory.creepCounter = {
    harvester: Memory.creepCounter?.harvester || 0,
    builder: Memory.creepCounter?.builder || 0,
    upgrader: Memory.creepCounter?.upgrader || 0,
  }

  for (const roomName in Game.rooms) {
    const room = Game.rooms[roomName]
    room.memory.creepTargetAmounts = {
      harvester: room.memory.creepTargetAmounts?.harvester || 2,
      builder: room.memory.creepTargetAmounts?.builder || 3,
      upgrader: room.memory.creepTargetAmounts?.upgrader || 1,
    }
  }
}
