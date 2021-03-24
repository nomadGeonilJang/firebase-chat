import styled from "styled-components";

export const MessageHeaderContainer = styled.header`
color:white;
height:180px;
border:.2rem solid #ececec;
border-radius:5px;
padding:1rem;
margin-bottom:1rem;

display:grid;
grid-template-columns:repeat(2, 1fr);
grid-template-rows:repeat(3, 1fr);
grid-gap:5px;

.user-content{
  img{
    width:32px;
    height:32px;
    margin-right:10px;
  }
  p{
    display:flex;
    align-items:center;
    justify-content:flex-end;

  }
}

h2{
  display:flex;
  align-items:center;
  span{
    margin-left:10px;
    display:flex;
    align-items:center;
    padding-top:1rem;
  }
}
`;