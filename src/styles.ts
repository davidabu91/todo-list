import { createGlobalStyle } from "styled-components";

export const colors = {
    primary: '#a346ff',
};

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    
    body {
        background: #ead5ff;
        color: #260334
    }

    body, input {
        font-family: 'Roboto', sans-serif;
    }
`;