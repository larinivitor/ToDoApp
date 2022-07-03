import styled from "styled-components";

export const TaskContainer = styled.div`
  height: 5rem;
  width: 100%;
  border-radius: 0.3125rem;

  padding: 1rem;

  background: #fff;

  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    padding: 1rem;
    font-weight: 200;

    color: var(--text-title);
  }

  .task-body {
    align-items: center;
    display: flex;
  }

  .task-header {
    display: flex;
    align-items: center;

    h3 {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 30rem;

      text-decoration: ${(props) => (props.finished ? "line-through" : "none")};

      @media only screen and (max-width: 720px) {
        white-space: normal;
      }
    }

    button {
      background: transparent;

      display: flex;
      align-items: center;
    }

    img {
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }
`;
