import React from 'react';
import Navigation from '../../components/navigation';
import { Container } from './index.styles';

function home() {
  return (
    <>
      <Navigation />
      <Container>
        <h1>Home</h1>
      </Container>
    </>
  );
}

export default home;
