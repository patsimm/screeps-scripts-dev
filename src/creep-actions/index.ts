import building from "./building.action"
import attacking from "./attacking.action"
import harvesting from "./harvesting.action"
import unloading from "./unloading.action"
import upgrading from "./upgrading.action"

export type CreepActionType =
  | "harvesting"
  | "building"
  | "upgrading"
  | "unloading"
  | "attacking"
  | "idle"

export interface CreepAction {
  findTarget: CreepActionTargeter
  perform: CreepActionFunction
}

export type CreepActionFunction = (creep: Creep, target: any) => void

export type CreepActionTargeter = (creep: Creep) => Id<any> | undefined

export type CreepActions = { [key in CreepActionType]: CreepAction }

const actions: CreepActions = {
  building,
  harvesting,
  unloading,
  upgrading,
  attacking,
  idle: {
    findTarget: () => undefined,
    perform: () => {},
  },
}

export const performAction = (creep: Creep) => {
  const target = Game.getObjectById(creep.memory.actionTarget)
  actions[creep.memory.action].perform(creep, target)
}

export const updateAction = (creep: Creep, newAction: CreepActionType) => {
  const actionTarget = actions[newAction].findTarget(creep)
  if (!actionTarget) {
    creep.memory.action = "idle"
    creep.memory.actionTarget = creep.id
    return
  }

  creep.memory.action = newAction
  creep.memory.actionTarget = actionTarget
  creep.say(actionIcons[newAction] + " " + newAction)
}

const actionIcons: { [key in CreepActionType]: string } = {
  building: "🚧",
  harvesting: "⛏",
  unloading: "📥",
  upgrading: "⏫",
  attacking: "⚔️",
  idle: "😴",
}
