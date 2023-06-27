import * as d3 from 'd3';
import IDrawableGraph from '../../../interfaces/drawableGraph.interface';
import { IDataPointWithValue } from '../../../interfaces/IDataPointWithValue.interface';
import { IGraphControlFormProps } from '../bar.interface';

class GraphAxis {
  public graph: IDrawableGraph<IDataPointWithValue[], IGraphControlFormProps>;
  public hasRenderedOnce: boolean;

  constructor(graph: IDrawableGraph<IDataPointWithValue[], IGraphControlFormProps>) {
    this.graph = graph; // store a reference to the graph
    this.hasRenderedOnce = false;
  }

  update(data: IDataPointWithValue[], xDomain: [number, number]) {
    const { chartGroup } = this.graph.getGraphRef();

    // create axis
    const xAxisScale = d3
      .scaleLinear()
      .domain([xDomain[0], xDomain[1]])
      .range([0, this.graph.width]);

    const xAxis = d3.axisBottom(xAxisScale).ticks(10).tickFormat(d3.format('d'));

    // this isnt the D3 way but i dont care
    chartGroup.selectAll('.axis-x').remove();

    chartGroup
      .append('g')
      .attr('transform', `translate(${0},${this.graph.height + 10})`)
      .attr('class', 'axis-x')
      .call(xAxis);

    this.hasRenderedOnce = true;
  }
}

export default GraphAxis;
