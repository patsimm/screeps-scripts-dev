import { updateAction } from "../creep-actions"
import { CreepRole } from "./_role"

const run = (creep: Creep) => {
  if (!_.includes(["attacking"], creep.memory.action.type)) {
    updateAction(creep, "attacking", {})
  }
}

interface CombatMemory {}

const initialCombatMemory: CombatMemory = {}

export default CreepRole(
  "combat",
  [
    {
      bodyParts: [
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
    },
  ],
  run,
  initialCombatMemory,
  (spawn: StructureSpawn): number =>
    spawn.room.memory.creepTargetAmounts["combat"]
)
