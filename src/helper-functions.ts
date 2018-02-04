import { CreepMemoryBase, Role, CreepAction } from './creep-base'

export function setAction(creep: Creep, action: CreepAction) {
  const memory: CreepMemoryBase = creep.memory as any
  switch (action) {
    case CreepAction.BUILD:
      creep.say('🚧')
      break
    case CreepAction.HARVEST:
      creep.say('⛏')
      break
    case CreepAction.TRANSFER:
      creep.say('📦')
      break
    case CreepAction.UPGRADE:
      creep.say('⏫')
      break
    case CreepAction.COLLECT:
      creep.say('🤲')
      break
    case CreepAction.REGENERATE:
      creep.say('😴')
  }
  memory.action = action
}

export function moveAndUpgradeController(creep: Creep, controller: StructureController) {
  if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
    creep.moveTo(controller, { visualizePathStyle: { stroke: '#3333ff' } })
  }
}

export function moveAndHarvestClosestSourceByRange(creep: Creep) {
  const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE)
  if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
    creep.moveTo(source.pos, { visualizePathStyle: { stroke: '#ffaa00' } })
  }
}

export function moveAndHarvestClosestSourceByPath(creep: Creep) {
  const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
  if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
    creep.moveTo(source.pos, { visualizePathStyle: { stroke: '#ffaa00' } })
  }
}

export function moveAndTransferToCreep(
  creep: Creep,
  target: Creep,
  resourceType: ResourceConstant
) {
  if (creep.transfer(target, resourceType) == ERR_NOT_IN_RANGE) {
    creep.moveTo(target, { visualizePathStyle: { stroke: '#33ff33' } })
  }
}

export function moveToClosestSpawnByPath(creep: Creep) {
  creep.moveTo(creep.pos.findClosestByPath(FIND_MY_SPAWNS), {
    visualizePathStyle: { stroke: '#ffff33' }
  })
}

export function moveAndTransferToSpawn(
  creep: Creep,
  spawn: StructureSpawn,
  resourceType: ResourceConstant
) {
  if (creep.transfer(spawn, resourceType) == ERR_NOT_IN_RANGE) {
    creep.moveTo(spawn, { visualizePathStyle: { stroke: '#33ff33' } })
  }
}

export function moveAndTransferToExtension(
  creep: Creep,
  spawn: StructureExtension,
  resourceType: ResourceConstant
) {
  if (creep.transfer(spawn, resourceType) == ERR_NOT_IN_RANGE) {
    creep.moveTo(spawn, { visualizePathStyle: { stroke: '#33ff33' } })
  }
}

export function moveAndTransferToStructure(
  creep: Creep,
  structure: Structure,
  resourceType: ResourceConstant
) {
  if (creep.transfer(structure, resourceType) == ERR_NOT_IN_RANGE) {
    creep.moveTo(structure, { visualizePathStyle: { stroke: '#33ff33' } })
  }
}

export function moveAndBuildSite(creep: Creep, site: ConstructionSite) {
  if (creep.build(site) == ERR_NOT_IN_RANGE) {
    creep.moveTo(site, { visualizePathStyle: { stroke: '#ffffff' } })
  }
}

export function moveToCollectionPoint(creep: Creep) {
  let targetCreep: Creep
  // let targetSource: Source
  if ((targetCreep = findClosestCreepOfRoleWithoutCapacityByPath(creep.pos, [Role.HARVESTER]))) {
    creep.moveTo(targetCreep, { visualizePathStyle: { stroke: '#ffaa00' } })
  } else if ((targetCreep = findClosestCreepOfRoleByPath(creep.pos, [Role.HARVESTER]))) {
    creep.moveTo(targetCreep, { visualizePathStyle: { stroke: '#ffaa00' } })
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

export function findCreepsOfRoleInRange(pos: RoomPosition, range: number, roles: Role[]) {
  return pos.findInRange(FIND_MY_CREEPS, range, {
    filter: (foundCreep: Creep) => roles.indexOf((foundCreep.memory as CreepMemoryBase).role) !== -1
  })
}

export function findClosestCreepOfRoleByPath(pos: RoomPosition, roles: Role[]): Creep {
  return pos.findClosestByPath(FIND_MY_CREEPS, {
    filter: foundCreep => roles.indexOf((foundCreep.memory as CreepMemoryBase).role) !== -1
  })
}

export function findClosestCreepWithCapacityByPath(
  pos: RoomPosition,
  filter?: FilterFunction<FIND_MY_CREEPS>
): Creep {
  return pos.findClosestByPath(FIND_MY_CREEPS, {
    filter: foundCreep =>
      foundCreep.carry.energy < foundCreep.carryCapacity && (filter ? filter(foundCreep) : true)
  })
}

export function findClosestCreepOfRoleWithCapacityByPath(pos: RoomPosition, roles: Role[]): Creep {
  return findClosestCreepWithCapacityByPath(
    pos,
    foundCreep => roles.indexOf((foundCreep.memory as CreepMemoryBase).role) !== -1
  )
}

export function findClosestCreepWithCapacityByRange(
  pos: RoomPosition,
  filter?: FilterFunction<FIND_MY_CREEPS>
): Creep {
  return pos.findClosestByRange(FIND_MY_CREEPS, {
    filter: foundCreep =>
      foundCreep.carry.energy < foundCreep.carryCapacity && (filter ? filter(foundCreep) : true)
  })
}

export function findClosestCreepOfRoleWithCapacityByRange(pos: RoomPosition, roles: Role[]): Creep {
  return findClosestCreepWithCapacityByRange(
    pos,
    foundCreep => roles.indexOf((foundCreep.memory as CreepMemoryBase).role) !== -1
  )
}

export function findClosestCreepWithoutCapacityByPath(
  pos: RoomPosition,
  filter?: FilterFunction<FIND_MY_CREEPS>
): Creep {
  return pos.findClosestByPath(FIND_MY_CREEPS, {
    filter: foundCreep =>
      foundCreep.carry.energy == foundCreep.carryCapacity && (filter ? filter(foundCreep) : true)
  })
}

export function findClosestCreepOfRoleWithoutCapacityByPath(
  pos: RoomPosition,
  roles: Role[]
): Creep {
  return findClosestCreepWithoutCapacityByPath(
    pos,
    foundCreep => roles.indexOf((foundCreep.memory as CreepMemoryBase).role) !== -1
  )
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

export function findAdjacentStructuresWithCapacity(pos: RoomPosition): Structure[] {
  return pos.findInRange(FIND_MY_STRUCTURES, 1, {
    filter: (foundStructure: Structure) =>
      isStructureExtensionWithCapacity(foundStructure) ||
      isStructureSpawnWithCapacity(foundStructure)
  })
}

export function findSiteWithHighestProgressInRoom(room: Room): ConstructionSite {
  var sitesInRoom = room.find(FIND_CONSTRUCTION_SITES)
  if (sitesInRoom.length) {
    return sitesInRoom.reduce((prev, curr) => (prev.progress > curr.progress ? prev : curr))
  }
}
