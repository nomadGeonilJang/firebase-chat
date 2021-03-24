import React from 'react';
import md5 from 'md5';
import { ChatContainer } from './chat.styles';

import MainPanel from 'components/main/main-panel/main-panel.component';
import SidePanel from 'components/side/side-panel/side-panel.component';

import { useCurrentChatRoom } from 'utils/redux/reducers/chat-room/chat-room.hook';


function Chat() {

  const chatRoom = useCurrentChatRoom();
  
  return (
    <ChatContainer>
      <SidePanel key={md5( "SidePanel" )}/>
      <MainPanel key={chatRoom.currentChatRoom.id}/>
    </ChatContainer>
  );
}


export default Chat;
