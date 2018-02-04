import { CreepMemoryBase, CreepAction, Role } from './creep-base'
import {
  setAction,
  moveAndTransferToStructure,
  moveAndTransferToCreep,
  findClosestCreepOfRoleWithCapacityByPath,
  moveToCollectionPoint,
  findAdjacentStructuresWithCapacity,
  moveToClosestSpawnByPath,
  findClosestStructureWithCapacityByRange
} from './helper-functions'

function performActionTransitions(creep: Creep) {
  const memory = creep.memory as CreepMemoryBase

  if (creep.ticksToLive < 200) {
    setAction(creep, CreepAction.REGENERATE)
  }

  switch (memory.action) {
    case CreepAction.COLLECT:
      if (creep.carry.energy == creep.carryCapacity) {
        setAction(creep, CreepAction.TRANSFER)
      }
      break
    case CreepAction.TRANSFER:
      if (creep.carry.energy == 0) {
        setAction(creep, CreepAction.COLLECT)
      }
      break
    case CreepAction.REGENERATE:
      if (creep.ticksToLive > 700) {
        setAction(creep, CreepAction.COLLECT)
      }
      break
    default:
      setAction(creep, CreepAction.COLLECT)
  }
}

function transfer(creep: Creep) {
  let targetCreep: Creep
  let targetStructure: Structure
  if ((targetStructure = findClosestStructureWithCapacityByRange(creep.pos))) {
    moveAndTransferToStructure(creep, targetStructure, RESOURCE_ENERGY)
  } else if (
    (targetCreep = findClosestCreepOfRoleWithCapacityByPath(creep.pos, [Role.BUILDER])) != undefined
  ) {
    moveAndTransferToCreep(creep, targetCreep, RESOURCE_ENERGY)
  } else if (
    (targetCreep = findClosestCreepOfRoleWithCapacityByPath(creep.pos, [Role.UPGRADER])) !=
    undefined
  ) {
    moveAndTransferToCreep(creep, targetCreep, RESOURCE_ENERGY)
  } else {
    setAction(creep, CreepAction.COLLECT)
  }
}

function doAlways(creep: Creep) {
  const adjacentStructuresWithCapacity = findAdjacentStructuresWithCapacity(creep.pos)
  if (adjacentStructuresWithCapacity.length) {
    creep.transfer(adjacentStructuresWithCapacity[0], RESOURCE_ENERGY)
  }
}

export function loop(creep: Creep) {
  performActionTransitions(creep)
  doAlways(creep)

  const memory = creep.memory as CreepMemoryBase
  switch (memory.action) {
    case CreepAction.COLLECT:
      moveToCollectionPoint(creep)
      break
    case CreepAction.TRANSFER:
      transfer(creep)
      break
    case CreepAction.REGENERATE:
      moveToClosestSpawnByPath(creep)
      break
  }
}
