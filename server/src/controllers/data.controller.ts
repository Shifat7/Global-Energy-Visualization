import loggerFunction from '../utils/genericLogger.js';
import { URL } from 'url';
import { NextFunction, Request, Response } from 'express';
import { DataService } from 'services/data.service.js';
import { TopoService } from 'services/topo.service.js';
import { IDataQuery } from 'routes/schemas/data.query.interface.js';
import HttpException from '../exceptions/HttpException.js';
import { IDataPoint } from 'interfaces/dataPoint.interface.js';

const __filename = new URL('', import.meta.url).pathname;
const logger = loggerFunction(__filename);

class PayloadController {
  private _dataService: DataService;
  private _topoService: TopoService;

  constructor(dataService: DataService, topoService: TopoService) {
    logger.info('Loading data');
    this._dataService = dataService;
    this._topoService = topoService;
  }

  public getDataPoints = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result: IDataPoint[] = [];
      const query = req.query as unknown as IDataQuery;

      // this is a bit hacky and we should not validate params here but whatever
      if (!query.year) {
        throw new HttpException(400, 'Year is required');
      }

      if (query.iso_code) {
        for (const c of query.iso_code?.split(',').filter((e) => e)) {
          // get the data for this country for each year
          for (const y of query.year?.split(',').filter((e) => e)) {
            const val = await this._dataService.getDataPoints({
              iso_code: c,
              year: y
            });
            result.push(...val);
          }
        }
      }

      res.status(200).json({ length: result.length, data: result });
    } catch (err) {
      next(err);
    }
  };


  public getTopoBlank = async (
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> => {
    res.status(200).json({ message: 'not implemented' });
  };


  public getTopoGlobal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allCountries = await this._topoService.getDataPoints({});

      const query = req.query as any;

      // for each of allCountries
      for (let i = 0; i < allCountries.length; i++) {
        const country: any = allCountries[i];

        // collect data for this country
        const data = [];

        // for the year for this country
        const year = (query['year'] as string || '2000');
        const val = await this._dataService.getDataPoints({
          iso_code: country.properties.country.iso3,
          year: year
        });

        if (val[0]) {
          data.push(val[0].get(query.resource));
        }

        // merge the data into the array of topo json countries
        allCountries[i] = {
          ...country._doc,
          properties: {
            ...country?.properties,
            [query.resource]: data
          }
        };
      }

      res.status(200).json({ geometries: allCountries });
      console.log('done');
    } catch (err) {
      next(err);
    }

  };


  public getTopoLocal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allCountries = await this._topoService.getDataPoints({});
      const query = req.query as unknown as IDataQuery;

      // for each of allCountries
      for (let i = 0; i < allCountries.length; i++) {
        const country: any = allCountries[i];

        // check if we need to collect data for this country
        // we need to collect data when its present in the query params
        if (
          query.iso_code &&
          !query.iso_code.split(',').some((e) => e === country.properties.country.iso3)
        ) {
          continue;
        }

        // collect data for this country
        const data = [];

        // for each year for this country
        if (query?.year) {
          for (const year of query?.year.split(',').filter((e) => e)) {
            const val = await this._dataService.getDataPoints({
              iso_code: country.properties.country.iso3,
              year: year
            });
            if (val[0]) {
              data.push(val[0]);
            }
          }
        }

        // merge the data into the array of topo json countries
        allCountries[i] = {
          ...country._doc,
          properties: {
            ...country?.properties,
            data: data
          }
        };
      }

      res.status(200).json({ geometries: allCountries });
      console.log('done');
    } catch (err) {
      next(err);
    }
  };
}

export default PayloadController;
