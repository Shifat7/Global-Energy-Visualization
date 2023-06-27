import * as d3 from 'd3';
import { IDataPointQueryable } from '../../../interfaces/dataPoint.interface';
import IDrawableGraph from '../../../interfaces/drawableGraph.interface';
import { getLineSeriesScaleAbs } from '../../util/scales';
import { IDataPointWithValue } from '../../../interfaces/IDataPointWithValue.interface';
import { IGraphControlFormProps } from '../line.interface';

class Circle {
  public graph: IDrawableGraph<IDataPointWithValue[][], IGraphControlFormProps>;
  constructor(graph: IDrawableGraph<IDataPointWithValue[][], IGraphControlFormProps>) {
    this.graph = graph; // store a reference to the graph
  }

  update(data: IDataPointWithValue[][]) {
    const { chartGroup } = this.graph.getGraphRef();
    const graph = this.graph; // need this for animation when `this` is rebound

    for (let i = 0; i < data.length; i++) {
      const series = data[i];
      const isoCode = series[0].iso_code;
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

      // clear out all the old circles
      chartGroup.selectAll(`.circle-${series[0].iso_code}`).remove();

      // add circles
      const circles = chartGroup.selectAll(`.circle-${isoCode}`).data(series).enter();

      circles
        .append('g')
        .attr('class', `circle-${series[0].iso_code}`)
        .attr('id', `circle-${series[0].iso_code}-${i}`)
        .append('circle')
        .attr('cx', (d: any, i: number) => {
          return xScale(i);
        })
        .attr('cy', (d: any, i: number) => {
          return yScale(d[this.graph.resource]);
        })
        .attr('r', 5)
        .attr('fill', this.graph.color(series[0].iso_code) as string)
        .attr('stroke-width', 2)
        .attr('stroke', 'white')
        .attr('transform', `translate(${0}, ${this.graph.height})`)
        // animation
        .on('mouseover', function (e, d) {
          // increate the radius
          const c = d3.select(this);
          c.attr('r', 10);

          // append text
          const g = d3.select(this.parentElement); // get the parent element of the circle (g)
          g.append('text')
            .attr('class', `${isoCode}-tooltip`)
            .attr('font-size', '12px')
            .attr('x', `${c.attr('cx')}`)
            .attr('y', `${c.attr('cy')}`)
            .attr('transform', `translate(${0}, ${graph.height + 20})`)
            .text((d: any, i: number) => {
              return d[graph.resource];
            })
            .attr('font-size', '12px');
        })
        .on('mouseout', function (e, d) {
          const c = d3.select(this);
          c.attr('r', 5);

          const g = d3.select(this.parentElement); // get the parent element of the circle (g)
          g.select('text').remove();
        });
    }
  }
}

export default Circle;
