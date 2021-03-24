import React, { useRef, useState, useEffect } from 'react';
import { Accordion, Button, Card, FormControl, Image, InputGroup, Media } from 'react-bootstrap';
import { FaLock, FaUnlock } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { MessageHeaderContainer } from './message-header.styles';

import { useCurrentUser } from 'utils/redux/reducers/user/user.hook';
import { useCurrentChatRoom } from 'utils/redux/reducers/chat-room/chat-room.hook';
import myFirebase from 'utils/firebase/myFirebase';
import color from 'utils/style/color';

type MessageHeaderProps ={
  onSearch:( e:React.ChangeEvent<HTMLInputElement> ) => void;
  userPosts: {
    [key: string]: {
        image: string;
        count: number;
    };
  }
}

function MessageHeader( { onSearch, userPosts }:MessageHeaderProps ) {

  const user = useCurrentUser();
  const chatRoom = useCurrentChatRoom();
  
  const usersRef = useRef( myFirebase.database.ref( "users" ) );
  const favoritRef = useRef( usersRef.current.child( user?.uid as string ).child( "favorit" ) );
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
    favoritRef.current
      .once( "value" )
      .then( ( snap ) => {
        if( snap.val() !== null ){
          const favoritIds = Object.keys( snap.val() );
          const findFavoritId = favoritIds.indexOf( chatRoom.currentChatRoom.id );
          if( findFavoritId !== -1 ){
            setIsFavorit( true );
          }else{
            setIsFavorit( false );
          }
        }
      } );
  
  }, [ chatRoom ] );

  useEffect( () => {
    return () => {
      favoritRef.current.off();
    };
  }, [  ] );

  const renderUser = () => {
    return Object
      .entries( userPosts )
      .sort( ( a, b ) => b[ 1 ].count - a[ 1 ].count )
      .map( ( [ key, val ], i ) => (
        <Media key={i} style={{ marginBottom: "20px" }}>
          <Image src={val.image} roundedCircle width={32}height={32} className="mr-3"/>
          <Media.Body style={{ fontSize: "1rem", color: color.brown, display: 'flex', marginTop: "0.5rem" }}>
            <h6>{key}</h6>
            <p>({val.count} 개)</p>
          </Media.Body>
        </Media>
      ) );
  };

  return (
    <MessageHeaderContainer>
      <h2>{chatRoom.isPrivate ? <FaLock/> : <FaUnlock/>}  <span>Room:  {chatRoom.currentChatRoom.name}</span> <span onClick={chatRoom.isPrivate ? () => {console.log( "" );} : handleFavorit}>{isFavorit ? <BsHeartFill/> : <BsHeart/>}</span></h2>
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
              Description
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div style={{ color: color.brown }}>{chatRoom.currentChatRoom.description}</div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Accordion>
        <Card>
          <Card.Header style={{ padding: '0 1rem' }}>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              User Posts
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{userPosts && renderUser()}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </MessageHeaderContainer>
  );
}


export default MessageHeader;
