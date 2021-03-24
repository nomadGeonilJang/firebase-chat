import React, { useEffect, useRef, useState } from 'react';
import { MainPanelContainer, MessageSectionContainer } from './main-panel.styles';

import Loading from 'components/loading/loading.component';
import MessageForm from 'components/main/message-form/message-form.component';
import MessageHeader from 'components/main/message-header/message-header.component';
import MessageSection from 'components/main/message-section/message-section';

import Message from 'types/message';
import myFirebase from 'utils/firebase/myFirebase';
import { useCurrentChatRoom } from 'utils/redux/reducers/chat-room/chat-room.hook';


function MainPanel() {

  const chatRoom = useCurrentChatRoom();

  const messageRef = useRef( myFirebase.database.ref( "messages" ) );

  const [ messages, setMessage ] =  useState<Message[]>( [] );
  const [ messageLoading, setMessageLoading ] = useState( true );
  const [ searchTerm, setSearchTerm ] = useState( "" );
  const [ searchResults, setSearchResult ] = useState<Message[]>( [] );
  const [ searchLoading, setSearchLoading ] = useState( false );


  useEffect( () => {
    if( chatRoom.currentChatRoom.id && messages.length === 0 ){
      setTimeout( () => {
        setMessageLoading( false );
      }, 2000 );
    }
  }, [ messages ] );
 
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


export default MainPanel;
