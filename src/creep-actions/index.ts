import building from "./building.action"
import attacking from "./attacking.action"
import harvesting from "./harvesting.action"
import unloading from "./unloading.action"
import upgrading from "./upgrading.action"
import loading from "./loading.action"

const actions: CreepActions = {
  building,
  harvesting,
  unloading,
  loading,
  upgrading,
  attacking,
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
  | "idle"

export interface CreepAction {
  findTarget: CreepActionTargeter
  perform: CreepActionFunction
  fallback?: CreepActionType
  icon: string
}

export type CreepActionFunction = (creep: Creep, target: any) => void

export type CreepActionTargeter = (creep: Creep) => Id<any> | undefined

export type CreepActions = { [key in CreepActionType]: CreepAction }

export const performAction = (creep: Creep) => {
  const target = Game.getObjectById(creep.memory.actionTarget)
  actions[creep.memory.action].perform(creep, target)
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

  creep.memory.action = newActionType
  creep.memory.actionTarget = actionTarget
  creep.say(action.icon)
}
