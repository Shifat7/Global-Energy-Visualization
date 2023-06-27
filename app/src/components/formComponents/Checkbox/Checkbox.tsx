import React from 'react';
import { FieldProps } from 'formik';
import { Container, Input, Label } from './styles';

interface Props extends FieldProps {
  // custom props that can be passed in from the formik Field
  name: string;
  showLabel: boolean;
  label: string;
  textColor: string;
  defaultChecked: boolean;
}

function TextField(props: Props) {
  const { field, showLabel, label, textColor, defaultChecked } = props;

  return (
    <Container textColor={textColor}>
      <label>
        <Input type={'checkbox'} defaultChecked={defaultChecked} {...field} />
        {showLabel && <Label>{label}</Label>}
      </label>
    </Container>
  );
}

export default TextField;
