import { upgradeController, setAction, harvestClosestSourceByRange } from './helper-functions'
import { CreepMemoryBase, CreepAction } from './creep-base'

function performActionTransitions(creep: Creep) {
  const memory = creep.memory as CreepMemoryBase
  switch (memory.action) {
    case CreepAction.HARVEST:
      if (creep.carry.energy == creep.carryCapacity) {
        setAction(creep, CreepAction.UPGRADE)
      }
      break
    case CreepAction.UPGRADE:
      if (creep.carry.energy == 0) {
        setAction(creep, CreepAction.HARVEST)
      }
      break
    default:
      setAction(creep, CreepAction.HARVEST)
  }
}

export function loop(creep: Creep) {
  performActionTransitions(creep)

  const memory = creep.memory as CreepMemoryBase
  switch (memory.action) {
    case CreepAction.HARVEST:
      harvestClosestSourceByRange(creep)
      break
    case CreepAction.UPGRADE:
      upgradeController(creep, creep.room.controller)
      break
  }
}
