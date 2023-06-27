import React from 'react';
import * as d3 from 'd3';

type D3Target = React.RefObject<SVGSVGElement>;

// This is the base type for a graph that can be drawn.
// A drawable graph needs to be given a reference to the svg element that will be used when
//   creating modules that go inside the graph. See example in the line graph.
class Base {
  public _ref: React.RefObject<SVGSVGElement>;
  constructor(ref: D3Target) {
    this._ref = ref;
  }

  getGraphRef() {
    const svg = d3.select(this._ref.current) as unknown as d3.Selection<SVGGElement, any, any, any>;
    const chartGroup = svg.select('#chartGroup');
    const xAxisGroup = svg.select('#x-axis');
    const yAxisGroup = svg.select('#y-axis');
    const graphKey = svg.select('#key');

    return { svg, chartGroup, graphKey, xAxisGroup, yAxisGroup };
  }

  set ref(ref: D3Target) {
    this._ref = ref;
  }

  get ref() {
    return this._ref;
  }
}

export default Base;
