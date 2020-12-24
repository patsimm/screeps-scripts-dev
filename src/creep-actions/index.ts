import {
  ConcreteCreepActionOpts,
  CreepActionType,
  _performAction,
  _updateAction,
} from "./actions"

export const updateAction = <T extends CreepActionType>(
  creep: Creep,
  newActionType: T,
  opts: ConcreteCreepActionOpts<T>,
  fallback?: CreepActionType[]
): void => _updateAction(creep, newActionType, opts, fallback || [])

export const performAction = (creep: Creep): void => _performAction(creep)
