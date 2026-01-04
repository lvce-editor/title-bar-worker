export const getEntryMap = async (modules: any): Promise<any> => {
  const map = Object.create(null)
  for (const module of modules) {
    const { id } = module
    const entries = await module.getMenuEntries()
    map[id] = entries
  }
  return map
}
