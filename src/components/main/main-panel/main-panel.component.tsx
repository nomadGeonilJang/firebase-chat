import React, { useEffect,  useState } from 'react';
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

  const [ messages, setMessage ] =  useState<Message[]>( [] );
  const [ messageLoading, setMessageLoading ] = useState( true );
  const [ searchTerm, setSearchTerm ] = useState( "" );
  const [ searchResults, setSearchResult ] = useState<Message[]>( [] );
  const [ searchLoading, setSearchLoading ] = useState( false );

  const [ userPosts, setUserPosts ] = useState<{[key:string]:{
    image:string;
    count:number;
  }}>( {} );


  useEffect( () => {
    if( chatRoom.currentChatRoom.id && messages.length === 0 ){
      setTimeout( () => {
        setMessageLoading( false );
      }, 2000 );
    }
  }, [ messages ] );

  const userPostCount = ( messageList:Message[] ) => {
    const userPosts = messageList.reduce( ( acc, message ) => {
      if( message.user.name in acc ){
        acc[ message.user.name ].count += 1;
      }else{
        acc[ message.user.name ] = {
          image: message.user.image,
          count: 1
        };
      }
      return acc;
    }, {} as any );

    setUserPosts( userPosts );
  };
 
  useEffect( () => {
    if( chatRoom.currentChatRoom.id ){
      const messageList:Message[] = [];
      const messageRef = myFirebase.database.ref( "messages" ).child( chatRoom.currentChatRoom.id );

      messageRef.on( "child_added", ( snap ) => {
        messageList.push( snap.val() );
        setMessage( [ ...messageList ] );
        setMessageLoading( false );
        userPostCount( [ ...messageList ] );
      } );
      
      return () => {
        messageRef.off();  
      };
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
      <MessageHeader onSearch={handleChangeSearch} userPosts={userPosts}/>
      <MessageSectionContainer>
        {searchLoading && <Loading />}
        {!searchLoading && <MessageSection messages={searchTerm ? searchResults : messages} messageLoading={messageLoading}/>}
      </MessageSectionContainer>
      <MessageForm/>
    </MainPanelContainer>
  );
}


export default MainPanel;
