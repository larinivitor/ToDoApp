import styled from "styled-components";

export const Container = styled.div`
  width: 15.62rem;
  height: 9.37rem;

  border-radius: 0.625rem;

  padding: 1rem 1rem;
  margin: 0.4rem 0.4rem;

  background: #ffff;

  &:hover {
    cursor: pointer;
  }

  h3 {
    color: var(--text-title);
    padding: 1rem 0rem;
  }
`;

export const ProjectHeader = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
`;
