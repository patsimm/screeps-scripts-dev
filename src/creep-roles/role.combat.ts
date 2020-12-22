import { CreepRoleDefinition } from "./index"
import { updateAction } from "../creep-actions/actions"

const run = (creep: Creep) => {
  if (!_.includes(["attacking"], creep.memory.action)) {
    updateAction(creep, "attacking")
  }
}

const role: CreepRoleDefinition = {
  run,
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
}

export default role
