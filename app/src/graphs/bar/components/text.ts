import * as d3 from 'd3';
import IDrawableGraph from '../../../interfaces/drawableGraph.interface';
import { IDataPointWithValue } from '../../line/line.interface';
import { getMinMax } from '../../util/scales';
import { IGraphBar, IGraphControlFormProps } from '../bar.interface';

class GraphText {
  public graph: IDrawableGraph<IGraphBar['data'], IGraphControlFormProps>;
  public fgColorScale: (data: IGraphBar['data'], index: number) => '#000' | '#fff';

  constructor(graph: IDrawableGraph<IGraphBar['data'], IGraphControlFormProps>) {
    this.graph = graph; // store a reference to the graph
    this.fgColorScale = (data: IDataPointWithValue[], index: number) => {
      const { biggestValue } = getMinMax(this.graph.resource, data);
      if (biggestValue / 2.5 > data[index][this.graph.resource]) {
        return '#000';
      } else {
        return '#fff';
      }
    };
  }

  private updateScale(data: IGraphBar['data']) {
    const maxDataValue = data.reduce(
      (max, item) => (item[this.graph.resource] > max ? item[this.graph.resource] : max),
      0
    );
    const yScale = d3.scaleLinear().domain([maxDataValue, 0]).range([this.graph.height, 0]);

    return { yScale };
  }

  update(data: IGraphBar['data'], barWidth: number, barPadding: number) {
    const { xAxisGroup } = this.graph.getGraphRef();
    this.updateScale(data);
    const fontSize = 16;

    const yPos = (_: any, i: number) =>
      i * (this.graph.height / data.length) + fontSize / 2 + barWidth / 2;

    // add new text
    const newText = xAxisGroup.selectAll('text').data(data).enter();

    newText
      .append('text')
      .attr('class', (d) => `${this.graph.resource}-${d.iso_code}-text`)
      .attr('x', (d) => {
        return fontSize;
      })
      .attr('y', yPos)
      .text((d) => {
        return d.iso_code;
      })
      .attr('fill', (d, i) => this.fgColorScale(data, i));

    // remove old text
    xAxisGroup.selectAll('text').data(data).exit().remove();

    // update text
    xAxisGroup
      .selectAll('text')
      .data(data)
      .attr('x', (d) => {
        return fontSize;
      })
      .attr('y', yPos)
      .text((d) => {
        return d.iso_code + ': ' + d[this.graph.resource];
      })
      .attr('fill', (d, i) => this.fgColorScale(data, i));
  }
}

export default GraphText;
