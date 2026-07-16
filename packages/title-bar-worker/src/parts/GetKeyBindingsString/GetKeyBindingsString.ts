export const getKeyBindingString = (key: string, altKey: boolean, ctrlKey: boolean, shiftKey: boolean, metaKey: boolean): string => {
  let string = ''
  if (ctrlKey) {
    string += 'Ctrl+'
  }
  if (altKey) {
    string += 'Alt+'
  }
  if (shiftKey) {
    string += 'Shift+'
  }
  string += key.length === 1 ? key.toUpperCase() : key
  return string
}
