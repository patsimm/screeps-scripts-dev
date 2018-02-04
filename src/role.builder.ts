import { CreepMemoryBase, CreepAction } from './creep-base'
import {
  moveAndUpgradeController,
  setAction,
  moveAndBuildSite,
  findSiteWithHighestProgressInRoom,
  moveToCollectionPoint,
  moveToClosestSpawnByPath,
  findStructureToRepairWithLowestHealthInRoom,
  moveAndRepairStructure
} from './helper-functions'

function performActionTransitions(creep: Creep) {
  const memory: CreepMemoryBase = creep.memory as any

  if (creep.ticksToLive < 200) {
    setAction(creep, CreepAction.REGENERATE)
  }

  const sitesInRoom = creep.room.find(FIND_CONSTRUCTION_SITES)
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

  const memory: CreepMemoryBase = creep.memory as any
  switch (memory.action) {
    case CreepAction.BUILD:
      let targetSite: ConstructionSite
      let targetStructure: Structure
      if ((targetStructure = findStructureToRepairWithLowestHealthInRoom(creep.room))) {
        moveAndRepairStructure(creep, targetStructure)
      } else if ((targetSite = findSiteWithHighestProgressInRoom(creep.room))) {
        moveAndBuildSite(creep, targetSite)
      }
      break
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
