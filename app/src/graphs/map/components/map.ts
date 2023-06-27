import IDrawableGraph from '../../../interfaces/drawableGraph.interface';
import { IGraphControlFormProps } from '../map.interface';

class GraphMap {
  public graph: IDrawableGraph<any, IGraphControlFormProps>;
  constructor(graph: IDrawableGraph<any, IGraphControlFormProps>) {
    this.graph = graph; // store a reference to the graph
  }
}

export default GraphMap;
