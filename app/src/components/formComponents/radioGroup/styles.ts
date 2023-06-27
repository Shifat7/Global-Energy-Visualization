import styled from 'styled-components';

interface ContainerProps {
  textColor: string;
}

const Container = styled.section<ContainerProps>`
  color: ${(props) => (props.textColor ? props.textColor : 'red')};
`;

const Input = styled.input`
  padding: 5px;
`;

const Label = styled.span`
  padding: 5px;
`;

export { Container, Input, Label };
