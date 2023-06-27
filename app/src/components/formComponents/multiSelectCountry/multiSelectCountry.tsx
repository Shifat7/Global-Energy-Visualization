import React from 'react';
import { FieldProps } from 'formik';
import Select from 'react-select';

interface Props extends FieldProps {
  callback: (result: any) => void;
}

function DropdownSelector(props: Props) {
  const { field, callback } = props;
  const options = [
    { value: 'AUS', label: 'Australia' },
    { value: 'FJI', label: 'Fiji' }
  ];

  return (
    <>
      <label>
        {/* {field.name} */}
        <Select isMulti {...field} options={options} isSearchable={true} onChange={callback} />
      </label>
    </>
  );
}

export default DropdownSelector;
