import Loading from 'components/loading/loading.component';
import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import Message from 'types/message';
import myFirebase from 'utils/firebase/myFirebase';
import { useCurrentChatRoom } from 'utils/redux/reducers/chat-room/chat-room.hook';
import color from 'utils/style/color';
import MessageForm from '../message-form/message-form';
import MessageHeader from '../message-header/message-header';
import MessageSection from '../message-section/message-section';

function MainPanel() {

  const chatRoom = useCurrentChatRoom();
  const messageRef = useRef( myFirebase.database.ref( "messages" ) );
  const [ messages, setMessage ] =  useState<Message[]>( [] );
  const [ messageLoading, setMessageLoading ] = useState( true );

  useEffect( () => {
    if( chatRoom.currentChatRoom.id ){
      const messageList:Message[] = [];
      messageRef.current
        .child( chatRoom.currentChatRoom.id ).on( "child_added", ( snap ) => {
          messageList.push( snap.val() );
          setMessage( [ ...messageList ] );
          setMessageLoading( false );
        } );
    }
  }, [ chatRoom ] );

  const [ searchTerm, setSearchTerm ] = useState( "" );
  const [ searchResults, setSearchResult ] = useState<Message[]>( [] );
  const [ searchLoading, setSearchLoading ] = useState( false );

  const handleChangeSearch = ( e:React.ChangeEvent<HTMLInputElement> ) => {
    setSearchTerm( e.target.value );
    setSearchLoading( Boolean( e.target.value ) );
  };

  useEffect( () => {
    if( searchTerm ){
      const chatMessages = [ ...messages ];
      const regex = new RegExp( searchTerm, "gi" );
      const searchedMessage = chatMessages.reduce( ( acc, message ) => {
        if(
          message.content && 
          ( message.content.match( regex ) || message.user.name.match( regex ) )
        ){
          return [ ...acc, message ];
        }
        return acc;
      }, [] as Message[] );
      setSearchResult( searchedMessage );
      setSearchLoading( !searchedMessage.length );
    }
   
  }, [ searchTerm, messages ] );





  return (
    <MainPanelContainer>
      <MessageHeader onSearch={handleChangeSearch}/>
      <MessageSectionContainer>
        {searchLoading && <Loading />}
        {!searchLoading && <MessageSection messages={searchTerm ? searchResults : messages} messageLoading={messageLoading}/>}
      </MessageSectionContainer>
      <MessageForm/>
    </MainPanelContainer>
  );
}

const MainPanelContainer = styled.section`
    background-color:${color.darkBlue};
    padding:10px;
`;
const MessageSectionContainer = styled.div`
  border-radius:5px;
  height:550px;
  border:.2rem solid #ececec;
  padding:1rem;
  margin-bottom:1rem;
  overflow-y:auto;
`;

export default MainPanel;
