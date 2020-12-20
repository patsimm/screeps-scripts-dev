import { isStructureOfType } from "./helpers"

export type CreepAction =
  | "harvesting"
  | "building"
  | "upgrading"
  | "unloading"
  | "attacking"
  | "idle"

export const performAction = (creep: Creep) =>
  actions[creep.memory.action](creep)

export const updateAction = (creep: Creep, newAction: CreepAction) => {
  creep.memory.action = newAction
  creep.say(actionIcons[newAction] + " " + newAction)
}

const doUpgrade = (creep: Creep) => {
  if (creep.room.controller) {
    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller)
    }
  }
}

const doBuild = (creep: Creep) => {
  const constructionSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES)
  if (creep.build(constructionSites[0]) == ERR_NOT_IN_RANGE) {
    creep.moveTo(constructionSites[0])
  }
}

const doHarvest = (creep: Creep) => {
  const sources = creep.room.find(FIND_SOURCES_ACTIVE)
  if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
    creep.moveTo(sources[0])
  }
}

const doUnload = (creep: Creep) => {
  const targets = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) =>
      isStructureOfType(structure, [
        STRUCTURE_SPAWN,
        STRUCTURE_TOWER,
        STRUCTURE_EXTENSION,
      ]) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
  })
  if (targets[0]) {
    if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0])
    }
  } else if (creep.room.controller) {
    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller)
    }
  }
}

const doAttack = (creep: Creep) => {
  const targets = creep.room.find(FIND_HOSTILE_CREEPS)
  if (targets[0]) {
    const target = targets[0]
    if (creep.body.length > target.body.length) {
      if (creep.attack(targets[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0])
      }
    }
  }
}

type CreepActionFunction = (creep: Creep) => void

const actions: { [key in CreepAction]: CreepActionFunction } = {
  building: doBuild,
  harvesting: doHarvest,
  unloading: doUnload,
  upgrading: doUpgrade,
  attacking: doAttack,
  idle: () => {},
}

const actionIcons: { [key in CreepAction]: string } = {
  building: "🚧",
  harvesting: "⛏",
  unloading: "📥",
  upgrading: "⏫",
  attacking: "⚔️",
  idle: "😴",
}
