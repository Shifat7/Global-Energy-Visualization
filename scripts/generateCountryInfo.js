import countries from 'i18n-iso-countries';
import lookup from 'country-code-lookup';
import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse';

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

async function main() {
  const dataCsv = readFileSync('../server/src/data/energy-data/owid-energy-data.csv');
  const data = await parsePromise(dataCsv);

  const result = new Map();
  for (const row of data) {
    console.log('a');
    const countryNames = countries.getName(row.iso_code, 'en', { select: 'all' }) || [];

    if (countryNames.length === 0) {
      console.log(`theres no country name for ${row.country}`);
      continue;
    }

    let country = undefined;
    for (let i = 0; i < countryNames.length; i++) {
      country = lookup.byCountry(countryNames[i]);
      if (country) {
        break;
      }
    }

    if (country?.iso3) {
      // result.push({ value: row.iso_code, label: row.country });
      result.set(country.iso3, { value: row.iso_code, label: row.country });
    }
  }
  const tmp = Array.from(result.values());
  writeFileSync('./countries.json', JSON.stringify(tmp));
  return true;
}

main();
