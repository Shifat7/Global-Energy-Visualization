import { FieldArrayRenderProps } from 'formik';
import React from 'react';
import Button from '../../../components/button';

interface Props {
  arrayHelpers: FieldArrayRenderProps;
}

function RemoveButton(props: Props) {
  const { arrayHelpers } = props;

  const handleAdd = () => {
    arrayHelpers.push('');
  };

  return (
    <>
      <Button type="button" onClick={handleAdd}>
        +
      </Button>
    </>
  );
}

export default RemoveButton;
