import { IGraph } from '../../interfaces/graph.interface';
import { IDataPointWithValue } from '../../interfaces/IDataPointWithValue.interface';

interface IGraphLine extends IGraph {
  data: Array<IDataPointWithValue[]>;
  formControls: any;
  formData: any;
}
interface IGraphControlFormProps {
  text: { [key: string]: boolean };
}

export type { IGraphLine, IDataPointWithValue, IGraphControlFormProps };
