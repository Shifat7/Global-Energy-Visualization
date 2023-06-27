import React from 'react';
import { FieldProps } from 'formik';
import Select from 'react-select';

interface Props extends FieldProps {
  // callback: (values: MultiValue<{ value: string; label: string }>) => void;
}

function DropdownSelector(props: Props) {
  const { field } = props;

  const options = [
    { value: 'gas', label: 'gas' },
    { value: 'coal', label: 'coal' },
    { value: 'renewables', label: 'renewables' },
    { value: 'nuclear', label: 'nuclear' }
  ];

  return (
    <>
      <label>
        <Select
          isMulti
          options={options}
          isSearchable={true}
          onChange={(newValues) => {
            props.form.setFieldValue(field.name, newValues);
          }}
        />
      </label>
    </>
  );
}

export default DropdownSelector;
