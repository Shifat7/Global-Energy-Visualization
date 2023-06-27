import { parse } from 'csv-parse';
import { readFileSync } from 'fs';
import { MongoClient } from 'mongodb';
import countries from 'i18n-iso-countries';
import lookup from 'country-code-lookup';

const parsePromise = (data) => {
  return new Promise((resolve, reject) => {
    parse(data, { columns: true, skipEmptyLines: false }, (err, output) => {
      if (err) {
        return reject(err);
      } else {
        resolve(output);
      }
    });
  });
};

async function conn() {
  const url = 'mongodb://energy:rhinos@localhost:27022/?authsource=energy';
  const client = new MongoClient(url);
  console.log('created client');
  await client.connect();
  console.log('connected to client');
  return client;
}

async function main() {
  let count = 0;
  const dataCsv = readFileSync('../server/src/data/energy-data/owid-energy-data.csv');
  const data = await parsePromise(dataCsv);
  console.log(data.length);

  const client = await conn();
  const db = client.db('energy');
  const collection = db.collection('datas');

  const errors = [];

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    console.log(`processing ${row.country} for ${row.year} item ${i}`);
    let country = undefined;
    const countryNames = countries.getName(row.iso_code, 'en', { select: 'all' }) || [];

    if (countryNames.length === 0) {
      console.log(`theres no country name for ${row.country}`);
      continue;
    }

    for (let i = 0; i < countryNames.length; i++) {
      country = lookup.byCountry(countryNames[i]);
      if (country) {
        break;
      }
    }

    // guard against null and empty strings. replace them with zero
    const keys = Object.keys(row);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (row[key] === '' || row[key] === null) {
        row[key] = '0';
      }
    }

    if (country?.iso3) {
      const countryData = {
        ...row,
        iso_code: country.iso3,
        country: {
          ...country,
          iso_number: lookup.byIso(country.iso3).isoNo
        }
      };

      await collection.insertOne(countryData);
      count += 1;
    } else {
      console.log(country);
    }
  }

  console.log('==================');
  console.log('WARNING REPORT');
  console.log('==================');

  console.log(errors.join('\n'));

  console.log(count + ' inserted');
  client.close();
  console.log('goodbye');

  return true;
}

main();
