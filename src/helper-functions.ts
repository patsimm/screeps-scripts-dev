import { CreepMemoryBase, Role, CreepAction } from './creep-base'

export function setAction(creep: Creep, action: CreepAction) {
  const memory: CreepMemoryBase = creep.memory as any
  switch (action) {
    case CreepAction.BUILD:
      creep.say('🚧 build')
      break
    case CreepAction.HARVEST:
      creep.say('🔄 harvest')
      break
    case CreepAction.TRANSFER:
      creep.say('➡️ transfer')
      break
    case CreepAction.UPGRADE:
      creep.say('⏫ upgrade')
      break
  }
  memory.action = action
}

export function upgradeController(creep: Creep, controller: StructureController) {
  if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#3333ff' } })
  }
}

export function harvestClosestSourceByRange(creep: Creep) {
  const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE)
  if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
    creep.moveTo(source.pos, { visualizePathStyle: { stroke: '#ffaa00' } })
  }
}

export function harvestClosestSourceByPath(creep: Creep) {
  const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
  if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
    creep.moveTo(source.pos, { visualizePathStyle: { stroke: '#ffaa00' } })
  }
}

export function transferToCreep(creep: Creep, target: Creep, resourceType: ResourceConstant) {
  if (creep.transfer(target, resourceType) == ERR_NOT_IN_RANGE) {
    creep.moveTo(target, { visualizePathStyle: { stroke: '#33ff33' } })
  }
}

export function transferToSpawn(
  creep: Creep,
  spawn: StructureSpawn,
  resourceType: ResourceConstant
) {
  if (creep.transfer(spawn, resourceType) == ERR_NOT_IN_RANGE) {
    creep.moveTo(spawn, { visualizePathStyle: { stroke: '#33ff33' } })
  }
}

export function transferToExtension(
  creep: Creep,
  spawn: StructureExtension,
  resourceType: ResourceConstant
) {
  if (creep.transfer(spawn, resourceType) == ERR_NOT_IN_RANGE) {
    creep.moveTo(spawn, { visualizePathStyle: { stroke: '#33ff33' } })
  }
}

export function transferToStructure(
  creep: Creep,
  structure: Structure,
  resourceType: ResourceConstant
) {
  if (creep.transfer(structure, resourceType) == ERR_NOT_IN_RANGE) {
    creep.moveTo(structure, { visualizePathStyle: { stroke: '#33ff33' } })
  }
}

export function buildSite(creep: Creep, site: ConstructionSite) {
  if (creep.build(site) == ERR_NOT_IN_RANGE) {
    creep.moveTo(site, { visualizePathStyle: { stroke: '#ffffff' } })
  }
}

export function findCreepsOfRoleInRoom(role: Role, room: Room): Creep[] {
  return room.find(FIND_MY_CREEPS, {
    filter: foundCreep => {
      const memory: CreepMemoryBase = foundCreep.memory as any
      return memory.role === role
    }
  })
}

export function findClosestCreepWithCapacityByPath(pos: RoomPosition): Creep {
  return pos.findClosestByPath(FIND_MY_CREEPS, {
    filter: foundCreep => {
      return foundCreep.carry.energy < foundCreep.carryCapacity
    }
  })
}

function isStructureExtensionWithCapacity(structure: Structure): boolean {
  return (
    structure.structureType === STRUCTURE_EXTENSION &&
    (structure as StructureExtension).energy < (structure as StructureExtension).energyCapacity
  )
}

function isStructureSpawnWithCapacity(structure: Structure): boolean {
  return (
    structure.structureType === STRUCTURE_SPAWN &&
    (structure as StructureSpawn).energy < (structure as StructureSpawn).energyCapacity
  )
}

export function findClosestExtensionWithCapacityByPath(pos: RoomPosition): StructureExtension {
  return pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: foundStructure => isStructureExtensionWithCapacity(foundStructure)
  }) as StructureExtension
}

export function findClosestStructureWithCapacityByPath(pos: RoomPosition): Structure {
  return pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: foundStructure =>
      isStructureExtensionWithCapacity(foundStructure) ||
      isStructureSpawnWithCapacity(foundStructure)
  })
}
