import { CreepMemoryBase, CreepAction } from './creep-base'
import {
  harvestClosestSourceByRange,
  transferToCreep,
  upgradeController,
  setAction,
  buildSite
} from './helper-functions'

function findSiteWithHighestProgressInRoom(room: Room): ConstructionSite {
  var sitesInRoom = room.find(FIND_CONSTRUCTION_SITES)
  if (sitesInRoom.length) {
    return sitesInRoom.reduce((prev, curr) => (prev.progress > curr.progress ? prev : curr))
  }
}

function performActionTransitions(creep: Creep) {
  const sitesInRoom = creep.room.find(FIND_CONSTRUCTION_SITES)
  const memory: CreepMemoryBase = creep.memory as any
  switch (memory.action) {
    case CreepAction.BUILD:
      if (creep.carry.energy == 0 || !sitesInRoom.length) {
        setAction(creep, CreepAction.HARVEST)
      }
      break
    case CreepAction.HARVEST:
      if (creep.carry.energy == creep.carryCapacity) {
        sitesInRoom.length
          ? setAction(creep, CreepAction.BUILD)
          : setAction(creep, CreepAction.UPGRADE)
      }
      break
    case CreepAction.UPGRADE:
      if (creep.carry.energy == 0) {
        setAction(creep, CreepAction.HARVEST)
      } else if (sitesInRoom.length) {
        setAction(creep, CreepAction.BUILD)
      }
      break
    default:
      setAction(creep, CreepAction.HARVEST)
  }
}

export function loop(creep: Creep) {
  performActionTransitions(creep)

  const memory: CreepMemoryBase = creep.memory as any
  switch (memory.action) {
    case CreepAction.BUILD:
      let targetSite: ConstructionSite
      if ((targetSite = findSiteWithHighestProgressInRoom(creep.room)) != undefined) {
        buildSite(creep, targetSite)
      }
      break
    case CreepAction.HARVEST:
      harvestClosestSourceByRange(creep)
      break
    case CreepAction.UPGRADE:
      upgradeController(creep, creep.room.controller)
      break
  }
}
