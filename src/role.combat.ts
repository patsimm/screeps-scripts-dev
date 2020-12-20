import { updateAction } from "./creep-actions"

export const run = (creep: Creep) => {
  if (!_.includes(["attacking"], creep.memory.action)) {
    updateAction(creep, "attacking")
  }
}
