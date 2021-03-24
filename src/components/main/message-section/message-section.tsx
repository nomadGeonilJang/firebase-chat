
import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { default as MessageType } from 'types/message';
import Message from 'components/message/message.component';
import myFirebase from 'utils/firebase/myFirebase';
import { useCurrentChatRoom } from 'utils/redux/reducers/chat-room/chat-room.hook';
import Loading from 'components/loading/loading.component';

function MessageSection() {
  const chatRoom = useCurrentChatRoom();
  const messageRef = useRef( myFirebase.database.ref( "messages" ) );
  const [ messages, setMessage ] =  useState<MessageType[]>( [] );
  const [   messageLoading, setMessageLoading ] = useState( true );

  useEffect( () => {
    if( chatRoom.currentChatRoom.id ){
      const messageList:MessageType[] = [];
      messageRef.current
        .child( chatRoom.currentChatRoom.id ).on( "child_added", ( snap ) => {
          messageList.push( snap.val() );
          setMessage( [ ...messageList ] );
          setMessageLoading( false );
        } );
    }
  }, [ chatRoom ] );

  return (
    <MessageSectionContainer>
      {messageLoading ? <Loading/> : messages.map( message => <Message key={message.timestamp} message={message}/> )}   
    </MessageSectionContainer>
  );
}

const MessageSectionContainer = styled.section`
    
`;

export default MessageSection;
