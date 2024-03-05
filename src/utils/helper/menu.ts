export function formatMenu(array: Array<Record<string, any>>) {
  if (!array) return
  return array.map(i => {
    return {
      key: i.id,
      label: i.name,
      value: i,
      children: i.children.length !== 0 ? formatMenu(i.children) : []
    }
  })
}
