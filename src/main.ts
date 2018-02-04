import { loop as harvesterLoop } from './role.harvester'
import { CreepOptions, Role } from './creep-base'
import { SpawnHelper, Spawn } from './spawn-helper'
import { loop as upgraderLoop } from './role.upgrader'
import { loop as builderLoop } from './role.builder'
import { loop as walkerLoop } from './role.walker'

const CreepTypes: CreepOptions[] = [
  {
    loop: harvesterLoop,
    bodyParts: [WORK, WORK, WORK, CARRY, MOVE],
    role: Role.HARVESTER,
    maxAmount: 4
  },
  {
    loop: walkerLoop,
    bodyParts: [CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    role: Role.WALKER,
    maxAmount: 2
  },
  {
    loop: upgraderLoop,
    bodyParts: [WORK, CARRY, MOVE],
    role: Role.UPGRADER,
    maxAmount: 4
  },
  {
    loop: builderLoop,
    bodyParts: [WORK, CARRY, MOVE],
    role: Role.BUILDER,
    maxAmount: 2
  }
]

export function loop() {
  let creeps = CreepTypes.map(options => {
    return { typeOptions: options, creeps: [] }
  })

  for (const name in Game.creeps) {
    const creep = Game.creeps[name]
    const memory: { role: string } = creep.memory as any
    for (const creepTypeList in creeps) {
      if (memory.role === creeps[creepTypeList].typeOptions.role) {
        creeps[creepTypeList].creeps.push(creep)
        break
      }
    }
  }

  const spawnHelper = new SpawnHelper(Spawn.SPAWN_1, creeps)
  spawnHelper.loop()

  creeps.forEach(creepTypeList => {
    creepTypeList.creeps.forEach(creep => {
      creepTypeList.typeOptions.loop(creep)
    })
  })
}
