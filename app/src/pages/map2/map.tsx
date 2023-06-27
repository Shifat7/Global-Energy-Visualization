import React from 'react';
import Navigation from '../../components/navigation';
import { Container } from './index.styles';
import MapForm from '../../forms/mapForm';
import Provider from '../../graphs/provider';
import D3Map from '../../graphs/map';
import { feature } from 'topojson-client';
import { Feature, FeatureCollection, Geometry } from 'geojson';
import { PROTOCOL, DOMAIN, API_PORT } from '../../constants';

function Map() {
  // for this graph we can pass in some general props here to style it
  const dimensions = {
    width: 1000,
    height: 500,
    margin: { left: 100, top: 50, bottom: 50, right: 50 }
  };

  return (
    <>
      <Navigation />
      <Container>
        <h1>Map</h1>
        <Provider
          // ===== dimension
          dimensions={dimensions}
          // ===== data path
          dataPath={{ path: '/topo/global', queryParams: ['resource', 'year'] }}
          // ===== callback from the form
          handleCallback={async ({ dataPath, formValues }) => {
            // get the topoJson if required
            const url = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
            const res1 = await fetch(url);
            const dataT = await res1.json();

            /* eslint-disable */
            console.log(formValues);

            // use this for storing how we will do the query
            const res = await fetch(
              `${PROTOCOL}://${DOMAIN}:${API_PORT}/topo/global?resource=${formValues.resourceType}&year=${formValues.year}`
            );
            const data = await res.json();

            const merged = {
              ...dataT,
              objects: {
                countries: {
                  geometries: [...data.geometries],
                  type: 'GeometryCollection'
                }
              }
            };

            const mapFeatures: Array<Feature<Geometry | null>> = (
              feature(merged, merged.objects.countries) as unknown as FeatureCollection
            ).features;

            return mapFeatures;
          }}
          // ===== the form to render
          form={MapForm}
          // ===== the graph controls to render
          controls={() => {
            return (
              <div style={{ color: '#fefefe', marginTop: '1rem' }}>
                  <h3>Topological Map of the 6 Energy types</h3>
                    <p>The graph above shows how 6 energy types are used per country on a global scale.
                    Note that for each year and all the energy types, the number of countries that have 0 consumption remains the same. 
                    This is because the data that we used doesn't have those countries recorded into its database. 
                    It reflects most of the African countries and some Asian ones do not do it. Other than that the three developed countries USA, 
                    China and Russia have understandably the most energy usages.</p>

              </div>
            );
          }}
          // ===== the graph to render
          render={D3Map}
        />
      </Container>
    </>
  );
}

export default Map;
