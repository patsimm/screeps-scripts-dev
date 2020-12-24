export function run(tower: StructureTower) {
  const enemies = tower.room.find(FIND_HOSTILE_CREEPS)
  if (enemies[0]) {
    console.log(tower.attack(enemies[0]))
  }
}
