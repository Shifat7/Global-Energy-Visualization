import styled from 'styled-components';

interface SectionProps {
  block: boolean;
  padding: string;
  columns: number;
}

const Section = styled.section<SectionProps>`
  display: grid;
  grid-template-columns: ${(props) => 'repeat(' + props.columns + ', 1fr)'};
  padding: ${(props) => (props.padding ? props.padding : 'unset')};
  > {
    display: ${(props) => (props.block ? 'block' : 'inline')};
  }
`;

interface ContainerProps {
  columns: number;
}

const Container = styled.div<ContainerProps>`
  background: #33595c;
  display: grid;
  border-radius: 5px;
  grid-template-rows: 1fr auto;
`;

export { Container, Section };
