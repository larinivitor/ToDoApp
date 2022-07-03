import { useHistory } from "react-router-dom";

import { Container } from "./styles";
import { PublicPages } from "src/common/PublicPages";

export const NotFound = () => {
  const history = useHistory();

  return (
    <PublicPages>
      <Container>
        <h1>404 - Page not found</h1>
        <button onClick={() => history.goBack()}>Back</button>
      </Container>
    </PublicPages>
  );
};
