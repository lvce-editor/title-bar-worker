const commandsIds = [
  'closeMenu',
  'focus',
  'focusFirst',
  'focusIndex',
  'focusLast',
  'focusNext',
  'focusPrevious',
  'handleKeyArrowDown',
  'handleKeyArrowLeft',
  'handleKeyArrowRight',
  'handleKeyArrowUp',
  'handleKeyEnd',
  'handleKeyEnter',
  'handleKeyEscape',
  'handleKeyHome',
  'handleKeySpace',
  'handleMenuClick',
  'handleMenuMouseOver',
  'handleMouseOver',
  'handleMouseOut',
  'toggleIndex',
  'toggleMenu',
  'handleClick',
  'handleFocus',
]

export const getCommandIds = (): readonly string[] => {
  return commandsIds
}
