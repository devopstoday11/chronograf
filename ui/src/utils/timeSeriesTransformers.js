import _ from 'lodash'
import {map, reduce} from 'fast.js'
import {groupByTimeSeriesTransform} from 'src/utils/groupBy.js'

export const timeSeriesToDygraph = (raw = [], isInDataExplorer) => {
  const {sortedLabels, sortedTimeSeries} = groupByTimeSeriesTransform(raw)

  const dygraphSeries = reduce(
    sortedLabels,
    (acc, {label, responseIndex}) => {
      if (!isInDataExplorer) {
        acc[label] = {
          axis: responseIndex === 0 ? 'y' : 'y2',
        }
      }
      return acc
    },
    {}
  )

  return {
    labels: ['time', ...map(sortedLabels, ({label}) => label)],
    timeSeries: map(sortedTimeSeries, ({time, values}) => [
      new Date(time),
      ...values,
    ]),
    dygraphSeries,
  }
}

const computeGroupBys = queryASTs => {
  return queryASTs.map(queryAST => {
    return _.get(queryAST, ['groupBy', 'tags'], false)
  })
}

export const timeSeriesToTableGraph = (raw, queryASTs) => {
  const {sortedLabels, sortedTimeSeries} = groupByTimeSeriesTransform(
    raw,
    computeGroupBys(queryASTs)
  )

  const labels = ['time', ...map(sortedLabels, ({label}) => label)]

  const tableData = map(sortedTimeSeries, ({time, values}) => [time, ...values])
  const data = tableData.length ? [labels, ...tableData] : [[]]
  return {
    data,
    sortedLabels,
  }
}
