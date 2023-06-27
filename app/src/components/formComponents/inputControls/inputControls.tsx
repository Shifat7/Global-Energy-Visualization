import React from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import RemoveButton from './removeButton';
import AddButton from './addButton';
// import { Button, ButtonGroup } from 'react-bootstrap/esm';
// import Form from 'react-bootstrap/esm/Form';
import { TextFieldComponent } from '../';

interface FormValues {
  data: Array<{ value: string; label: string }>;
}

interface Props {
  callback: (result: FormValues) => void;
}

function InputControls(props: Props) {
  const initialValues = {
    data: [
      { value: 'AUS', label: 'Australia' },
      { value: 'FJI', label: 'Fiji' }
    ],
    name: 'roland'
  };

  const onSubmit = async (values: any) => {
    await new Promise((resolve, reject) => setTimeout(resolve, 500));
    props.callback(values);
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values }) => {
          return (
            <Form>
              <FieldArray
                name="data"
                render={(arrayHelpers) => {
                  return (
                    <div>
                      {values.data.map((data, index) => (
                        <div key={index}>
                          <Field
                            name={`data.${index}[label]`}
                            component={TextFieldComponent}
                            callback={(result: any) => {
                              arrayHelpers.replace(index, result);
                            }}
                          />
                          <RemoveButton arrayHelpers={arrayHelpers} index={index} />
                        </div>
                      ))}
                      <AddButton arrayHelpers={arrayHelpers} />
                    </div>
                  );
                }}
              />
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default InputControls;
