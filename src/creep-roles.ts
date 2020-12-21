import * as harvester from "./role.harvester"
import * as builder from "./role.builder"
import * as upgrader from "./role.upgrader"
import * as combat from "./role.combat"
import * as waleker from "./role.walker"

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
    bodyParts: [
      [WORK, CARRY, MOVE, MOVE], // 250
      [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], // 500
    ],
    run: harvester.run,
  },
  builder: {
    bodyParts: [
      [WORK, CARRY, MOVE, MOVE], // 250
      [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], // 500,
    ],
    run: builder.run,
  },
  upgrader: {
    bodyParts: [
      [WORK, CARRY, MOVE, MOVE], // 250
      [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], // 500
    ],
    run: upgrader.run,
  },
  combat: {
    bodyParts: [
      [
        ATTACK,
        ATTACK,
        ATTACK,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        TOUGH,
        MOVE,
        MOVE,
        MOVE,
        MOVE,
      ], // 490
    ],
    run: combat.run,
  },
  walker: {
    bodyParts: [
      [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], // 300
      [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], // 500,
    ],
    run: waleker.run,
  },
}
