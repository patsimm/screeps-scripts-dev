import { isStructureOfType } from "../helpers"
import { rerunAction } from "./actions"
import {
  buildAction,
  CreepActionFunction,
  CreepActionTargeter,
} from "./build-action"

const findTarget: CreepActionTargeter = (creep: Creep) => {
  if (creep.getActiveBodyparts(WORK) < 0) {
    return undefined
  }

  const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {
    filter: (source) =>
      source.pos.findInRange(FIND_HOSTILE_CREEPS, 5).length === 0 &&
      source.pos.findInRange(FIND_HOSTILE_STRUCTURES, 5).length === 0,
  })
  return source?.id
}

const perform: CreepActionFunction = (creep: Creep, target: any) => {
  if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
    if (creep.moveTo(target) === ERR_NO_PATH) {
      return rerunAction(creep)
    }
  }

  if (creep.memory.role.name === "harvester") {
    const appendingContainer = creep.room
      .lookForAtArea(
        LOOK_STRUCTURES,
        creep.pos.y - 1,
        creep.pos.x - 1,
        creep.pos.y + 1,
        creep.pos.x + 1,
        true
      )
      .map((result) => result.structure)
      .filter(
        (structure): structure is ConcreteStructure<STRUCTURE_CONTAINER> =>
          isStructureOfType(structure, [STRUCTURE_CONTAINER]) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      )[0]

    if (appendingContainer) {
      appendingContainer.room.visual.circle(appendingContainer.pos, {
        fill: "#00ff00",
      })
      creep.transfer(appendingContainer, RESOURCE_ENERGY)
      creep.memory.role.filling = appendingContainer.id
    } else {
      creep.memory.role.filling = undefined
    }
  }
}

const action = buildAction("harvesting", findTarget, perform, "⛏")
export default action
