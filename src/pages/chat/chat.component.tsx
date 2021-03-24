import React from 'react';

import { ChatContainer } from './chat.styles';

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


export default Chat;
