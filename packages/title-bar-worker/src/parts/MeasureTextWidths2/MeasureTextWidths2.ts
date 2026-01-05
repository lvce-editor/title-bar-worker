import { TextMeasurementWorker } from '@lvce-editor/rpc-registry'
import { launchTextMeasurementWorker } from '../LaunchTextMeasurementWorker/LaunchTextMeasurementWorker.ts'

export const measureTextWidths = async (
  texts: readonly string[],
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
): Promise<readonly number[]> => {
  if (typeof letterSpacing !== 'number') {
    throw new TypeError('letterSpacing must be of type number')
  }
  const rpc = await launchTextMeasurementWorker()
  TextMeasurementWorker.set(rpc)
  const isMonospaceFont = false
  const charWidth = 0
  // @ts-ignore
  const result = await TextMeasurementWorker.measureTextWidths(texts, fontWeight, fontSize, fontFamily, letterSpacing, isMonospaceFont, charWidth)
  await TextMeasurementWorker.dispose()
  return result
}
