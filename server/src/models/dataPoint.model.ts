import mongoose from 'mongoose';
import { IDataPoint } from '../interfaces/dataPoint.interface';

// virtuals go here
interface IDataPointDocument extends IDataPoint, mongoose.Document {}

// statics go here
interface IDataPointModel extends mongoose.Model<IDataPointDocument> {
  placeholder(model: IDataPointModel): Promise<Document[]>;
}

const schema: mongoose.Schema = new mongoose.Schema({
  // any: {}
  iso_code: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  coal_prod_change_pct: {
    type: Number,
    required: false
  },
  coal_prod_change_twh: {
    type: Number,
    required: false
  },
  gas_prod_change_pct: {
    type: Number,
    required: false
  },
  gas_prod_change_twh: {
    type: Number,
    required: false
  },
  oil_prod_change_pct: {
    type: Number,
    required: false
  },
  oil_prod_change_twh: {
    type: Number,
    required: false
  },
  energy_cons_change_pct: {
    type: Number,
    required: false
  },
  energy_cons_change_twh: {
    type: Number,
    required: false
  },
  biofuel_share_elec: {
    type: Number,
    required: false
  },
  biofuel_cons_change_pct: {
    type: Number,
    required: false
  },
  biofuel_share_energy: {
    type: Number,
    required: false
  },
  biofuel_cons_change_twh: {
    type: Number,
    required: false
  },
  biofuel_consumption: {
    type: Number,
    required: false
  },
  biofuel_elec_per_capita: {
    type: Number,
    required: false
  },
  biofuel_cons_per_capita: {
    type: Number,
    required: false
  },
  carbon_intensity_elec: {
    type: Number,
    required: false
  },
  coal_share_elec: {
    type: Number,
    required: false
  },
  coal_cons_change_pct: {
    type: Number,
    required: false
  },
  coal_share_energy: {
    type: Number,
    required: false
  },
  coal_cons_change_twh: {
    type: Number,
    required: false
  },
  coal_consumption: {
    type: Number,
    required: false
  },
  coal_elec_per_capita: {
    type: Number,
    required: false
  },
  coal_cons_per_capita: {
    type: Number,
    required: false
  },
  coal_production: {
    type: Number,
    required: false
  },
  coal_prod_per_capita: {
    type: Number,
    required: false
  },
  electricity_generation: {
    type: Number,
    required: false
  },
  biofuel_electricity: {
    type: Number,
    required: false
  },
  coal_electricity: {
    type: Number,
    required: false
  },
  gas_electricity: {
    type: Number,
    required: false
  },
  hydro_electricity: {
    type: Number,
    required: false
  },
  nuclear_electricity: {
    type: Number,
    required: false
  },
  oil_electricity: {
    type: Number,
    required: false
  },
  other_renewable_electricity: {
    type: Number,
    required: false
  },
  other_renewable_exc_biofuel_electricity: {
    type: Number,
    required: false
  },
  renewables_electricity: {
    type: Number,
    required: false
  },
  solar_electricity: {
    type: Number,
    required: false
  },
  wind_electricity: {
    type: Number,
    required: false
  },
  energy_per_gdp: {
    type: Number,
    required: false
  },
  energy_per_capita: {
    type: Number,
    required: false
  },
  fossil_cons_change_pct: {
    type: Number,
    required: false
  },
  fossil_share_energy: {
    type: Number,
    required: false
  },
  fossil_cons_change_twh: {
    type: Number,
    required: false
  },
  fossil_fuel_consumption: {
    type: Number,
    required: false
  },
  fossil_energy_per_capita: {
    type: Number,
    required: false
  },
  fossil_cons_per_capita: {
    type: Number,
    required: false
  },
  fossil_share_elec: {
    type: Number,
    required: false
  },
  gas_share_elec: {
    type: Number,
    required: false
  },
  gas_cons_change_pct: {
    type: Number,
    required: false
  },
  gas_share_energy: {
    type: Number,
    required: false
  },
  gas_cons_change_twh: {
    type: Number,
    required: false
  },
  gas_consumption: {
    type: Number,
    required: false
  },
  gas_elec_per_capita: {
    type: Number,
    required: false
  },
  gas_energy_per_capita: {
    type: Number,
    required: false
  },
  gas_production: {
    type: Number,
    required: false
  },
  gas_prod_per_capita: {
    type: Number,
    required: false
  },
  hydro_share_elec: {
    type: Number,
    required: false
  },
  hydro_cons_change_pct: {
    type: Number,
    required: false
  },
  hydro_share_energy: {
    type: Number,
    required: false
  },
  hydro_cons_change_twh: {
    type: Number,
    required: false
  },
  hydro_consumption: {
    type: Number,
    required: false
  },
  hydro_elec_per_capita: {
    type: Number,
    required: false
  },
  hydro_energy_per_capita: {
    type: Number,
    required: false
  },
  low_carbon_share_elec: {
    type: Number,
    required: false
  },
  low_carbon_electricity: {
    type: Number,
    required: false
  },
  low_carbon_elec_per_capita: {
    type: Number,
    required: false
  },
  low_carbon_cons_change_pct: {
    type: Number,
    required: false
  },
  low_carbon_share_energy: {
    type: Number,
    required: false
  },
  low_carbon_cons_change_twh: {
    type: Number,
    required: false
  },
  low_carbon_consumption: {
    type: Number,
    required: false
  },
  low_carbon_energy_per_capita: {
    type: Number,
    required: false
  },
  nuclear_share_elec: {
    type: Number,
    required: false
  },
  nuclear_cons_change_pct: {
    type: Number,
    required: false
  },
  nuclear_share_energy: {
    type: Number,
    required: false
  },
  nuclear_cons_change_twh: {
    type: Number,
    required: false
  },
  nuclear_consumption: {
    type: Number,
    required: false
  },
  nuclear_elec_per_capita: {
    type: Number,
    required: false
  },
  nuclear_energy_per_capita: {
    type: Number,
    required: false
  },
  oil_share_elec: {
    type: Number,
    required: false
  },
  oil_cons_change_pct: {
    type: Number,
    required: false
  },
  oil_share_energy: {
    type: Number,
    required: false
  },
  oil_cons_change_twh: {
    type: Number,
    required: false
  },
  oil_consumption: {
    type: Number,
    required: false
  },
  oil_elec_per_capita: {
    type: Number,
    required: false
  },
  oil_energy_per_capita: {
    type: Number,
    required: false
  },
  oil_production: {
    type: Number,
    required: false
  },
  oil_prod_per_capita: {
    type: Number,
    required: false
  },
  other_renewables_elec_per_capita: {
    type: Number,
    required: false
  },
  other_renewables_elec_per_capita_exc_biofuel: {
    type: Number,
    required: false
  },
  other_renewables_share_elec: {
    type: Number,
    required: false
  },
  other_renewables_share_elec_exc_biofuel: {
    type: Number,
    required: false
  },
  other_renewables_cons_change_pct: {
    type: Number,
    required: false
  },
  other_renewables_share_energy: {
    type: Number,
    required: false
  },
  other_renewables_cons_change_twh: {
    type: Number,
    required: false
  },
  other_renewable_consumption: {
    type: Number,
    required: false
  },
  other_renewables_energy_per_capita: {
    type: Number,
    required: false
  },
  per_capita_electricity: {
    type: Number,
    required: false
  },
  population: {
    type: Number,
    required: false
  },
  primary_energy_consumption: {
    type: Number,
    required: false
  },
  renewables_elec_per_capita: {
    type: Number,
    required: false
  },
  renewables_share_elec: {
    type: Number,
    required: false
  },
  renewables_cons_change_pct: {
    type: Number,
    required: false
  },
  renewables_share_energy: {
    type: Number,
    required: false
  },
  renewables_cons_change_twh: {
    type: Number,
    required: false
  },
  renewables_consumption: {
    type: Number,
    required: false
  },
  renewables_energy_per_capita: {
    type: Number,
    required: false
  },
  solar_share_elec: {
    type: Number,
    required: false
  },
  solar_cons_change_pct: {
    type: Number,
    required: false
  },
  solar_share_energy: {
    type: Number,
    required: false
  },
  solar_cons_change_twh: {
    type: Number,
    required: false
  },
  solar_consumption: {
    type: Number,
    required: false
  },
  solar_elec_per_capita: {
    type: Number,
    required: false
  },
  solar_energy_per_capita: {
    type: Number,
    required: false
  },
  gdp: {
    type: Number,
    required: false
  },
  wind_share_elec: {
    type: Number,
    required: false
  },
  wind_cons_change_pct: {
    type: Number,
    required: false
  },
  wind_share_energy: {
    type: Number,
    required: false
  },
  wind_cons_change_twh: {
    type: Number,
    required: false
  },
  wind_consumption: {
    type: Number,
    required: false
  },
  wind_elec_per_capita: {
    type: Number,
    required: false
  },
  wind_energy_per_capita: {
    type: Number,
    required: false
  }
});

const DataPoint: mongoose.Model<IDataPointDocument> = mongoose.model('data', schema);

export { schema, DataPoint };
export type { IDataPointDocument, IDataPointModel };
