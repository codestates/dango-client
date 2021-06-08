import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import './App.css';

const GlobalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    body{
        padding:0;
        font-size: 1rem; // 16px
        font-family: 'Noto Sans KR', sans-serif;
    }
    
`;

export default GlobalStyles;
