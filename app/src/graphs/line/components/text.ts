import { IDataPointQueryable } from '../../../interfaces/dataPoint.interface';
import IDrawableGraph from '../../../interfaces/drawableGraph.interface';
import { getLineSeriesScaleAbs } from '../../util/scales';
import { IDataPointWithValue } from '../../../interfaces/IDataPointWithValue.interface';
import { IGraphControlFormProps } from '../line.interface';

class GraphText {
  public graph: IDrawableGraph<IDataPointWithValue[][], IGraphControlFormProps>;
  constructor(graph: IDrawableGraph<IDataPointWithValue[][], IGraphControlFormProps>) {
    this.graph = graph; // store a reference to the graph
  }

  updateOne(data: IDataPointWithValue[][], series: IDataPointWithValue[]) {
    const { chartGroup } = this.graph.getGraphRef();
    const isoCode = series[0].iso_code;
    const { xScale, yScale } = getLineSeriesScaleAbs(
      data,
      series,
      { width: this.graph.width, height: this.graph.height, margin: this.graph.margin },
      this.graph.resource as keyof IDataPointQueryable
    );

    // remove all text
    chartGroup.selectAll(`.text-${isoCode}`).remove();

    // add text back in
    const texts = chartGroup.selectAll(`.text-${isoCode}`).data(series).enter();

    texts
      .append('text')
      .attr('class', `text-${isoCode}`)
      .attr('transform', `translate(${0}, ${this.graph.height})`)
      .attr('x', (d: any, i: number) => {
        return xScale(i);
      })
      .attr('y', (d: any, i: number) => {
        return yScale(d[this.graph.resource]);
      })
      .text((d: any, i: number) => {
        return d[this.graph.resource];
      })
      .attr('font-size', '10px');
  }

  update(data: IDataPointWithValue[][]) {
    const { chartGroup } = this.graph.getGraphRef();

    for (let i = 0; i < data.length; i++) {
      const series = data[i];
      const isoCode = series[0].iso_code;
      const { xScale, yScale } = getLineSeriesScaleAbs(
        data,
        series,
        { width: this.graph.width, height: this.graph.height, margin: this.graph.margin },
        this.graph.resource as keyof IDataPointQueryable
      );

      // remove all text
      chartGroup.selectAll(`.text-${isoCode}`).remove();

      // add text back in
      const texts = chartGroup.selectAll(`.text-${isoCode}`).data(series).enter();

      texts
        .append('text')
        .attr('class', `text-${isoCode}`)
        .attr('transform', `translate(${0}, ${this.graph.height})`)
        .attr('x', (d: any, i: number) => {
          return xScale(i);
        })
        .attr('y', (d: any, i: number) => {
          return yScale(d[this.graph.resource]);
        })
        .text((d: any, i: number) => {
          return d[this.graph.resource];
        })
        .attr('font-size', '10px');
    }
  }
}

export default GraphText;
