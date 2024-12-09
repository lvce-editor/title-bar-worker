const state: any = {
  ctx: undefined,
}

export const getOrCreate = (createCtx: () => OffscreenCanvasRenderingContext2D): OffscreenCanvasRenderingContext2D => {
  if (state.ctx) {
    return state.ctx
  }
  state.ctx = createCtx()
  return state.ctx
}
