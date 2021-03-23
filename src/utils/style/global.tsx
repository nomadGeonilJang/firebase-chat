import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    ${reset};
    *{
        box-sizing:border-box;
    }
    html{
        height:100%;
    }
  
    body{
        height:100%;
     
        font-size:12px;
        font-family: 'Noto Sans KR', sans-serif;
        
        min-width:1080px;
        overflow:auto;
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