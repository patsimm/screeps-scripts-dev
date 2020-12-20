export function isStructureOfType<T extends StructureConstant>(
  structure: Structure<any>,
  types: Array<T>
): structure is Structure<T> {
  return _.includes(types, structure.structureType)
}

export const rect = (x1: number, y1: number, x2: number, y2: number) => {
  const yMin = _.min([y1, y2]) as number
  const yMax = _.max([y1, y2]) as number
  const xMin = _.min([x1, x2]) as number
  const xMax = _.max([x1, x2]) as number

  const top = _.range(xMin, xMax + 1).map((x) => ({ x, y: yMin }))
  const bottom = _.range(xMin, xMax + 1).map((x) => ({ x, y: yMax }))
  const left = _.range(yMin + 1, yMax).map((y) => ({ x: xMin, y }))
  const right = _.range(yMin + 1, yMax).map((y) => ({ x: xMax, y }))

  return { positions: _.flatten([top, bottom, left, right]) }
}

export const rectAround = (pos: RoomPosition, distance: number) =>
  rect(pos.x - distance, pos.y - distance, pos.x + distance, pos.y + distance)

export const openRectAround = (pos: RoomPosition, distance: number) =>
  openRect(
    pos.x - distance,
    pos.y - distance,
    pos.x + distance,
    pos.y + distance
  )

export const openRect = (x1: number, y1: number, x2: number, y2: number) => {
  const yMin = _.min([y1, y2]) as number
  const yMax = _.max([y1, y2]) as number
  const xMin = _.min([x1, x2]) as number
  const xMax = _.max([x1, x2]) as number

  const width = xMax - xMin
  const height = yMax - yMin

  const halfWidth = _.floor(width / 2)
  const halfHeight = _.floor(height / 2)

  const top = _.range(xMin + halfWidth, xMax).map((x) => ({ x, y: yMin }))
  const bottom = _.range(xMin + 1, xMax + 1 - halfWidth).map((x) => ({
    x,
    y: yMax,
  }))
  const left = _.range(yMin + halfHeight, yMax).map((y) => ({ x: xMin, y }))
  const right = _.range(yMin + 1, yMax - halfHeight + 1).map((y) => ({
    x: xMax,
    y,
  }))

  return { positions: _.flatten([top, bottom, left, right]) }
}
