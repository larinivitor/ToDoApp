import styled from "styled-components";

export const Container = styled.form`
  padding: 2rem;
  width: 30%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: #212121;
    margin-bottom: 3rem;
  }

  div#actions {
    width: 100%;
    padding: 1rem 0;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  button[type="submit"] {
    color: #fff;
    background: #2D9CDB;
  }
`;
