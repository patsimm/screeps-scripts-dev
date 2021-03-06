import harvester from "./role.harvester"
import builder from "./role.builder"
import upgrader from "./role.upgrader"
import combat from "./role.combat"
import walker from "./role.walker"
import influencer from "./role.influencer"
import { performAction } from "../creep-actions"
import { CreepRole } from "./_role"

/*
 * MOVE           50
 * WORK           100
 * CARRY          50
 * ATTACK         80
 * RANGED_ATTACK  150
 * HEAL           250
 * CLAIM          600
 * TOUGH          10
 */

export const roleDefinitions = {
  harvester,
  builder,
  upgrader,
  combat,
  walker,
  influencer,
}

export type AnyCreepRole = typeof roleDefinitions[keyof typeof roleDefinitions]

export type CreepRoleName = AnyCreepRole extends CreepRole<infer T, any>
  ? T
  : never

export type CreepRoleMemory = AnyCreepRole extends CreepRole<any, infer M>
  ? M
  : never

export const run = (creep: Creep) => {
  roleDefinitions[creep.memory.role.name].run(creep)
  performAction(creep)
}

export { CreepRole } from "./_role"
