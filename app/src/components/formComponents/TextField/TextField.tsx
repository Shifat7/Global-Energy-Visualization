import React from 'react';
import { FieldProps } from 'formik';
import { Input } from './styles';
// import { TextField } from '@material-ui/core';
// import { Form } from 'react-bootstrap';
// import Mui from '@material-ui/core';

interface Props extends FieldProps {
  // custom props that can be passed in from the formik Field
  showLabel: boolean;
  label: string;
}

function TextFieldComponent(props: Props) {
  const { field, showLabel, label } = props;

  return (
    <div>
      <label>
        {showLabel && label}
        <Input {...field} />
      </label>
    </div>
  );
}

export default TextFieldComponent;
