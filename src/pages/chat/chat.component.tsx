import React from 'react';
import styled from "styled-components";

import MainPanel from 'components/main/main-panel/main-panel.component';
import SidePanel from 'components/side/side-panel/side-panel.component';

function Chat() {
  return (
    <ChatContainer>
      <SidePanel/>
      <MainPanel/>
    </ChatContainer>
  );
}

const ChatContainer = styled.main`
  background-color:purple;
  font-size:1.5rem;

  height:100%;
  min-width:1080px;
  padding:20px;
  display:grid;
  grid-template-columns:300px 7fr;
  justify-content:center;
  margin:0 auto;
  
`;

export default Chat;
