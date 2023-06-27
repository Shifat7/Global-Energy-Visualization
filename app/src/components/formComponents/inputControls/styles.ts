import styled from 'styled-components';

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(auto, 30px);
  margin: 5px 0px;

  select {
    width: 90%;
    background: #8fb8de;
    border: none;
    border-radius: 5px;
  }
`;

export { Row };
