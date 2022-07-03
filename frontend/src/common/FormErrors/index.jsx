import { ErrorsContainer } from "./style";

export const FormErrors = ({ errors }) => {
  return (
    <ErrorsContainer>
      {!!errors.length && errors.map((error, i) => <h5 key={i}>{error}</h5>)}
    </ErrorsContainer>
  );
};
