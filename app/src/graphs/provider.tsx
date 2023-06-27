import React, { useState } from 'react';
import { IForm } from '../interfaces/form.interface';
import { Container } from './styles';

type DataPath = { path: string; queryParams: string[] };
interface Props {
  form: React.FC<IForm>;
  render: React.FC<any>;
  controls: React.FC<any>;
  dataPath: DataPath;
  dimensions: {
    width: number;
    height: number;
    margin: {
      left: number;
      top: number;
      bottom: number;
      right: number;
    };
  };
  handleCallback: (props: { dataPath: DataPath; formValues: any }) => Promise<any>;
}

function Provider(props: Props) {
  const { controls: Controls, form: Form, render: Render, handleCallback, dimensions } = props;

  const [data, setData] = useState<any>([]);
  const [formData, setFormData] = useState<any>({});
  const [formControls, setFormControls] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);

  return (
    <Container>
      {/* ===== render the graph here */}
      {/* eslint-disable-next-line multiline-ternary */}
      {submitted ? (
        <Render
          formControls={formControls} // pass the formControls to the graph
          data={data} // pass the data to the graph
          formData={formData} // pass the form data to the graph
          dimensions={dimensions} // pass the dimensions to the graph
        />
      ) : (
        <div></div>
      )}
      {/* ===== render the form here */}
      <Form
        cb={async (formValues) => {
          // call the provider's callback with the forms values
          const fetchedData = await handleCallback({
            dataPath: props.dataPath,
            formValues: formValues
          });
          setData(fetchedData);
          setFormData({ ...formValues });
          setSubmitted(true);
        }}
      />
      {/* ===== render the controls for the graph here */}
      <Controls
        formData={formData}
        // when the controls are updated, update the provider formControls
        cb={(controls: any) => {
          setFormControls(controls);
        }}
      />
    </Container>
  );
}

export default Provider;
