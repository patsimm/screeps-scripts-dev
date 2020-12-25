import {
  buildAction,
  CreepActionFunction,
  CreepActionTargeter,
} from "./build-action"

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
  console.log(status)
  if (status === ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  } else if (status === ERR_GCL_NOT_ENOUGH) {
    const reserveStatus = creep.reserveController(target)
    console.log(reserveStatus)
    if (reserveStatus === ERR_NOT_IN_RANGE) {
      creep.moveTo(target)
    }
  }
}

const action = buildAction("claiming", findTarget, perform, "📯")
export default action
