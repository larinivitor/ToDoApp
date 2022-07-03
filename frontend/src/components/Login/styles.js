import styled from "styled-components";

export const Container = styled.form`
  h1 {
    color: #212121;
    margin-bottom: 3rem;
    text-align: center;
  }

  div {
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
