import { Form, Formik, FormikValues } from 'formik';
import React from 'react';
import { Section, Container } from './styles';
import Button from '../../components/button';

function GraphControls<T extends FormikValues>(props: {
  children: React.ReactNode;
  cb: (values: any) => any;
  initialValues: T;
  columns: number;
}) {
  const { children, columns, initialValues, cb } = props;

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={cb}>
        {(form) => (
          <Form>
            <Container columns={columns}>
              <Section columns={columns} block={true} padding={'10px'}>
                {/* render form here */}
                {children}
              </Section>
              <Section columns={1} block={true} padding={'10px'}>
                {/* submit */}
                <Button width={'100%'} type="submit">
                  Submit
                </Button>
              </Section>
            </Container>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default GraphControls;
