import * as harvester from "./role.harvester"
import * as builder from "./role.builder"
import * as upgrader from "./role.upgrader"
import * as combat from "./role.combat"

export type CreepRole = "harvester" | "builder" | "upgrader" | "combat"

export interface CreepRoleDefinition {
  bodyParts: BodyPartConstant[]
  run: (creep: Creep) => void
}

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

export const roleDefinitions: { [key in CreepRole]: CreepRoleDefinition } = {
  harvester: {
    bodyParts: [WORK, CARRY, MOVE, MOVE], // 250
    run: harvester.run,
  },
  builder: {
    bodyParts: [WORK, CARRY, MOVE, MOVE], // 250
    run: builder.run,
  },
  upgrader: {
    bodyParts: [WORK, CARRY, MOVE, MOVE], // 250
    run: upgrader.run,
  },
  combat: {
    bodyParts: [ATTACK, ATTACK, MOVE, MOVE], // 260
    run: combat.run,
  },
}
