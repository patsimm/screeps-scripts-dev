export type CreepActionFunction<Opts extends {} = {}> = (
  creep: Creep,
  target: any,
  options: Opts
) => void

export type CreepActionTargeter<Opts extends {} = {}> = (
  creep: Creep,
  options: Opts
) => Id<any> | undefined

export interface CreepAction<T, Opts extends {}> {
  type: T
  findTarget: CreepActionTargeter<Opts>
  perform: CreepActionFunction<Opts>
  icon: string
}

export function CreepAction<T extends string, Opts>(
  type: T,
  findTarget: CreepActionTargeter<Opts>,
  perform: CreepActionFunction<Opts>,
  icon: string
): CreepAction<T, Opts> {
  return {
    type,
    findTarget,
    perform,
    icon,
  }
}
