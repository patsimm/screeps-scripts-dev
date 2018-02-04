import { CreepMemoryBase, CreepAction } from './creep-base'
import {
  moveAndUpgradeController,
  setAction,
  moveAndBuildSite,
  findSiteWithHighestProgressInRoom,
  moveToCollectionPoint
} from './helper-functions'

function performActionTransitions(creep: Creep) {
  const sitesInRoom = creep.room.find(FIND_CONSTRUCTION_SITES)
  const memory: CreepMemoryBase = creep.memory as any
  switch (memory.action) {
    case CreepAction.BUILD:
      if (creep.carry.energy == 0 || !sitesInRoom.length) {
        setAction(creep, CreepAction.COLLECT)
      }
      break
    case CreepAction.COLLECT:
      if (creep.carry.energy == creep.carryCapacity) {
        sitesInRoom.length
          ? setAction(creep, CreepAction.BUILD)
          : setAction(creep, CreepAction.UPGRADE)
      }
      break
    case CreepAction.UPGRADE:
      if (creep.carry.energy == 0) {
        setAction(creep, CreepAction.COLLECT)
      } else if (sitesInRoom.length) {
        setAction(creep, CreepAction.BUILD)
      }
      break
    default:
      setAction(creep, CreepAction.COLLECT)
  }
}

export function loop(creep: Creep) {
  performActionTransitions(creep)

  const memory: CreepMemoryBase = creep.memory as any
  switch (memory.action) {
    case CreepAction.BUILD:
      let targetSite: ConstructionSite
      if ((targetSite = findSiteWithHighestProgressInRoom(creep.room)) != undefined) {
        moveAndBuildSite(creep, targetSite)
      }
      break
    case CreepAction.COLLECT:
      moveToCollectionPoint(creep)
      break
    case CreepAction.UPGRADE:
      moveAndUpgradeController(creep, creep.room.controller)
      break
  }
}
