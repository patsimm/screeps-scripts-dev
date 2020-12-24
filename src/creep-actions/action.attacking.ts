import {
  buildAction,
  CreepActionFunction,
  CreepActionTargeter,
} from "./build-action"

const findTarget: CreepActionTargeter = (creep: Creep) => {
  const targets = creep.room.find(FIND_HOSTILE_CREEPS, {
    filter: (hostileCreep) => creep.body.length > hostileCreep.body.length,
  })
  return targets[0]?.id
}

const perform: CreepActionFunction = (creep: Creep, target: any) => {
  if (creep.attack(target) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  }
}

const action = buildAction("attacking", findTarget, perform, "⚔️")
export default action
