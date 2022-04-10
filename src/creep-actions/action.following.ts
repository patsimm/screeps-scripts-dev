import {
  CreepAction,
  CreepActionFunction,
  CreepActionTargeter,
} from "./_action"

interface FollowingOptions {
  id: Id<any>
}

const findTarget: CreepActionTargeter<FollowingOptions> = (
  _creep: Creep,
  options: FollowingOptions
) => {
  return options.id
}

const perform: CreepActionFunction<FollowingOptions> = (
  creep: Creep,
  target: any
) => {
  creep.moveTo(target)
}

export default CreepAction("following", findTarget, perform, "🏃‍♀️🏃")
