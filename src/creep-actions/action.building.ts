import { rerunAction } from "./actions"
import {
  CreepAction,
  CreepActionFunction,
  CreepActionTargeter,
} from "./_action"

const findTarget: CreepActionTargeter = (creep: Creep) => {
  const constructionSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES)
  if (constructionSites.length === 0) {
    return undefined
  }

  const sitesByType = _.groupBy(constructionSites, (site) => site.structureType)

  let foundSite: ConstructionSite | undefined
  creep.room.memory.buildOrder.some((structureType) => {
    const potentialSite = sitesByType[structureType]?.[0]
    if (potentialSite) {
      foundSite = potentialSite
      return true
    }
  })
  return foundSite?.id || constructionSites[0]?.id
}

const perform: CreepActionFunction = (creep: Creep, target: any) => {
  const buildStatus = creep.build(target)
  if (buildStatus == OK) {
    return
  } else if (buildStatus == ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  } else if (buildStatus == ERR_INVALID_TARGET) {
    return rerunAction(creep)
  }
}

export default CreepAction("building", findTarget, perform, "🚧")
