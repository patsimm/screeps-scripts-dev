import { ConcreteCreepRoleMemory } from "./index"
import { updateAction } from "../creep-actions"
import { getCreepsByRole } from "../helpers"
import { CreepRole, CreepRoleFunction } from "./_role"

const run: CreepRoleFunction = (creep: Creep) => {
  if (!(creep.memory.role.name === "guard")) return

  let creepToGuard = creep.memory.role.guarding
    ? Game.getObjectById(creep.memory.role.guarding)
    : null

  if (!creepToGuard) {
    creep.memory.role.guarding = findPioneerToGuard()
    creepToGuard = creep.memory.role.guarding
      ? Game.getObjectById(creep.memory.role.guarding)
      : null
  }

  if (!_.includes(["following"], creep.memory.action.type) && creepToGuard) {
    updateAction(creep, "following", { id: creepToGuard.id })
  }

  if (!creepToGuard) {
    updateAction(creep, "idle", {})
  }
}

interface GuardMemory {
  guarding: Id<Creep> | null
}

const findPioneerToGuard = (): Id<Creep> | null => {
  const creepsByRole = getCreepsByRole()
  const guardedCreepsIds =
    creepsByRole.guard
      ?.map((creep) => creep.memory.role)
      .filter(
        (memory): memory is ConcreteCreepRoleMemory<"guard"> =>
          memory.name === "guard"
      )
      .map((memory) => memory.guarding) || []

  const pioneerIds = creepsByRole.pioneer?.map((creep) => creep.id) || []

  let guarding: Id<Creep> | null = null
  pioneerIds.some((pioneerId) => {
    if (!_.includes(guardedCreepsIds, pioneerId)) {
      guarding = pioneerId
      return true
    }
  })

  return guarding
}

const initializeGuardMemory = (): GuardMemory => ({
  guarding: findPioneerToGuard(),
})

export default CreepRole(
  "guard",
  [
    {
      bodyParts: [
        RANGED_ATTACK,
        RANGED_ATTACK,
        RANGED_ATTACK, // 450
        MOVE,
        MOVE,
        MOVE, // 600
        MOVE,
        MOVE,
        MOVE, // 750
        TOUGH,
        TOUGH,
        TOUGH, // 780
      ], // 780
      shouldSpawn: (_spawn: StructureSpawn): boolean =>
        !(findPioneerToGuard() == null),
    },
  ],
  run,
  initializeGuardMemory
)
