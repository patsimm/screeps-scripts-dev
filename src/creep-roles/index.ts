import harvester from "./role.harvester"
import builder from "./role.builder"
import upgrader from "./role.upgrader"
import combat from "./role.combat"
import walker from "./role.walker"

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

export type CreepRole =
  | "harvester"
  | "builder"
  | "upgrader"
  | "combat"
  | "walker"

export interface CreepRoleDefinition {
  bodyParts: BodyPartConstant[][]
  run: (creep: Creep) => void
}

export const roleDefinitions: { [key in CreepRole]: CreepRoleDefinition } = {
  harvester,
  builder,
  upgrader,
  combat,
  walker,
}
