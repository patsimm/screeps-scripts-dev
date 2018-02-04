import { CreepMemoryBase, Role, CreepAction } from './creep-base'
import {
  setAction,
  moveAndHarvestClosestSourceByPath,
  findCreepsOfRoleInRange,
  moveToClosestSpawnByPath
} from './helper-functions'

function performActionTransitions(creep: Creep) {
  const memory: CreepMemoryBase = creep.memory as any

  if (creep.ticksToLive < 200) {
    setAction(creep, CreepAction.REGENERATE)
  }

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
    case CreepAction.REGENERATE:
      if (creep.ticksToLive > 700) {
        setAction(creep, CreepAction.HARVEST)
      }
      break
    default:
      setAction(creep, CreepAction.HARVEST)
  }
}

function transfer(creep: Creep) {
  let adjacentCreeps = findCreepsOfRoleInRange(creep.pos, 1, [
    Role.UPGRADER,
    Role.WALKER,
    Role.BUILDER
  ])
  if (adjacentCreeps.length) {
    let targetCreep = adjacentCreeps.reduce((prev, curr) => {
      return (curr.memory as CreepMemoryBase).role === Role.WALKER
        ? curr
        : curr.carry.energy > prev.carry.energy ? curr : prev
    })
    creep.transfer(targetCreep, RESOURCE_ENERGY)
  } else {
    setAction(creep, CreepAction.HARVEST)
  }
}

export function loop(creep: Creep) {
  performActionTransitions(creep)
  const memory: CreepMemoryBase = creep.memory as any
  switch (memory.action) {
    case CreepAction.HARVEST:
      moveAndHarvestClosestSourceByPath(creep)
      break
    case CreepAction.TRANSFER:
      transfer(creep)
      break
    case CreepAction.REGENERATE:
      moveToClosestSpawnByPath(creep)
      break
  }
}
