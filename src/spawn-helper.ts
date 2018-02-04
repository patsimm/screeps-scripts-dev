import { CreepOptions, CreepListItem, CreepMemoryBase } from './creep-base'

export enum Spawn {
  SPAWN_1 = 'Spawn1'
}

export class SpawnHelper {
  readonly structureSpawn: StructureSpawn

  constructor(spawn: Spawn, private readonly creeps: CreepListItem[]) {
    this.structureSpawn = Game.spawns[spawn]
  }

  static getStructureSpawn(spawn: Spawn): StructureSpawn {
    return Game.spawns[spawn]
  }

  loop = () => {
    this.creeps.forEach(typeCreeps => {
      const highestHarvesterIndex = this.getHighestIndex(typeCreeps.creeps)
      if (
        typeCreeps.creeps.length < typeCreeps.typeOptions.maxAmount &&
        this.canSpawn(typeCreeps.typeOptions)
      ) {
        this.spawn(typeCreeps.typeOptions, highestHarvesterIndex + 1)
      }
    })

    const adjacentLowHealthCreeps = this.structureSpawn.pos.findInRange(FIND_MY_CREEPS, 1, {
      filter: (foundCreep: Creep) => foundCreep.ticksToLive < 700
    })
    if (adjacentLowHealthCreeps.length) {
      this.structureSpawn.renewCreep(
        adjacentLowHealthCreeps.reduce(
          (prev, curr) => (prev.ticksToLive < curr.ticksToLive ? prev : curr)
        )
      )
    }
  }

  getHighestIndex = (creeps: Creep[]): number => {
    return creeps.length
      ? creeps.map(creep => this.getIndex(creep)).reduce((prev, curr) => {
          return prev > curr ? prev : curr
        })
      : 0
  }

  getIndex = (creep: Creep) => {
    const memory: CreepMemoryBase = creep.memory as CreepMemoryBase
    const role = memory.role.toLowerCase()
    const name = creep.name.toLowerCase()
    return parseInt(name.split(role)[1])
  }

  canSpawn = (creepOptions: CreepOptions): boolean => {
    return (
      this.structureSpawn.spawnCreep(creepOptions.bodyParts, creepOptions.role, {
        dryRun: true
      }) === OK
    )
  }

  spawn = (creepOptions: CreepOptions, index: number): boolean => {
    const memory: CreepMemoryBase = { role: creepOptions.role, action: undefined }
    return (
      this.structureSpawn.spawnCreep(creepOptions.bodyParts, creepOptions.role + index, {
        memory
      }) === OK
    )
  }
}
