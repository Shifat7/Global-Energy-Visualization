import { IDataPoint, IDataPointQueryable } from '../../interfaces/dataPoint.interface';
import * as d3 from 'd3';

// ! STUPID CODE DO NOT USE THIS FUNCTION
// imposes the line graphs over each other so they share the same start and end
// but have different values
function getLineSeriesScaleRel(
  acc: Array<IDataPoint[]>,
  data: IDataPoint[],
  dimensions: any,
  key: keyof IDataPoint // the name of this series
) {
  const biggestSeriesIndex = acc.reduce((p, c, i, a) => (a[p].length > c.length ? p : i), 0);
  const biggestSeries = acc[biggestSeriesIndex];

  const smallestSeriesIndex = acc.reduce((p, c, i, a) => (a[p].length < c.length ? p : i), 0);
  const smallestSeries = acc[smallestSeriesIndex];

  const biggestValue = biggestSeries.reduce(
    (max, item) => (parseInt(item[key].toString()) > max ? parseInt(item[key].toString()) : max),
    0
  );

  const smallestValue = smallestSeries.reduce(
    (min, item) => (parseInt(item[key].toString()) < min ? parseInt(item[key].toString()) : min),
    data[0][key] as number
  );

  // const { smallestValue, biggestValue } = getMinMax(key, data);

  const xScale = d3.scaleLinear().domain([0, data.length]).range([0, dimensions.width]);
  const yScale = d3
    .scaleLinear()
    .domain([smallestValue as number, biggestValue as number])
    .range([0, -dimensions.height]);

  return { xScale, yScale, smallestValue, biggestValue };
}

function getMinMax(key: keyof IDataPointQueryable, data: IDataPoint[]) {
  // get the biggest value of this series (country)
  const biggestValue = data.reduce(
    (p, c) => (parseInt((c[key] || 0).toString()) > p ? parseInt((c[key] || 0).toString()) : p),
    data[0][key] as number
  );

  // get the smallest value of this data (country)
  const smallestValue = data.reduce(
    (p, c) => (parseInt((c[key] || 0).toString()) < p ? parseInt((c[key] || 0).toString()) : p),
    biggestValue
  );

  return { smallestValue, biggestValue };
}

// uses absolute positioning for the line graphs
// so they start and end at different points based on their values
function getLineSeriesScaleAbs(
  acc: Array<IDataPoint[]>,
  data: IDataPoint[],
  dimensions: any,
  key: keyof IDataPointQueryable // the name of this series
) {
  const biggestValue = acc
    .flat()
    .reduce(
      (p, c) => (parseInt(c[key].toString()) > p ? parseInt(c[key].toString()) : p),
      data[0][key] as number
    );

  const smallestValue = acc
    .flat()
    .reduce(
      (p, c) => (parseInt(c[key].toString()) < p ? parseInt(c[key].toString()) : p),
      biggestValue
    );

  const xScale = d3.scaleLinear().domain([0, data.length]).range([0, dimensions.width]);
  const yScale = d3
    .scaleLinear()
    .domain([smallestValue, biggestValue])
    .range([0, -dimensions.height]);

  return { xScale, yScale, biggestValue, smallestValue };
}

export { getLineSeriesScaleAbs, getLineSeriesScaleRel, getMinMax };
