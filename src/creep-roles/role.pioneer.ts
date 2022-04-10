import { getPioneerFlags } from "./common"
import { CreepRole, CreepRoleFunction } from "./_role"

const run: CreepRoleFunction = (_creep: Creep) => {}

interface PioneerMemory {}

const initializePioneerMemory = (): PioneerMemory => ({})

export default CreepRole(
  "pioneer",
  [
    {
      bodyParts: [
        WORK,
        WORK,
        WORK,
        CARRY,
        CARRY,
        CARRY,
        MOVE,
        MOVE,
        MOVE,
        MOVE,
        MOVE,
        MOVE,
      ], // 750
      shouldSpawn: (): boolean =>
        Object.values(Game.creeps).filter(
          (creep) => creep.memory.role.name === "pioneer"
        ).length < getPioneerFlags().length,
    },
  ],
  run,
  initializePioneerMemory
)
