import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  @keyframes wiggle {
    0% {transform: rotate(0deg);}
    10% {transform: rotate(-20deg);}
    20% {transform: rotate(0deg);}
    30% {transform: rotate(-20deg);}
    40% {transform: rotate(-10deg);}
    100% {transform: rotate(-10deg);}
  }
`;

export default GlobalStyle;
