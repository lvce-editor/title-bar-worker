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
  const rpc = await launchTextMeasurementWorker()
  try {
    const isMonospaceFont = false
    const charWidth = 0
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
  } finally {
    await rpc[Symbol.asyncDispose]()
  }
}
