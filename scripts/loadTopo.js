import { readFileSync, writeFileSync } from 'fs';
import { MongoClient } from 'mongodb';
import lookup from 'country-code-lookup';

async function conn() {
  const url = 'mongodb://energy:rhinos@localhost:27022/?authsource=energy';
  const client = new MongoClient(url);
  console.log('created client');
  await client.connect();
  console.log('connected to client');
  return client;
}

async function main() {
  const data = JSON.parse(readFileSync('../server/src/data/world-atlas.json'));

  const client = await conn();
  const db = client.db('energy');
  const collection = db.collection('topos');

  // this is for writing to a file
  // const result = [];

  console.log(`processing ${data.objects.countries.geometries.length} countries`);
  for (let i = 0; i < data.objects.countries.geometries.length; i++) {
    const iso_number = data.objects.countries.geometries[i].id;
    // console.log(data.objects.countries.geometries[i]);
    if (!iso_number) {
      // skip countries that we cant match up
      continue;
    }

    const row = {
      ...data.objects.countries.geometries[i],
      country_id: data.objects.countries.geometries[i].id,
      properties: {
        name: data.objects.countries.geometries[i].properties.name,
        country: {
          // ...data.objects.countries.geometries[i].properties.name
          ...lookup.byIso(parseInt(data.objects.countries.geometries[i].id))
        }
      }
    };

    // remove this key
    delete row.id;

    // This is for writing to a file
    // result.push(row);

    await collection.insertOne(row);
    console.log(`inserted ${i} for ${data.objects.countries.geometries[i].properties.name}`);
  }

  // This is for writing it to a file
  // writeFileSync(
  //   '../server/src/data/world-atlas-with-iso-codes.json',
  //   JSON.stringify(
  //     {
  //       ...data,
  //       objects: { ...data.objects, countries: { ...data.objects.countries, geometries: result } }
  //     },
  //     null,
  //     2
  //   )
  // );

  console.log('goodbye');

  client.close();
  return true;
}

main();
