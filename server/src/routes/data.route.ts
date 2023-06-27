import Ajv, { ValidateFunction } from 'ajv';
import { Router } from 'express';
import DataController from '../controllers/data.controller.js';
import Route from '../interfaces/routes.interface.js';
import validateRequest from '../middleware/validateReq.middleware.js';
import { RequestHandler } from 'express';
import schema from './schemas/data.schema.js';
import { IDataQuery } from './schemas/data.query.interface.js';
import { registerModel } from '../utils/registerModel.js';
import { DataService } from '../services/data.service.js';
import {
  IDataPointDocument,
  IDataPointModel,
  schema as dataPointScema
} from '../models/dataPoint.model.js';
import { Connection } from 'mongoose';
import { ITopoDocument, ITopoModel, schema as topoSchema } from '../models/topo.model.js';
import { TopoService } from '../services/topo.service.js';

class DataRoute implements Route {
  public path = '';
  public router = Router({ strict: true });
  public controller: DataController;
  private validator: ValidateFunction<IDataQuery>;
  private schema = schema;

  constructor(conn: Connection) {
    this.validator = new Ajv().compile(this.schema);
    // data service
    const dataModel = registerModel<IDataPointDocument, IDataPointModel>(
      conn,
      dataPointScema,
      'data'
    );
    const dataService = new DataService(dataModel);

    // topo service
    const topoModel = registerModel<ITopoDocument, ITopoModel>(conn, topoSchema, 'topo');
    const topoService = new TopoService(topoModel);

    // controller
    this.controller = new DataController(dataService, topoService);
    this.initializeRoutes();
  }

  private middleware(): RequestHandler[] {
    return [validateRequest<IDataQuery>('query', this.validator)];
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/data`,
      [...this.middleware()],
      this.controller.getDataPoints.bind(this.controller)
    );

    // used for getting all energy data for a range of countries/years
    this.router.get(
      `${this.path}/topo/local`,
      [...this.middleware()],
      this.controller.getTopoLocal.bind(this.controller)
    );

    // used for getting all the countries but for one single energy type
    this.router.get(
      `${this.path}/topo/global`,
      // [...this.middleware()],
      this.controller.getTopoGlobal.bind(this.controller)
    );

    // this returns a topo json file with NO data in it
    this.router.get(
      `${this.path}/topo/blank`,
      [...this.middleware()],
      this.controller.getTopoBlank.bind(this.controller)
    );
  }
}

export default DataRoute;
