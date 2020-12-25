import { updateAction } from "../creep-actions"
import { getInfluenceFlags } from "./common"
import { CreepRole } from "./_role"

export function run(creep: Creep) {
  const influenceFlags = getInfluenceFlags()
  const flag = influenceFlags[0]

  if (flag) {
    if (!_.includes(["claiming"], creep.memory.action.type)) {
      creep.moveTo(flag.pos)
      flag.memory.influenced = true
      updateAction(creep, "claiming", { flag: flag })
    }
  }
}

interface InfluencerMemory {}

const initialInfluencerMemory: InfluencerMemory = {}

export default CreepRole(
  "influencer",
  [
    {
      bodyParts: [CLAIM, CLAIM, MOVE, MOVE], // 1300
      shouldSpawn: (): boolean =>
        Object.values(Game.creeps).filter(
          (creep) => creep.memory.role.name === "influencer"
        ).length < getInfluenceFlags().length,
    },
  ],
  run,
  initialInfluencerMemory
)
