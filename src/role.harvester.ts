export const run = (creep: Creep) => {
  const room = creep.room

  if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    const sources = room.find(FIND_SOURCES_ACTIVE)
    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0])
    }
  }
}
