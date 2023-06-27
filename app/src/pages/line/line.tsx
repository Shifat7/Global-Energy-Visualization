import React from 'react';
import Navigation from '../../components/navigation';
import { Container } from './index.styles';
import DataForm from '../../forms/dataForm';
import Provider from '../../graphs/provider';
import D3Line from '../../graphs/line';
import { IDataPoint } from '../../interfaces/dataPoint.interface';
import { PROTOCOL, API_PORT, DOMAIN } from '../../constants';
import GraphControls from '../../components/graphControls';
import { Field } from 'formik';
import { Checkbox } from '../../components/formComponents';
import { IGraphControlFormProps } from '../../graphs/line/line.interface';

import './styles.scss';

function line() {
  // for this graph we can pass in some general props here to style it
  const dimensions = {
    width: 800,
    height: 500,
    margin: { left: 70, top: 50, bottom: 50, right: 70 }
  };

  return (
    <>
      <Navigation />
      <Container>
        <h1>Line</h1>
        <Provider
          // ===== data path
          dataPath={{ path: '/data', queryParams: ['iso_code', 'year'] }}
          // ===== callback
          handleCallback={async ({ dataPath, formValues }) => {
            // use this to store the series data
            const seriesData: Array<{ value: any } & IDataPoint[]> = [];

            // construct a range of years for the query
            const minYear = parseInt(formValues.minYear);
            const maxYear = parseInt(formValues.maxYear);
            const yearRange = Array.from(
              { length: maxYear - minYear + 1 },
              (v, k) => minYear + k
            ).join(',');

            // get the iso code/s
            const isoCode: string[] = formValues.iso_code;

            // guard against empty values
            if (isoCode.filter(Boolean).length === 0) {
              return;
            }

            for (const code of isoCode.filter(Boolean)) {
              // use this for storing how we will do the query
              const formQueryParams: any = [];

              formQueryParams.push(`iso_code=${code}`);
              formQueryParams.push(`year=${yearRange}`);

              const req = await fetch(
                `${PROTOCOL}://${DOMAIN}:${API_PORT}${dataPath.path}?${formQueryParams.join('&')}`
              );
              const res = await req.json();
              const data = res.data as { value: any } & IDataPoint[];
              seriesData.push(data);
            }

            return seriesData;
          }}
          // ===== dimensions
          dimensions={dimensions}
          // ===== form
          form={DataForm}
          // ===== controls
          controls={({ formData, cb }) => {
            if (!formData.iso_code) {
              return <div style={{ color: 'white' }}>no data yet.</div>;
            }

            // blank skeleton for the country controls
            const initialValues: IGraphControlFormProps = {
              text: {}
            };

            // pre fil the initial values
            for (const code of formData.iso_code) {
              initialValues.text[code] = true;
            }

            return (
              <GraphControls columns={2} initialValues={initialValues} cb={cb}>
                <section style={{ color: '#fefefe', padding: '0 1em' }}>
                  This line graph allows you to a country over time to a resource. If you would like
                  to see countries over a single resource per year, please see the line chart.
                </section>
                <section>
                  <h4>Enable text</h4>
                  {formData.iso_code.filter(Boolean).map((countryCode: string, index: number) => {
                    return (
                      <div key={index}>
                        <Field
                          name={`text[${countryCode}]`}
                          component={Checkbox}
                          label={countryCode}
                          showLabel={true}
                          textColor={'#fff'}
                          defaultChecked={initialValues.text[countryCode]}
                        />
                      </div>
                    );
                  })}
                </section>
              </GraphControls>
            );
          }}
          render={(props) => {
            return <D3Line {...props}></D3Line>;
          }}
        />
      </Container>
    </>
  );
}

export default line;
