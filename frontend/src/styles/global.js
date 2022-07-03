import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root{
  --background:#F0F2F5;
  --shape:#FFFF;
  
  --text-title:#363F5F;
  --text-body:#969CB3;

}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html{
    @media (max-width:1080px){
      font-size: 93.75%; //15px
    }
    @media (max-width:720px){
      font-size:87.5%; //14px
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body,input,textarea,button{
    font-family: 'Poppins',sans-serif;
    font-weight: 400;
  }
  
  h1,h2,h3,h4,h5,h6,strong{
    font-weight: 600;

  }

  button{
    cursor:pointer;
    font-size: 1rem;
    border: 0;
    padding: 0 2rem;
    border-radius: 0.2rem;
    height: 3rem;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }

  [disabled]{
    cursor:not-allowed;
    opacity: 0.6;
  }

 
  input {
    width: 100%;
    padding: 0 0.5rem;
    height: 4rem;
    border-radius: 0.25rem;

    border: 1px #d7d7d7;
    background: #e7e9ee;

    font-size: 1rem;
    font-weight: 400;

    &::placeholder {
      color: var(--text-body);
    }

    & + input {
      margin-top: 1rem;
    }
  }

  .react-modal-overlay{
    background: rgba(0,0,0,0.5);
    
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  
  .react-modal-content{
    max-width: 576px;
    width: 100%;
    background: var(--background);
    padding: 3rem;
    position:relative;
    border-radius: 0.25rem;
  }
`;
