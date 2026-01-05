import { launchTextMeasurementWorker } from '../LaunchTextMeasurementWorker/LaunchTextMeasurementWorker.ts'

export const measureTextWidths2 = async (
  texts: readonly string[],
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
): Promise<readonly number[]> => {
  if (typeof letterSpacing !== 'number') {
    throw new TypeError('letterSpacing must be of type number')
  }
  await using rpc = await launchTextMeasurementWorker()
  const isMonospaceFont = false
  const charWidth = 0
  // @ts-ignore
  const result = await rpc.invoke(
    'TextMeasurement.measureTextWidths',
    texts,
    fontWeight,
    fontSize,
    fontFamily,
    letterSpacing,
    isMonospaceFont,
    charWidth,
  )
  return result
}
