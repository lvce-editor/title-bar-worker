export const first = (): number => {
  return 0
}

export const last = (items: any): number => {
  return items.length - 1
}

export const next = (items: any, index: number): number => {
  return (index + 1) % items.length
}

export const previous = (items: any, index: number): number => {
  return index === 0 ? items.length - 1 : index - 1
}
