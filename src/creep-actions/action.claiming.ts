import {
  CreepAction,
  CreepActionFunction,
  CreepActionTargeter,
} from "./_action"

export interface ClaimingOpts {
  flag?: Flag
}

const findTarget: CreepActionTargeter<ClaimingOpts> = (
  _creep: Creep,
  options: ClaimingOpts
) => {
  return options.flag?.room?.controller?.id
}

const perform: CreepActionFunction<ClaimingOpts> = (
  creep: Creep,
  target: StructureController
) => {
  const status = creep.claimController(target)
  if (status === ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  } else if (status === ERR_GCL_NOT_ENOUGH) {
    const reserveStatus = creep.reserveController(target)
    if (reserveStatus === ERR_NOT_IN_RANGE) {
      creep.moveTo(target)
    }
  }
}

export default CreepAction("claiming", findTarget, perform, "📯")
