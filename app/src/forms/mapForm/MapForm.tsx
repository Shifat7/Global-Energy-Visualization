import React from 'react';
import { Field, Form, Formik } from 'formik';
import { IDataFormValues } from './dataForm.interface';
import { DropDown, TextFieldComponent } from '../../components/formComponents';
import { isYear } from '../../components/formValidators';
import { Container, Section } from './styles';
import Button from '../../components/button';

interface Props {
  cb: (values: IDataFormValues) => void;
}

function MapForm(props: Props) {
  const { cb } = props;

  const initialValues: IDataFormValues = {
    resourceType: 'oil_consumption'
  };

  return (
    <Container>
      <Formik initialValues={initialValues} onSubmit={cb}>
        {(form) => (
          <Form>
            <Section block={true} padding={'10px'}>
              {/* year */}
              <Field
                component={TextFieldComponent}
                name="year"
                type="number"
                label="year"
                showLabel={true}
                validate={isYear}
              />
            </Section>
            <Section block={true} padding={'10px'}>
              {/* resource type array */}

              <Field
                component={DropDown}
                name="resourceType"
                type="string"
                label="Resource"
                showLabel={true}
                options={[
                  { label: 'Oil consumption', value: 'oil_consumption' },
                  { label: 'Coal consumption', value: 'coal_consumption' },
                  { label: 'Gas consumption', value: 'gas_consumption' },
                  { label: 'Biofuel consumption', value: 'biofuel_consumption' },
                  { label: 'Nuclear consumption', value: 'nuclear_consumption' },
                  { label: 'Renewables consumption', value: 'renewables_consumption' }
                ]}
              />
            </Section>

            <Section block={true} padding={'10px'}>
              {/* submit */}
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

export default MapForm;

/*
oil_consumption
coal_consumption
gas_consumption
biofuel_consumption
nuclear_consumption
renewables_consumption
*/
