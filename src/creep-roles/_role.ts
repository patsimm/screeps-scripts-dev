export type CreepRole<Name, Memory extends { name: Name }> = {
  name: Name
  levels: {
    bodyParts: BodyPartConstant[]
    shouldSpawn?: (spawn: StructureSpawn) => boolean
  }[]
  run: (creep: Creep) => void
  initialMemory: Memory
  targetAmount: (spawn: StructureSpawn) => number
}

export const CreepRole = <T extends string, M extends {}>(
  name: T,
  levels: {
    bodyParts: BodyPartConstant[]
    shouldSpawn?: (spawn: StructureSpawn) => boolean
  }[],
  run: (creep: Creep) => void,
  initialMemory: M,
  targetAmount: (spawn: StructureSpawn) => number
): CreepRole<T, M & { name: T }> => ({
  name,
  levels,
  run,
  initialMemory: { name, ...initialMemory },
  targetAmount,
})
