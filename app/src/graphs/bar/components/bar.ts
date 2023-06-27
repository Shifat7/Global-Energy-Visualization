import * as d3 from 'd3';
import IDrawableGraph from '../../../interfaces/drawableGraph.interface';
import { getMinMax } from '../../util/scales';
import { IGraphBar, IGraphControlFormProps } from '../bar.interface';

class Line {
  public graph: IDrawableGraph<IGraphBar['data'], IGraphControlFormProps>;
  public lineState: Map<string, boolean>;
  public firstDraw: boolean;
  public barWidth: number;
  public barPadding: number;
  public bgColorScale: (data: IGraphBar['data']) => d3.ScaleQuantize<string, never>;

  constructor(graph: IDrawableGraph<IGraphBar['data'], IGraphControlFormProps>) {
    this.graph = graph; // store a reference to the graph
    this.lineState = new Map();
    this.firstDraw = true;
    this.barWidth = 20;
    this.barPadding = 10;
    this.bgColorScale = (data: IGraphBar['data']) => {
      const { smallestValue, biggestValue } = getMinMax(this.graph.resource, data);
      const color = d3
        .scaleQuantize<string>()
        .domain([smallestValue, biggestValue])
        .range([
          '#8080ff',
          '#6666ff',
          '#4d4dff',
          '#3333ff',
          '#1a1aff',
          '#0000ff',
          '#0000e6',
          '#0000cc'
        ]);
      return color;
    };
  }

  private updateScale(data: IGraphBar['data']) {
    this.barPadding = (this.graph.width - 10 * data.length) / data.length / 4;
    this.barWidth = (this.graph.height - this.barPadding * data.length) / data.length;

    // scale
    const maxDataValue = data.reduce(
      (max, item) => (item[this.graph.resource] > max ? item[this.graph.resource] : max),
      0
    );
    const yScale = d3.scaleLinear().domain([maxDataValue, 0]).range([this.graph.width, 0]);

    return { yScale };
  }

  draw(data: IGraphBar['data']) {
    const { yScale } = this.updateScale(data);

    // create bars
    const { chartGroup } = this.graph.getGraphRef();

    chartGroup
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'bar')
      .append('rect')
      .attr('height', this.barWidth)
      .attr('width', (d) => {
        return yScale(d[this.graph.resource]);
      })
      .attr('y', (d, i) => i * (this.barWidth + this.barPadding))
      .attr('x', (d) => 0)
      .attr('fill', (d, i) => this.bgColorScale(data)(d[this.graph.resource]));

    this.firstDraw = false;
  }

  update(data: IGraphBar['data']) {
    const { yScale } = this.updateScale(data);
    if (this.firstDraw) {
      this.draw(data);
    } else {
      const { chartGroup } = this.graph.getGraphRef();

      // get new rectangles
      const newRects = chartGroup.selectAll('.bar').data(data).enter();

      // add new rectangles
      newRects
        .append('g')
        .attr('class', 'bar')
        .append('rect')
        .attr('height', this.barWidth)
        .attr('width', (d) => {
          return yScale(d[this.graph.resource]);
        })
        .attr('y', (d, i) => i * (this.barWidth + this.barPadding))
        .attr('x', (d) => 0)
        .attr('fill', (d, i) => this.bgColorScale(data)(d[this.graph.resource]));

      // remove old rectangles
      chartGroup.selectAll('.bar').data(data).exit().remove();

      // update existing rectangles
      const existing = chartGroup.selectAll('rect');

      existing
        .data(data)
        .transition()
        .delay(0)
        .duration(500)
        .attr('height', this.barWidth)
        .attr('width', (d) => {
          return yScale(d[this.graph.resource]);
        })
        .attr('y', (d, i) => i * (this.barWidth + this.barPadding))
        .attr('x', (d) => 0)
        .attr('fill', (d, i) => this.bgColorScale(data)(d[this.graph.resource]));
    }
  }
}

export default Line;
