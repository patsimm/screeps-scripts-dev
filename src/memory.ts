export const initialize = () => {
  Memory.creeps = Memory.creeps || {}

  Object.keys(Memory.creeps).forEach((creepName) => {
    if (!Game.creeps[creepName]) {
      delete Memory.creeps[creepName]
    }
  })

  Memory.creepCounter = {
    harvester: orDefault(Memory.creepCounter?.harvester, 0),
    builder: orDefault(Memory.creepCounter?.builder, 0),
    upgrader: orDefault(Memory.creepCounter?.upgrader, 0),
    combat: orDefault(Memory.creepCounter?.combat, 0),
    walker: orDefault(Memory.creepCounter?.walker, 0),
    influencer: orDefault(Memory.creepCounter?.influencer, 0),
  }

  for (const roomName in Game.rooms) {
    const room = Game.rooms[roomName]
    room.memory.creepTargetAmounts = {
      harvester: orDefault(room.memory.creepTargetAmounts?.harvester, 3),
      builder: orDefault(room.memory.creepTargetAmounts?.builder, 3),
      upgrader: orDefault(room.memory.creepTargetAmounts?.upgrader, 1),
      combat: orDefault(room.memory.creepTargetAmounts?.combat, 0),
      walker: orDefault(room.memory.creepTargetAmounts?.walker, 2),
      influencer: orDefault(room.memory.creepTargetAmounts?.influencer, 0),
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

  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName]
    creep.memory.action.counter = 0
    creep.memory.action.triedTargets = []
  }
}

const orDefault = (val: number | undefined, x: number) =>
  typeof val === "number" ? val : x
