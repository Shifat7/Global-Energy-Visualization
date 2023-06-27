// References the interface from ../../interfaces/payload.interface.ts

import { JSONSchemaType } from 'ajv';
import { IDataQuery } from './data.query.interface';

const schema: JSONSchemaType<IDataQuery> = {
  type: 'object',
  properties: {
    iso_code: {
      type: 'string',
      nullable: true,
      minLength: 1,
      maxLength: 48 // 3*16 ISO alpha3 codes
    },
    year: {
      type: 'string',
      nullable: true,
      minLength: 1,
      maxLength: 1024 // 128 4 digit years
    }
  },
  anyOf: [
    {
      required: ['iso_code']
    },
    {
      required: ['year']
    },
    {
      required: ['year', 'iso_code']
    }
  ],
  additionalProperties: false
};

export default schema;
