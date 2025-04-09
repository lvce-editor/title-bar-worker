import * as CreateTextMeasureContext from '../CreateTextMeasureContext/CreateTextMeasureContext.ts'
import * as MeasureTextWidthState from '../MeasureTextWidthState/MeasureTextWidthState.ts'

export const getContext = (): OffscreenCanvasRenderingContext2D => {
  const ctx = MeasureTextWidthState.getOrCreate(CreateTextMeasureContext.createTextMeasureContext)
  return ctx
}
