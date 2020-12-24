import { openRectAround } from "./helpers"
import * as tower from "./tower"

export const run = (room: Room) => {
  if (room.controller) {
    const possibleExtensionAmount =
      levelToExtensionAmount[room.controller.level]
    const currentExtensionAmount = currentAmountPlusBuildingSites(
      room,
      STRUCTURE_EXTENSION
    )
    if (currentExtensionAmount < possibleExtensionAmount) {
      buildExtensions(room, possibleExtensionAmount)
    }
  }

  const spawn = room.find(FIND_MY_SPAWNS)[0]
  const sources = room.find(FIND_SOURCES)
  sources.forEach((source) => {
    if (!_.includes(spawn.memory.pathsBuilt, source.id)) {
      const path = spawn.pos.findPathTo(source.pos, { ignoreCreeps: true })
      _.slice(path, 0, path.length - 1).forEach((step) => {
        room.createConstructionSite(step.x, step.y, STRUCTURE_ROAD)
      })
      spawn.memory.pathsBuilt.push(source.id)
    }
  })

  room
    .find(FIND_MY_STRUCTURES)
    .filter(
      (structure): structure is StructureTower =>
        structure.structureType === STRUCTURE_TOWER
    )
    .forEach(tower.run)
}

const currentAmountPlusBuildingSites = (
  room: Room,
  structureType: StructureConstant
) => {
  const currentExtensions = room.find(FIND_MY_STRUCTURES, {
    filter: (structure) => structure.structureType === structureType,
  })
  const currentBuildingSites = room.find(FIND_MY_CONSTRUCTION_SITES, {
    filter: (site) => site.structureType === structureType,
  })
  return currentExtensions.length + currentBuildingSites.length
}

const buildExtensions = (room: Room, amount: number) => {
  const spawns = room.find(FIND_MY_SPAWNS)
  if (spawns[0]) {
    const spawnPos = spawns[0].pos
    const potentialPositions = _.flatten(
      _.range(2, 5).map((dist) => openRectAround(spawnPos, dist).positions)
    )
    const possiblePositions = _.slice(potentialPositions, 0, amount)
    _.forEach(possiblePositions, (pos) => {
      room.createConstructionSite(pos.x, pos.y, STRUCTURE_EXTENSION)
    })
  }
}

const levelToExtensionAmount = {
  1: 0,
  2: 5,
  3: 10,
  4: 20,
  5: 30,
  6: 40,
  7: 50,
  8: 60,
} as { [key: number]: number }
