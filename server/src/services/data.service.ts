import HttpException from '../exceptions/HttpException.js';
import { IDataPointModel, IDataPointDocument } from 'models/dataPoint.model.js';
import { IDataQuery } from 'routes/schemas/data.query.interface.js';

interface IDataPointWithId extends IDataPointDocument {
  id?: any;
}
class DataService {
  private _conn: IDataPointModel;

  constructor(conn: IDataPointModel) {
    this._conn = conn;
  }

  async getDataPoints(query: IDataQuery): Promise<IDataPointWithId[]> {
    const data = await this._conn
      .find({
        ...query
      })
      .exec();

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

export { DataService };
