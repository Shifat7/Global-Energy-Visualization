/* eslint-disable max-lines */
import React from 'react';
import { Field, FieldArray, Form, Formik } from 'formik';
import { IDataFormValues } from './dataForm.interface';
import {
  TextFieldComponent,
  DropDown,
  InputControlsDropDown
} from '../../components/formComponents';
import { isYear } from '../../components/formValidators';
import { Container, Section } from './styles';
import Button from '../../components/button';

interface Props {
  cb: (values: IDataFormValues) => void;
}

function DataForm(props: Props) {
  const { cb } = props;

  const initialValues: IDataFormValues = {
    iso_code: [''],
    minYear: '2000',
    maxYear: '2015',
    resource: 'fossil_cons_per_capita'
  };

  return (
    <Container>
      <Formik initialValues={initialValues} onSubmit={cb}>
        {(form) => (
          <Form>
            <Section block={true} padding={'10px'}>
              {/* resource type array */}
              <FieldArray
                name={'iso_code'}
                render={(arrayHelpers) =>
                  InputControlsDropDown({
                    arrayHelpers: arrayHelpers,
                    values: form.values.iso_code.join(',')
                  })
                }
              />

              {/* min year */}
              <Field
                component={TextFieldComponent}
                name="minYear"
                type="number"
                label="min year"
                showLabel={true}
                validate={isYear}
              />

              {/* max year */}
              <Field
                component={TextFieldComponent}
                name="maxYear"
                type="number"
                label="max year"
                showLabel={true}
                validate={isYear}
              />
            </Section>
            <Section block={true} padding={'10px'}>
              {/* resource */}
              <Field
                component={DropDown}
                name="resource"
                type="string"
                label="Resource"
                showLabel={true}
                options={[
                  { label: '', value: '' },
                  { label: 'biofuel consumption', value: 'biofuel_consumption' },
                  { label: 'biofuel elec per capita', value: 'biofuel_elec_per_capita' },
                  { label: 'biofuel cons per capita', value: 'biofuel_cons_per_capita' },
                  { label: 'coal consumption', value: 'coal_consumption' },
                  { label: 'coal elec per capita', value: 'coal_elec_per_capita' },
                  { label: 'coal cons per capita', value: 'coal_cons_per_capita' },
                  { label: 'coal production', value: 'coal_production' },
                  { label: 'coal prod per capita', value: 'coal_prod_per_capita' },
                  { label: 'electricity generation', value: 'electricity_generation' },
                  { label: 'biofuel electricity', value: 'biofuel_electricity' },
                  { label: 'coal electricity', value: 'coal_electricity' },
                  { label: 'fossil electricity', value: 'fossil_electricity' },
                  { label: 'gas electricity', value: 'gas_electricity' },
                  { label: 'hydro electricity', value: 'hydro_electricity' },
                  { label: 'nuclear electricity', value: 'nuclear_electricity' },
                  { label: 'oil electricity', value: 'oil_electricity' },
                  { label: 'other renewable electricity', value: 'other_renewable_electricity' },
                  { label: 'renewables electricity', value: 'renewables_electricity' },
                  { label: 'solar electricity', value: 'solar_electricity' },
                  { label: 'wind electricity', value: 'wind_electricity' },
                  { label: 'energy per gdp', value: 'energy_per_gdp' },
                  { label: 'energy per capita', value: 'energy_per_capita' },
                  { label: 'fossil share energy', value: 'fossil_share_energy' },
                  { label: 'fossil fuel consumption', value: 'fossil_fuel_consumption' },
                  { label: 'fossil energy per capita', value: 'fossil_energy_per_capita' },
                  { label: 'fossil cons per capita', value: 'fossil_cons_per_capita' },
                  { label: 'fossil share elec', value: 'fossil_share_elec' },
                  { label: 'gas share elec', value: 'gas_share_elec' },
                  { label: 'gas share energy', value: 'gas_share_energy' },
                  { label: 'gas consumption', value: 'gas_consumption' },
                  { label: 'gas elec per capita', value: 'gas_elec_per_capita' },
                  { label: 'gas energy per capita', value: 'gas_energy_per_capita' },
                  { label: 'gas production', value: 'gas_production' },
                  { label: 'gas prod per capita', value: 'gas_prod_per_capita' },
                  { label: 'hydro share elec', value: 'hydro_share_elec' },
                  { label: 'hydro share energy', value: 'hydro_share_energy' },
                  { label: 'hydro consumption', value: 'hydro_consumption' },
                  { label: 'hydro elec per capita', value: 'hydro_elec_per_capita' },
                  { label: 'hydro energy per capita', value: 'hydro_energy_per_capita' },
                  { label: 'nuclear share elec', value: 'nuclear_share_elec' },
                  { label: 'nuclear share energy', value: 'nuclear_share_energy' },
                  { label: 'nuclear consumption', value: 'nuclear_consumption' },
                  { label: 'nuclear elec per capita', value: 'nuclear_elec_per_capita' },
                  { label: 'nuclear energy per capita', value: 'nuclear_energy_per_capita' },
                  { label: 'oil share elec', value: 'oil_share_elec' },
                  { label: 'oil share energy', value: 'oil_share_energy' },
                  { label: 'oil consumption', value: 'oil_consumption' },
                  { label: 'oil elec per capita', value: 'oil_elec_per_capita' },
                  { label: 'oil energy per capita', value: 'oil_energy_per_capita' },
                  { label: 'oil production', value: 'oil_production' },
                  { label: 'oil prod per capita', value: 'oil_prod_per_capita' },
                  { label: 'per capita electricity', value: 'per_capita_electricity' },
                  { label: 'population', value: 'population' },
                  { label: 'primary energy consumption', value: 'primary_energy_consumption' },
                  { label: 'renewables elec per capita', value: 'renewables_elec_per_capita' },
                  { label: 'renewables share elec', value: 'renewables_share_elec' },
                  { label: 'renewables share energy', value: 'renewables_share_energy' },
                  { label: 'renewables consumption', value: 'renewables_consumption' },
                  { label: 'renewables energy per capita', value: 'renewables_energy_per_capita' },
                  { label: 'solar share elec', value: 'solar_share_elec' },
                  { label: 'solar share energy', value: 'solar_share_energy' },
                  { label: 'solar consumption', value: 'solar_consumption' },
                  { label: 'solar elec per capita', value: 'solar_elec_per_capita' },
                  { label: 'solar energy per capita', value: 'solar_energy_per_capita' },
                  { label: 'gdp', value: 'gdp' },
                  { label: 'wind share elec', value: 'wind_share_elec' },
                  { label: 'wind share energy', value: 'wind_share_energy' },
                  { label: 'wind consumption', value: 'wind_consumption' },
                  { label: 'wind elec per capita', value: 'wind_elec_per_capita' },
                  { label: 'wind energy per capita', value: 'wind_energy_per_capitaname' }
                ]}
              />
            </Section>
            <Section block={true} padding={'10px'}>
              {/* submit */}
              <div>
                Note that if no results are displayed, this means that no data was available.
              </div>
              <Button width={'100px'} type="submit">
                Submit
              </Button>
            </Section>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default DataForm;
