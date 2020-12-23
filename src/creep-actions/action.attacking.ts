import { CreepAction } from "./actions"

const findTarget = (creep: Creep) => {
  const targets = creep.room.find(FIND_HOSTILE_CREEPS, {
    filter: (hostileCreep) => creep.body.length > hostileCreep.body.length,
  })
  return targets[0]?.id
}

const perform = (creep: Creep, target: any) => {
  if (creep.attack(target) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  }
}

const action: CreepAction<"attacking"> = {
  type: "attacking",
  findTarget,
  perform,
  icon: "⚔️",
}

export default action
