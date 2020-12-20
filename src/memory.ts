export const initialize = () => {
  Memory.creepCounter = {
    harvester: Memory.creepCounter?.harvester || 0,
  }

  for (const roomName in Game.rooms) {
    const room = Game.rooms[roomName]
    if (room.memory.minHarvesters === undefined) {
      room.memory.minHarvesters = 2
    }
  }
}
