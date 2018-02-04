import { CreepMemoryBase, Role, CreepAction } from './creep-base'
import {
  findCreepsOfRoleInRoom,
  findClosestCreepWithCapacityByPath,
  harvestClosestSourceByRange,
  transferToCreep,
  transferToSpawn,
  setAction,
  findClosestExtensionWithCapacityByPath,
  transferToExtension,
  harvestClosestSourceByPath,
  findClosestStructureWithCapacityByPath,
  transferToStructure
} from './helper-functions'

function performActionTransitions(creep: Creep) {
  const memory: CreepMemoryBase = creep.memory as any
  switch (memory.action) {
    case CreepAction.HARVEST:
      if (creep.carry.energy == creep.carryCapacity) {
        setAction(creep, CreepAction.TRANSFER)
      }
      break
    case CreepAction.TRANSFER:
      if (creep.carry.energy == 0) {
        setAction(creep, CreepAction.HARVEST)
      }
      break
    default:
      setAction(creep, CreepAction.HARVEST)
  }
}

function transfer(creep: Creep) {
  let targetCreep: Creep
  let targetStructure: Structure
  if ((targetStructure = findClosestStructureWithCapacityByPath(creep.pos))) {
    transferToStructure(creep, targetStructure, RESOURCE_ENERGY)
  } else if ((targetCreep = findCreepsOfRoleInRoom(Role.BUILDER, creep.room)[0]) != undefined) {
    transferToCreep(creep, targetCreep, RESOURCE_ENERGY)
  } else if ((targetCreep = findClosestCreepWithCapacityByPath(creep.pos)) != undefined) {
    transferToCreep(creep, targetCreep, RESOURCE_ENERGY)
  } else {
    setAction(creep, CreepAction.HARVEST)
  }
}

export function loop(creep: Creep) {
  performActionTransitions(creep)
  const memory: CreepMemoryBase = creep.memory as any
  switch (memory.action) {
    case CreepAction.HARVEST:
      harvestClosestSourceByPath(creep)
      break
    case CreepAction.TRANSFER:
      transfer(creep)
      break
  }
}
