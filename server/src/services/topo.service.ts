import HttpException from '../exceptions/HttpException.js';
import { ITopoDocument, ITopoModel } from 'models/topo.model.js';
import { IDataQuery } from 'routes/schemas/data.query.interface.js';

interface ITopoWithId extends ITopoDocument {
  id?: any;
}

class TopoService {
  private _conn: ITopoModel;

  constructor(conn: ITopoModel) {
    this._conn = conn;
  }

  async getDataPoints(query: IDataQuery): Promise<ITopoWithId[]> {
    const formattedQuery: any = {};
    if (query.iso_code) {
      formattedQuery['properties.country.iso3'] = query.iso_code;
    }

    const data = await this._conn.find(formattedQuery).exec();

    if (data === null) {
      throw new HttpException(404, 'Data not found');
    } else {
      if (Array.isArray(data)) {
        return data;
      } else {
        return [data];
      }
    }
  }
}

export { TopoService };
