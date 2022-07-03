import styled from "styled-components";

export const Container = styled.header`
  background: #3c434a;
  height: 70px;
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1{
    color: #fff
  }
  
  button {
    color: #fff;
    background: #2D9CDB;
    margin-top:10px
  }
`;
