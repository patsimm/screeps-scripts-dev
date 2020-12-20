import * as harvester from "./role.harvester"

export type CreepRole = "harvester"

export interface CreepRoleDefinition {
  bodyParts: BodyPartConstant[]
  run: (creep: Creep) => void
}

export const roleDefinitions: { [key in CreepRole]: CreepRoleDefinition } = {
  harvester: {
    bodyParts: [WORK, CARRY, MOVE, MOVE],
    run: harvester.run,
  },
}
