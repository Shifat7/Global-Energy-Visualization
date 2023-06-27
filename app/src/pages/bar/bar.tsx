import React from 'react';
import Navigation from '../../components/navigation';
import { Container } from './index.styles';
import Provider from '../../graphs/provider';
import D3Bar from '../../graphs/bar';
import { PROTOCOL, DOMAIN, API_PORT } from '../../constants';
import BarForm from '../../forms/barForm';
import { Field } from 'formik';
import { Checkbox, RadioGroup } from '../../components/formComponents';
import GraphControls from '../../components/graphControls';
import { IGraphControlFormProps } from '../../graphs/bar/bar.interface';

function bar() {
  // for this graph we can pass in some general props here to style it
  const dimensions = {
    width: 900,
    height: 500,
    margin: { left: 100, top: 50, bottom: 50, right: 50 }
  };

  return (
    <>
      <Navigation />
      <Container>
        <h1>Bar</h1>
        <Provider
          dimensions={dimensions}
          dataPath={{ path: '/data', queryParams: ['iso_code', 'year'] }}
          handleCallback={async ({ dataPath, formValues }) => {
            // use this for storing how we will do the query
            const formQueryParams: any = [];

            const year = formValues.year;

            const isoCode = formValues.iso_code;

            // guard against empty values
            if (isoCode.filter(Boolean).length === 0) {
              return;
            }

            formQueryParams.push(`iso_code=${isoCode}`);
            formQueryParams.push(`year=${year}`);

            const req = await fetch(
              `${PROTOCOL}://${DOMAIN}:${API_PORT}${dataPath.path}?${formQueryParams.join('&')}`
            );
            const res = await req.json();
            const data = res.data.map((d: any) => {
              return {
                ...d,
                value: d.population
              };
            });
            return data;
          }}
          form={BarForm}
          controls={({ formData, cb }) => {
            if (!formData.iso_code) {
              return <div style={{ color: 'white' }}>no data yet.</div>;
            }

            // blank skeleton for the country controls
            const initialValues: IGraphControlFormProps = {
              text: {},
              sort: 'descending'
            };

            // pre fill the initial values
            for (const code of formData.iso_code.filter(Boolean)) {
              initialValues.text[code] = true;
            }

            return (
              <GraphControls columns={3} initialValues={initialValues} cb={cb}>
                <section style={{ color: '#fefefe', padding: '0 1em' }}>
                  This bar graph allows you to compare any number of countries to a resource over a
                  year. If you would like to see a country over time, please see the line chart.
                </section>
                <section>
                  <h4>Sort</h4>
                  <Field
                    name={'sort'}
                    component={RadioGroup}
                    label={'sort'}
                    showLabel={true}
                    textColor={'#fff'}
                  />
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
          render={D3Bar}
        />
      </Container>
    </>
  );
}

export default bar;
