import { Container, Content } from "./styles";

import { useHistory } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";

export const Header = () => {
  const { deleteUserAuth } = useAuth();
  const history = useHistory();

  const logout = () => {
    deleteUserAuth();
    history.push("/login");
  };

  return (
    <Container>
      <Content>
        <h1>ToDo App</h1>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </Content>
    </Container>
  );
};
