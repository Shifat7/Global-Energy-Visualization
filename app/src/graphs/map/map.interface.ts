import { IDataPoint } from '../../interfaces/dataPoint.interface';
import { IGraph } from '../../interfaces/graph.interface';

type IDataPointWithValue = IDataPoint & { value: number };

interface IGraphMap extends IGraph {
  data: any;
  formControls: any;
  formData: any;
}

interface IGraphControlFormProps {
  text: { [key: string]: boolean };
}

export type { IGraphMap, IDataPointWithValue, IGraphControlFormProps };
