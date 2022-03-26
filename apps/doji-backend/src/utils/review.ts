import { IReviewStatResponseDTO } from '@libs/api'

function parseReviewStatFromAggreationResult(
  queryResult: { rating: number; count: string }[],
): IReviewStatResponseDTO {
  /**
   * The queryResult should look like this table
   * _____________________
   * |  rating  |  count |
   * |----------|--------|
   * |    1     |   12   |
   * |    5     |    9   |
   * ---------------------
   */
  const result: IReviewStatResponseDTO = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    avg: 0.0,
    count: 0,
  }
  queryResult.forEach((entry) => {
    const count = parseInt(entry.count)
    result[String(entry.rating)] = count
    result.avg += entry.rating * count
    result.count += count
  })
  if (result.count > 0) result.avg /= result.count
  return result
}

export { parseReviewStatFromAggreationResult }
