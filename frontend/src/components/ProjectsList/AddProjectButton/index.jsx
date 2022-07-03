import { Container } from "./styles";

export const AddProjectButton = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <h3>Add new project</h3>
    </Container>
  );
};
