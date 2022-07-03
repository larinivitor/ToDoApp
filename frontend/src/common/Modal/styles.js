import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 1rem;
  }

  h3 {
    font-weight: 400;
    color: var(--text-body);

    margin-top: 1rem;
  }
`;

export const ModalOptions = styled.div`
  width: 100%;
  margin-top: 1rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  button[type="submit"] {
    background: #2D9CDB;
    color: #ffff;
  }
`;
