import * as d3 from 'd3';
import { IDataPointQueryable } from '../../../interfaces/dataPoint.interface';
import IDrawableGraph from '../../../interfaces/drawableGraph.interface';
import { getLineSeriesScaleAbs } from '../../util/scales';
import { IDataPointWithValue } from '../../../interfaces/IDataPointWithValue.interface';
import { IGraphControlFormProps } from '../line.interface';

class GraphAxis {
  public graph: IDrawableGraph<IDataPointWithValue[][], IGraphControlFormProps>;
  public hasRenderedOnce: boolean;

  constructor(graph: IDrawableGraph<IDataPointWithValue[][], IGraphControlFormProps>) {
    this.graph = graph; // store a reference to the graph
    this.hasRenderedOnce = false;
  }

  update(data: IDataPointWithValue[][], xDomain: [number, number]) {
    const { chartGroup } = this.graph.getGraphRef();

    for (let i = 0; i < data.length; i++) {
      const series = data[i];

      const absScale = getLineSeriesScaleAbs(
        data,
        series,
        { width: this.graph.width, height: this.graph.height, margin: this.graph.margin },
        this.graph.resource as keyof IDataPointQueryable
      );

      // create axis
      const xAxisScale = d3
        .scaleLinear()
        .domain([xDomain[0], xDomain[1]])
        .range([0, this.graph.width]);

      const yAxisScale = d3
        .scaleLinear()
        .domain([absScale.biggestValue, absScale.smallestValue])
        .range([0, this.graph.height]);

      const xAxis = d3.axisBottom(xAxisScale).ticks(series.length).tickFormat(d3.format('d'));
      const yAxis = d3.axisLeft(yAxisScale).tickSizeOuter(0);

      // this isnt the D3 way but i dont care
      chartGroup.selectAll('.axis-x').remove();
      chartGroup.selectAll('.axis-y').remove();

      chartGroup
        .append('g')
        .attr('transform', `translate(${0},${this.graph.height + 10})`)
        .attr('class', 'axis-x')
        .call(xAxis);

      chartGroup
        .append('g')
        .attr('transform', `translate(${-10},${0})`)
        .attr('class', 'axis-y')
        .call(yAxis);
    }
    this.hasRenderedOnce = true;
  }
}

export default GraphAxis;
