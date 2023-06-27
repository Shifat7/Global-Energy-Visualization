import { IGraph } from '../../interfaces/graph.interface';
import { IDataPointWithValue } from '../../interfaces/IDataPointWithValue.interface';

interface IGraphBar extends IGraph {
  data: Array<IDataPointWithValue>;
  formControls: any;
  formData: any;
}

interface IGraphControlFormProps {
  text: { [key: string]: boolean };
  sort: string;
}

export type { IGraphBar, IGraphControlFormProps };
