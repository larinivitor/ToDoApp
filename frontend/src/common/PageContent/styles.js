import styled from "styled-components";

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2.5rem 1rem;
`;

export const Content = styled.div`
  padding: 1rem 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  @media only screen and (max-width: 720px) {
    justify-content: center;
    flex-direction: column;
  }
`;
