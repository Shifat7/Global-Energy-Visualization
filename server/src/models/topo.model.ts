import mongoose from 'mongoose';
import { ITopo } from '../interfaces/topo.interface.js';

// virtuals go here
interface ITopoDocument extends ITopo, mongoose.Document {}

// statics go here
interface ITopoModel extends mongoose.Model<ITopoDocument> {
  // placeholder(model: ITopoModel): Promise<Document[]>;
}

const schema: mongoose.Schema = new mongoose.Schema({
  type: String,
  arcs: Array,
  properties: Object,
  country_id: String
});

const Topo: mongoose.Model<ITopoDocument> = mongoose.model('topo', schema);

export { schema, Topo };
export type { ITopoDocument, ITopoModel };
