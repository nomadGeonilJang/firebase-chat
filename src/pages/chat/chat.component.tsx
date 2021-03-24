import React from 'react';
import styled from "styled-components";

import MainPanel from 'components/main/main-panel/main-panel.component';
import SidePanel from 'components/side/side-panel/side-panel.component';
import color from 'utils/style/color';
import md5 from 'md5';
import { useCurrentChatRoom } from 'utils/redux/reducers/chat-room/chat-room.hook';
import myFirebase from 'utils/firebase/myFirebase';

function Chat() {

  const chatRoom = useCurrentChatRoom();


  React.useEffect( () => {
    myFirebase.database.ref( "users" ).on( "child_added", ( snap ) => {
      console.log( snap.val() );
      
    } );
      
    


  }, [] );


  return (
    <ChatContainer>
      <SidePanel key={md5( "SidePanel" )}/>
      <MainPanel key={chatRoom.currentChatRoom.id}/>
    </ChatContainer>
  );
}

const ChatContainer = styled.main`
  background-color:${color.darkBlue};
  font-size:1.5rem;
  height:100%;
  min-width:1080px;

  display:grid;
  grid-template-columns:300px 7fr;
  justify-content:center;
  margin:0 auto;
  
`;

export default Chat;
