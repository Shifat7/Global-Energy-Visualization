import React from 'react';
import { FieldProps } from 'formik';
import { Container } from './styles';

interface Props extends FieldProps {
  // custom props that can be passed in from the formik Field
  showLabel: boolean;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
}

function DropDown(props: Props) {
  const { field, showLabel, label } = props;

  return (
    <Container>
      {showLabel && label}
      <select
        // just putting a comment here so it doesn't auto fmt
        name={field.name}
        onChange={field.onChange}
        style={{ display: 'block' }}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Container>
  );
}

export default DropDown;
