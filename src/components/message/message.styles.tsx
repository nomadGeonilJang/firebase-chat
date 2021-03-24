import styled from "styled-components";
import color from 'utils/style/color';
import { Media } from 'react-bootstrap';


export const MessageMedia = styled( Media )`
margin-bottom:10px;
color:white;
img{
    border-radius:10px;
    width:48px;
    height:48px;
    margin-right:10px;
}
h6{
    font-size:1.2rem;
    margin-bottom:5px;
}
span{
    margin-left:5px;
    font-size:1.1rem;
}
p{
    padding:5px;
    background-color:gray;
    border-radius:5px;
}
p.me{
    background-color:${color.yellow};
    color:${color.brown};
}
img.content-image{
  width:100%;
  height:100%;
  max-width:300px;
  max-height:900px;
}
`;