import styled from "styled-components";
import color from 'utils/style/color';


export const MessageContainer = styled.section`
  textarea{
    resize:none;
  }
  .error-text{
    padding-top:10px;
    color:red;
  }
  .loading-container{
    margin:10px 0;
    height:17px;
  }
  .loading{
    height:17px;
  }

  .button-group{

    display:grid;
    grid-template-columns:repeat(2, 1fr);
    grid-gap:5px;

    button{
      cursor: pointer;
      border-radius:5px;
      color:white;
      text-transform:uppercase;
      border:none;
      padding:20px;
      font-size:2rem;
      font-weight:200;
      letter-spacing:10px;
      background-color:${color.brown};
    }
    button:hover{
      opacity:0.8
    }
    button:active{
      opacity:1
    }
    button:disabled{
      background-color:gray;
    }
    button:disabled:hover{
      opacity:1;
      cursor: not-allowed;
    }
  }
  input[type=file]{
    display:none;
  }
`;