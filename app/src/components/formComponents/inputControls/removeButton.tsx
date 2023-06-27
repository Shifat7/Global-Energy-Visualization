import React from 'react';
import { FieldArrayRenderProps } from 'formik';
import Button from '../../../components/button';

interface Props {
  arrayHelpers: FieldArrayRenderProps;
  index: number;
}

function RemoveButton(props: Props) {
  const { arrayHelpers, index } = props;

  const handleRemove = () => {
    arrayHelpers.remove(index);
  };

  return (
    <>
      <Button type="button" onClick={handleRemove}>
        -
      </Button>
    </>
  );
}

export default RemoveButton;
