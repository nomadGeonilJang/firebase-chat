import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    ${reset};
    html{
        height:100%;
    }
    *{
        box-sizing:border-box;
    }
    body{
        height:100%;
        padding: 20px 60px;
        font-size:12px;
        font-family: 'Noto Sans KR', sans-serif;
        
        @media screen and (max-width: 800px){
            padding:10px;
        }
    }
    
    a{
        text-decoration: none;
        color:black;
    }
    a:hover{
        color:#ccc;
    }
    h2{
        font-size:32px;
        font-weight:bold;
    }
    #root{
        height:100%;
    }
  
`;

export default GlobalStyles;