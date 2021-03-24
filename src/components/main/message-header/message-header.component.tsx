import React, { useRef, useState, useEffect } from 'react';
import { Accordion, Button, Card, FormControl, Image, InputGroup } from 'react-bootstrap';
import { FaLock, FaUnlock } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { MessageHeaderContainer } from './message-header.styles';

import { useCurrentUser } from 'utils/redux/reducers/user/user.hook';
import { useCurrentChatRoom } from 'utils/redux/reducers/chat-room/chat-room.hook';
import myFirebase from 'utils/firebase/myFirebase';

type MessageHeaderProps ={
  onSearch:( e:React.ChangeEvent<HTMLInputElement> ) => void;
}

function MessageHeader( { onSearch }:MessageHeaderProps ) {

  const user = useCurrentUser();
  const chatRoom = useCurrentChatRoom();
  
  const usersRef = useRef( myFirebase.database.ref( "users" ) );
  const [ isFavorit, setIsFavorit ] = useState( false );

  const handleFavorit = () => {
    
    if( isFavorit ){
      usersRef.current
        .child( `${user?.uid}/favorit` )
        .child( chatRoom.currentChatRoom.id )
        .remove( err => {
          if( err !== null ){
            alert( err.message );
          }
        } );
      
    }else{
      usersRef.current
        .child( `${user?.uid}/favorit` )
        .update( {
          [ chatRoom.currentChatRoom.id ]: {
            name: chatRoom.currentChatRoom.name,
            description: chatRoom.currentChatRoom.description,
            createdBy: { ...chatRoom.currentChatRoom.createdBy },
          }
        } );
        
    }
    setIsFavorit( prev => !prev );
  };

  useEffect( () => {
    if( user ){
      usersRef.current
        .child( user?.uid )
        .child( "favorit" )
        .once( "value" )
        .then( snap => {
          if( snap.val() !== null ){
            const favoritIds = Object.keys( snap.val() );
            const findFavoritId = favoritIds.indexOf( chatRoom.currentChatRoom.id );
            if( findFavoritId !== -1 ){
              setIsFavorit( true );
            }
          }
        } );
    }
   
  }, [] );

  return (
    <MessageHeaderContainer>
      <h2>{chatRoom.isPrivate ? <FaLock/> : <FaUnlock/>}  <span>Room:  {chatRoom.currentChatRoom.name}</span> <span onClick={handleFavorit}>{isFavorit ? <BsHeartFill/> : <BsHeart/>}</span></h2>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1"><FcSearch/></InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          onChange={onSearch}
          placeholder="Search Message"
          aria-label="Search Message"
          aria-describedby="Message"
        />
      </InputGroup>
      <div></div>
      <div className="user-content">
        <p><Image roundedCircle src={user?.photoURL}/>{user?.displayName}</p>
      </div>
      <Accordion >
        <Card>
          <Card.Header style={{ padding: '0 1rem' }}>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Click me!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Accordion>
        <Card>
          <Card.Header style={{ padding: '0 1rem' }}>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Click me!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </MessageHeaderContainer>
  );
}


export default MessageHeader;
