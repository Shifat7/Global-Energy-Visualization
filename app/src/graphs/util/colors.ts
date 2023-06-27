import * as d3 from 'd3';

const colorBasic = d3
  .scaleOrdinal()
  .range([
    '#e41a1c',
    '#377eb8',
    '#4daf4a',
    '#984ea3',
    '#ff7f00',
    '#ffff33',
    '#a65628',
    '#f781bf',
    '#999999'
  ]);

export { colorBasic };
