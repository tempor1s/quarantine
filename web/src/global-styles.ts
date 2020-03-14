import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        // font-family: Arial, Helvetica, sans-serif !important;
        font-family: 'Oswald', sans-serif;
        transition: all 0.3s ease 0s;
    }

    button{
        border-top: none;
        border: none;
    }

    .vanta-canvas{
        width: 100% !important;
    }
`;

