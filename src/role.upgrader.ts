import {
  moveAndUpgradeController,
  setAction,
  moveToCollectionPoint,
  moveToClosestSpawnByPath
} from './helper-functions'
import { CreepMemoryBase, CreepAction } from './creep-base'

function performActionTransitions(creep: Creep) {
  const memory = creep.memory as CreepMemoryBase

  if (creep.ticksToLive < 200) {
    setAction(creep, CreepAction.REGENERATE)
  }

  switch (memory.action) {
    case CreepAction.COLLECT:
      if (creep.carry.energy == creep.carryCapacity) {
        setAction(creep, CreepAction.UPGRADE)
      }
      break
    case CreepAction.UPGRADE:
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

export function loop(creep: Creep) {
  performActionTransitions(creep)

  const memory = creep.memory as CreepMemoryBase
  switch (memory.action) {
    case CreepAction.COLLECT:
      moveToCollectionPoint(creep)
      break
    case CreepAction.UPGRADE:
      moveAndUpgradeController(creep, creep.room.controller)
      break
    case CreepAction.REGENERATE:
      moveToClosestSpawnByPath(creep)
      break
  }
}