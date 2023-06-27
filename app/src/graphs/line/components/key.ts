import * as d3 from 'd3';
import IDrawableGraph from '../../../interfaces/drawableGraph.interface';
import { IDataPointWithValue } from '../../../interfaces/IDataPointWithValue.interface';
import { IGraphControlFormProps } from '../line.interface';

class GraphKey {
  public graph: IDrawableGraph<IDataPointWithValue[][], IGraphControlFormProps>;
  constructor(graph: IDrawableGraph<IDataPointWithValue[][], IGraphControlFormProps>) {
    this.graph = graph; // store a reference to the graph
  }

  update(data: IDataPointWithValue[][]) {
    const { graphKey } = this.graph.getGraphRef();

    // clear out all the old keys
    graphKey.selectAll('.key').remove();

    const keyRow = graphKey.append('g');
    keyRow.attr('class', 'key');

    for (let i = 0; i < data.length; i++) {
      const series = data[i];
      const isoCode = series[0].iso_code;

      const yScale = d3
        .scaleLinear()
        .domain([0, data.length])
        .range([0, data.length * 24]);

      keyRow
        .append('text')
        .attr('transform', `translate(${0}, ${yScale(i)})`)
        .text(isoCode);

      keyRow
        .append('rect')
        .attr('width', '20')
        .attr('height', '20')
        .attr('fill', this.graph.color(isoCode) as string)
        .attr('transform', `translate(${50}, ${yScale(i) - 20})`);
    }
  }
}

export default GraphKey;
