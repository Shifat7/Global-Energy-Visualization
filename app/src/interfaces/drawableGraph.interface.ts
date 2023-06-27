// import { IGraphControlFormProps } from '../components/graphControls/graphControls';
import { IDataPointWithValue } from './IDataPointWithValue.interface';
import { IDataPoint, IDataPointQueryable } from './dataPoint.interface';
import { IDimensions, IDimensionsMargin } from './graph.interface';

type D3Target = React.RefObject<SVGSVGElement>;

// T is the tpe of data that draw() needs
// K is the type of data that formControls initial values needs
interface IDrawableGraph<T, K> {
  resource: keyof IDataPointQueryable;
  formControls: K;
  width: number;
  height: number;
  margin: IDimensionsMargin;
  ref: React.RefObject<SVGSVGElement>;
  color: d3.ScaleOrdinal<string, unknown, never>;
  draw: (data: T) => any;
  getGraphRef: () => {
    svg: d3.Selection<SVGGElement, any, any, any>;
    chartGroup: d3.Selection<d3.BaseType, any, any, any>;
    graphKey: d3.Selection<d3.BaseType, any, any, any>;
    xAxisGroup: d3.Selection<d3.BaseType, any, any, any>;
    yAxisGroup: d3.Selection<d3.BaseType, any, any, any>;
  };
}

export default IDrawableGraph;
