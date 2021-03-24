
import React, { useRef, useEffect } from 'react';
import styled from "styled-components";

import Message from 'components/main/message-section/message/message.component';
import Loading from 'components/loading/loading.component';

import { default as MessageType } from 'types/message';

type MessageSectionType = {
  messages:MessageType[];
  messageLoading:boolean;
}
function MessageSection( { messages, messageLoading }:MessageSectionType ) {

  const scrollRef = useRef<HTMLDivElement>( null );

  useEffect( () => {
    if( scrollRef.current ){
      scrollRef.current.scrollIntoView( {
        behavior: "smooth"
      } );
    }
  }, [ messages ] );

  return (
    <MessageSectionContainer>
      {messageLoading ? <Loading/> : messages.map( message => <Message key={message.timestamp} message={message}/> )} 
      <div ref={scrollRef}/>  
    </MessageSectionContainer>
  );
}

const MessageSectionContainer = styled.section``;

export default MessageSection;
