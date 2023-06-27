import { Field, FieldArrayRenderProps } from 'formik';
import React from 'react';
import TextFieldComponent from '../TextField';
import AddButton from './addButton';
import RemoveButton from './removeButton';

interface Props {
  values: string;
  arrayHelpers: FieldArrayRenderProps;
}

function FieldArrayComponent(props: Props) {
  const { values, arrayHelpers } = props;

  // it expects a string so we must make it an array
  const tmp = values.split(',');

  return (
    <div>
      <div>
        {tmp.map((_data: any, index: number) => (
          <div key={index}>
            <Field
              name={`iso_code.${index}`}
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
    </div>
  );
}

export default FieldArrayComponent;
