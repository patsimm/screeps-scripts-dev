import { updateAction } from "../creep-actions"
import { CreepRole } from "./_role"

export function run(creep: Creep) {
  const influenceFlags = Object.keys(Game.flags).filter((flagName) =>
    _(flagName.toLocaleLowerCase()).includes("influence")
  )
  const flag = Game.flags[influenceFlags[0]]

  if (flag) {
    if (!_.includes(["claiming"], creep.memory.action.type)) {
      creep.moveTo(flag.pos)
      updateAction(creep, "claiming", { flag: flag })
    }
  }
}

const shouldSpawn = (spawn: StructureSpawn): boolean =>
  Object.values(Game.creeps).filter(
    (creep) => creep.memory.role.name === "influencer"
  ).length < spawn.room.memory.creepTargetAmounts.influencer

interface InfluencerMemory {}

const initialInfluencerMemory: InfluencerMemory = {}

export default CreepRole(
  "influencer",
  [
    {
      bodyParts: [CLAIM, MOVE], // 250
      shouldSpawn,
    },
  ],
  run,
  initialInfluencerMemory,
  (spawn: StructureSpawn): number =>
    spawn.room.memory.creepTargetAmounts["influencer"]
)
