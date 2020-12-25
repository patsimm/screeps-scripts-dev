export const initialize = () => {
  Memory.creeps = _.defaults(Memory.creeps, {})

  Object.keys(Memory.creeps).forEach((creepName) => {
    if (!Game.creeps[creepName]) {
      delete Memory.creeps[creepName]
    }
  })

  Memory.creepCounter = _.defaults(Memory.creepCounter, {
    harvester: 0,
    builder: 0,
    upgrader: 0,
    combat: 0,
    walker: 0,
    influencer: 0,
  } as Memory["creepCounter"])

  for (const roomName in Game.rooms) {
    const room = Game.rooms[roomName]
    room.memory = _.defaultsDeep(room.memory, {
      creepTargetAmounts: {
        harvester: 3,
        builder: 3,
        upgrader: 1,
        combat: 0,
        walker: 2,
      },
      buildOrder: [STRUCTURE_CONTAINER, STRUCTURE_EXTENSION, STRUCTURE_ROAD],
      unloadOrder: [
        STRUCTURE_SPAWN,
        STRUCTURE_EXTENSION,
        STRUCTURE_TOWER,
        STRUCTURE_CONTAINER,
      ],
    } as RoomMemory)
  }

  for (const spawnName in Game.spawns) {
    const spawn = Game.spawns[spawnName]
    spawn.memory = _.defaults(spawn.memory, {
      pathsBuilt: [],
    } as SpawnMemory)
  }

  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName]
    creep.memory.action = _.assign(creep.memory.action, {
      counter: 0,
      triedTargets: [],
    } as Partial<CreepMemory["action"]>)
  }

  for (const flagName in Game.flags) {
    const flag = Game.flags[flagName]
    flag.memory = _.assign(flag.memory, {
      influenced: false,
    } as FlagMemory)
  }
}
