
import styled from "styled-components";
import color from 'utils/style/color';

export const LoadingContainer = styled.section`
background-color:${color.darkBlue};
height:100%;
width:100%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
h2{
    margin-bottom:20px;
    color:white;
    text-transform:uppercase;
    letter-spacing:1.1rem;
}
.ball{
    margin:5px;
    width:20px;
    height:20px;
    
}

`; 