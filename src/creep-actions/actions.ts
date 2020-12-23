import building from "./action.building"
import attacking from "./action.attacking"
import harvesting from "./action.harvesting"
import unloading from "./action.unloading"
import upgrading from "./action.upgrading"
import loading from "./action.loading"
import transferring from "./action.transferring"
import repairing from "./action.repairing"

export type CreepActionFunction<Opts extends {}> = (
  creep: Creep,
  target: any,
  options: Opts
) => void

export type CreepActionTargeter = (creep: Creep) => Id<any> | undefined

export interface CreepAction<T, Opts extends {} = {}> {
  type: T
  findTarget: CreepActionTargeter
  perform: CreepActionFunction<Opts>
  icon: string
}

const actions = {
  building,
  harvesting,
  unloading,
  loading,
  upgrading,
  attacking,
  transferring,
  repairing,
  idle: {
    type: "idle",
    findTarget: (creep: Creep) => creep.id,
    perform: () => {},
    icon: "😴",
  } as CreepAction<"idle", {}>,
}

export type AnyCreepAction = typeof actions[keyof typeof actions] extends infer A
  ? A extends CreepAction<any, any>
    ? A
    : never
  : never

export type CreepActionType = AnyCreepAction extends CreepAction<infer T, any>
  ? T
  : never

export type ConcreteCreepAction<T extends CreepActionType> = Extract<
  AnyCreepAction,
  CreepAction<T, any>
>

export type CreepActionOpts = typeof actions[keyof typeof actions] extends infer O
  ? O extends CreepAction<any, infer T>
    ? T
    : never
  : never

export type ConcreteCreepActionOpts<
  T extends CreepActionType
> = ConcreteCreepAction<T> extends CreepAction<any, infer Opts> ? Opts : never

export type ConcreteCreepActionMemory<
  T extends CreepActionType = CreepActionType
> = {
  type: T
  target: Id<any>
  counter: number
  triedTargets: Array<Id<any>>
  opts: ConcreteCreepActionOpts<T>
  fallback: CreepActionType[]
}

export type CreepActionMemory = CreepActionType extends infer C
  ? C extends CreepActionType
    ? ConcreteCreepActionMemory<C>
    : never
  : never

export const performAction = (creep: Creep) => {
  if (creep.memory.action.counter++ > 10) {
    console.log(
      "action counter too large from creep " +
        creep.name +
        ", tried to perform " +
        creep.memory.action.type
    )
    console.log(creep.memory.action.triedTargets)
    updateAction(creep, "idle", {})
    return
  }

  const target = Game.getObjectById(creep.memory.action.target)

  if (!target) {
    _updateAction(
      creep,
      creep.memory.action.type,
      creep.memory.action.opts,
      creep.memory.action.fallback
    )
    performAction(creep)
    return
  }

  const recordActions: Record<CreepActionType, CreepAction<unknown>> = actions

  recordActions[creep.memory.action.type].perform(
    creep,
    target,
    creep.memory.action.opts
  )
}

const _updateAction = (
  creep: Creep,
  newActionType: CreepActionType,
  opts: CreepActionOpts,
  fallback: CreepActionType[]
): void => {
  const action = actions[newActionType]
  const actionTarget = action.findTarget(creep)
  if (!actionTarget) {
    return fallback && _.first(fallback)
      ? _updateAction(
          creep,
          _.first(fallback) as CreepActionType,
          opts,
          _.rest(fallback)
        )
      : updateAction(creep, "idle", {})
  }

  creep.memory.action.type = newActionType
  creep.memory.action.target = actionTarget
  creep.memory.action.triedTargets.push(actionTarget)
  creep.memory.action.fallback = fallback
  creep.memory.action.opts = opts
  creep.say(action.icon)
}

export const updateAction = <T extends CreepActionType>(
  creep: Creep,
  newActionType: T,
  opts: ConcreteCreepActionOpts<T>,
  fallback?: CreepActionType[]
): void => _updateAction(creep, newActionType, opts, fallback || [])

export const rerunAction = (creep: Creep) => {
  _updateAction(
    creep,
    creep.memory.action.type,
    creep.memory.action.opts,
    creep.memory.action.fallback
  )
  performAction(creep)
}
