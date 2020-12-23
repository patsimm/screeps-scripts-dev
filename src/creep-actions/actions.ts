import building from "./action.building"
import attacking from "./action.attacking"
import harvesting from "./action.harvesting"
import unloading from "./action.unloading"
import upgrading from "./action.upgrading"
import loading from "./action.loading"
import transferring from "./action.transferring"
import repairing from "./action.repairing"

const actions: CreepActions = {
  building,
  harvesting,
  unloading,
  loading,
  upgrading,
  attacking,
  transferring,
  repairing,
  idle: {
    findTarget: (creep) => creep.id,
    perform: () => {},
    icon: "😴",
  },
}

export type CreepActionType =
  | "harvesting"
  | "building"
  | "upgrading"
  | "unloading"
  | "attacking"
  | "loading"
  | "transferring"
  | "repairing"
  | "idle"

export interface CreepAction {
  findTarget: CreepActionTargeter
  perform: CreepActionFunction
  fallback?: CreepActionType
  icon: string
}

export interface CreepActionMemory {
  type: CreepActionType
  target: Id<any>
  counter: number
  triedTargets: Array<Id<any>>
}

export type CreepActionFunction = (creep: Creep, target: any) => void

export type CreepActionTargeter = (creep: Creep) => Id<any> | undefined

export type CreepActions = { [key in CreepActionType]: CreepAction }

export const performAction = (creep: Creep) => {
  if (creep.memory.action.counter++ > 10) {
    console.log(
      "action counter too large from creep " +
        creep.name +
        ", tried to perform " +
        creep.memory.action.type
    )
    console.log(creep.memory.action.triedTargets)
    updateAction(creep, "idle")
    return
  }

  const target = Game.getObjectById(creep.memory.action.target)

  if (!target) {
    updateAction(creep, creep.memory.action.type)
    performAction(creep)
    return
  }

  actions[creep.memory.action.type].perform(creep, target)
}

export const updateAction = (
  creep: Creep,
  newActionType: CreepActionType
): void => {
  const action = actions[newActionType]
  const actionTarget = action.findTarget(creep)
  if (!actionTarget) {
    return action.fallback
      ? updateAction(creep, action.fallback)
      : updateAction(creep, "idle")
  }

  creep.memory.action.type = newActionType
  creep.memory.action.target = actionTarget
  creep.memory.action.triedTargets.push(actionTarget)
  creep.say(action.icon)
}

export const rerunAction = (creep: Creep) => {
  updateAction(creep, creep.memory.action.type)
  performAction(creep)
}