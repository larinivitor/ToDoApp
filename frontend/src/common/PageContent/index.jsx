import { Container, Content } from "./styles";

export const PageContent = ({ children }) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};
