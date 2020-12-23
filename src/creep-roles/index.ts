import harvester from "./role.harvester"
import builder from "./role.builder"
import upgrader from "./role.upgrader"
import combat from "./role.combat"
import walker from "./role.walker"
import { performAction } from "../creep-actions"

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

export type CreepRoleDefinition<Name, Memory extends { name: Name }> = {
  name: Name
  bodyParts: BodyPartConstant[][]
  run: (creep: Creep) => void
  initialMemory: Memory
}

export const roleDefinitions = { harvester, builder, upgrader, combat, walker }

export type AnyCreepRoleDefinition = typeof roleDefinitions[keyof typeof roleDefinitions]

export type CreepRole = AnyCreepRoleDefinition extends CreepRoleDefinition<
  infer T,
  any
>
  ? T
  : never

export type CreepRoleMemory = AnyCreepRoleDefinition extends CreepRoleDefinition<
  any,
  infer M
>
  ? M
  : never

export const run = (creep: Creep) => {
  roleDefinitions[creep.memory.role.name].run(creep)
  performAction(creep)
}
