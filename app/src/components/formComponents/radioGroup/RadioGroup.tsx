import React from 'react';
import { Field, FieldProps } from 'formik';
import { Container } from './styles';

interface Props extends FieldProps {
  // custom props that can be passed in from the formik Field
  name: string;
  showLabel: boolean;
  label: string;
  textColor: string;
  defaultChecked: boolean;
}

function RadioGroup(props: Props) {
  const { textColor } = props;

  return (
    <Container textColor={textColor}>
      <div role={'group'}>
        <div>
          <label>
            <Field type="radio" name="sort" value="ascending" />
            Ascending
          </label>
        </div>
        <div>
          <label>
            <Field type="radio" name="sort" value="descending" />
            Descending
          </label>
        </div>
      </div>
    </Container>
  );
}

export default RadioGroup;
