import { isStructureOfType } from "./helpers"

export type CreepAction =
  | "harvesting"
  | "building"
  | "upgrading"
  | "unloading"
  | "attacking"
  | "idle"

export const performAction = (creep: Creep) => {
  const target = Game.getObjectById(creep.memory.actionTarget)
  actions[creep.memory.action](creep, target)
}

export const updateAction = (creep: Creep, newAction: CreepAction) => {
  const actionTarget = targeters[newAction](creep)
  if (!actionTarget) {
    creep.memory.action = "idle"
    creep.memory.actionTarget = creep.id
    return
  }

  creep.memory.action = newAction
  creep.memory.actionTarget = actionTarget
  creep.say(actionIcons[newAction] + " " + newAction)
}

const findUpgradeTarget = (creep: Creep) => {
  if (creep.room.controller) {
    return creep.room.controller.id
  }
}

const doUpgrade = (creep: Creep, target: any) => {
  if (creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  }
}

const findBuildTarget = (creep: Creep) => {
  const constructionSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES)
  return constructionSites[0]?.id
}

const doBuild = (creep: Creep, target: any) => {
  const buildStatus = creep.build(target)
  if (buildStatus == ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  } else if (buildStatus == ERR_INVALID_TARGET) {
    updateAction(creep, "building")
    performAction(creep)
  }
}

const findHarvestTarget = (creep: Creep) => {
  const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {
    filter: (source) =>
      source.pos.findInRange(FIND_HOSTILE_CREEPS, 5).length === 0 &&
      source.pos.findInRange(FIND_HOSTILE_STRUCTURES, 5).length === 0,
  })
  return source?.id
}

const doHarvest = (creep: Creep, target: any) => {
  if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  }
}

const findUnloadTarget = (creep: Creep) => {
  const targets = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) =>
      isStructureOfType(structure, [
        STRUCTURE_SPAWN,
        STRUCTURE_TOWER,
        STRUCTURE_EXTENSION,
      ]) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
  })
  return targets[0]?.id || creep.room.controller?.id
}

const doUnload = (creep: Creep, target: AnyStructure) => {
  if (isStructureOfType(target, [STRUCTURE_CONTROLLER])) {
    if (creep.upgradeController(target) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target)
    }
  } else {
    const transferStatus = creep.transfer(target, RESOURCE_ENERGY)
    if (transferStatus === ERR_NOT_IN_RANGE) {
      creep.moveTo(target)
    } else if (transferStatus === ERR_FULL) {
      updateAction(creep, "unloading")
      performAction(creep)
    }
  }
}

const findAttackTarget = (creep: Creep) => {
  const targets = creep.room.find(FIND_HOSTILE_CREEPS, {
    filter: (hostileCreep) => creep.body.length > hostileCreep.body.length,
  })
  return targets[0]?.id
}

const doAttack = (creep: Creep, target: any) => {
  if (creep.attack(target) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  }
}

type CreepActionFunction = (creep: Creep, target: any) => void

const actions: { [key in CreepAction]: CreepActionFunction } = {
  building: doBuild,
  harvesting: doHarvest,
  unloading: doUnload,
  upgrading: doUpgrade,
  attacking: doAttack,
  idle: () => {},
}

type CreepActionTargeter = (creep: Creep) => Id<any> | undefined

const targeters: { [key in CreepAction]: CreepActionTargeter } = {
  building: findBuildTarget,
  harvesting: findHarvestTarget,
  unloading: findUnloadTarget,
  upgrading: findUpgradeTarget,
  attacking: findAttackTarget,
  idle: () => undefined,
}

const actionIcons: { [key in CreepAction]: string } = {
  building: "🚧",
  harvesting: "⛏",
  unloading: "📥",
  upgrading: "⏫",
  attacking: "⚔️",
  idle: "😴",
}
