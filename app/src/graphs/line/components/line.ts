import * as d3 from 'd3';
import { IDataPoint, IDataPointQueryable } from '../../../interfaces/dataPoint.interface';
import IDrawableGraph from '../../../interfaces/drawableGraph.interface';
import { getLineSeriesScaleAbs } from '../../util/scales';
import { IDataPointWithValue } from '../../../interfaces/IDataPointWithValue.interface';
import { IGraphControlFormProps } from '../line.interface';

class Line {
  public graph: IDrawableGraph<IDataPointWithValue[][], IGraphControlFormProps>;
  public lineState: Map<string, boolean>;

  constructor(graph: IDrawableGraph<IDataPointWithValue[][], IGraphControlFormProps>) {
    this.graph = graph; // store a reference to the graph
    this.lineState = new Map();
  }

  add(series: IDataPoint[]) {
    const { chartGroup } = this.graph.getGraphRef();
    chartGroup
      .append('path')
      .data([series])
      .attr('class', 'line')
      .attr('id', `line-${series[0].iso_code}`);
    // update the internal state
    this.lineState.set(series[0].iso_code, true);
  }

  remove(isoCode: string) {
    d3.select(`#line-${isoCode}`).remove();
    // update the internal state
    this.lineState.delete(isoCode);
  }

  update(data: IDataPointWithValue[][]) {
    const { chartGroup } = this.graph.getGraphRef();

    for (let i = 0; i < data.length; i++) {
      const series = data[i];
      const { xScale, yScale } = getLineSeriesScaleAbs(
        data,
        series,
        {
          width: this.graph.width + this.graph.margin.right,
          height: this.graph.height,
          margin: this.graph.margin
        },
        this.graph.resource as keyof IDataPointQueryable
      );
      const line = d3
        .line()
        .x((d: any, i: number) => {
          return xScale(i);
        })
        .y((d: any, i) => {
          return yScale(d[this.graph.resource]);
        })
        .curve(d3.curveMonotoneX);

      // redraw the line
      const d3Line = chartGroup.select(`#line-${series[0].iso_code}`);

      // this guards against crashing
      if (d3Line.size() === 0) {
        continue;
      }

      d3Line
        .data([series])
        .attr('d', line as any)
        .attr('stroke', this.graph.color(series[0].iso_code) as string)
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('transform', `translate(${0}, ${this.graph.height})`);
    }
  }
}

export default Line;
