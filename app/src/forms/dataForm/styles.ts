import styled from 'styled-components';

const Container = styled.div`
  background: unset;
  color: #fefefe;
`;

interface SectionProps {
  block: boolean;
  padding: string;
}

const Section = styled.section<SectionProps>`
  display: block;
  padding: ${(props) => (props.padding ? props.padding : 'unset')};
  > {
    display: ${(props) => (props.block ? 'block' : 'inline')};
  }
`;

export { Container, Section };
