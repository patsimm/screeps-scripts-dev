export interface CreepOptions {
  loop: (creep: Creep) => void
  bodyParts: BodyPartConstant[]
  role: Role
  maxAmount: number
}

export interface CreepListItem {
  typeOptions: CreepOptions
  creeps: Creep[]
}

export interface CreepMemoryBase extends CreepMemory {
  role: Role
  action: CreepAction
}

export enum Role {
  HARVESTER = 'HARVESTER',
  BUILDER = 'BUILDER',
  UPGRADER = 'UPGRADER',
  BETTER_UPGRADER = 'BETTER_UPGRADER'
}

export enum CreepAction {
  HARVEST = 0,
  BUILD = 1,
  TRANSFER = 2,
  UPGRADE = 3
}
