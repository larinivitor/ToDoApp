import styled from "styled-components";

export const Container = styled.div`
  width: 15.5575rem;
  height: 9.3075rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.625rem;
  border: 0.0625rem dotted var(--text-body);

  background: none;
  transition: filter 0.2s;
  margin: 0.4rem 0.4rem;

  &:hover {
    cursor: pointer;
  }

`;
