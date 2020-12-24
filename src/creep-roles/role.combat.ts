import { CreepRoleDefinition } from "./index"
import { updateAction } from "../creep-actions"

const run = (creep: Creep) => {
  if (!_.includes(["attacking"], creep.memory.action.type)) {
    updateAction(creep, "attacking", {})
  }
}

const role: CreepRoleDefinition<"combat", { name: "combat" }> = {
  name: "combat",
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
  initialMemory: { name: "combat" },
}

export default role
