export type CreepRoleFunction = (creep: Creep) => void

export type CreepRole<Name extends string, Memory extends { name: Name }> = {
  name: Name
  levels: {
    bodyParts: BodyPartConstant[]
    shouldSpawn?: (spawn: StructureSpawn) => boolean
  }[]
  run: CreepRoleFunction
  initializeMemory: (spawn: StructureSpawn) => Memory
}

export const CreepRole = <T extends string, M extends {}>(
  name: T,
  levels: {
    bodyParts: BodyPartConstant[]
    shouldSpawn?: (spawn: StructureSpawn) => boolean
  }[],
  run: (creep: Creep) => void,
  initialMemory: (spawn: StructureSpawn) => M
): CreepRole<T, M & { name: T }> => ({
  name,
  levels,
  run,
  initializeMemory: (spawn: StructureSpawn) => ({
    name,
    ...initialMemory(spawn),
  }),
})
