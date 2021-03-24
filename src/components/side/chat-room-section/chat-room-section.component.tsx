import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { ChatRoomSectionContainer, CreateModal } from './chat-room-section.styles';

import { useCurrentChatRoom, useSetCurrentChatRoom, useSetPrivateChatRoom } from 'utils/redux/reducers/chat-room/chat-room.hook';
import { useCurrentUser } from 'utils/redux/reducers/user/user.hook';
import myFirebase from 'utils/firebase/myFirebase';
import ChatRoom from 'types/chat-room';

function ChatRoomSection() {

  const user = useCurrentUser();
  const { currentChatRoom  } = useCurrentChatRoom();
  const setCurrentChatRoom = useSetCurrentChatRoom();
  const setPrivateChatRoom = useSetPrivateChatRoom();

  const [ show, setShow ] = useState( false );
  const [ { name, description }, setRoomState ] = useState( INIT_ROOM_STATE );
  const [ chatRooms, setChatRooms ] = useState<ChatRoom[]>( [] );
  
  
  const handleChangeFormInput = ( e:React.ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = e.target;
    setRoomState( prev => ( { ...prev, [ name ]: value } ) );
  };

  const handleClose = () => setShow( false );
  const handleShow = () => setShow( true );

  const handleMakeNewRoom = async () => {
    setShow( false );
    const chatRoomRef = myFirebase.database.ref( "chatRooms" );
    const key = chatRoomRef.push().key!;
    const newChatRoomObj = {
      id: key,
      description,
      name,
      createdBy: {
        name: user!.displayName,
        image: user!.photoURL
      }
    };
    try {
      await chatRoomRef.child( key ).update( newChatRoomObj );
    } catch ( error ) {
      alert( error.message );
    }
    setRoomState( INIT_ROOM_STATE );
  };

  useEffect( () => {
    let isFirst = true;
    const  listener = myFirebase.database.ref( "chatRooms" );
    listener.on( "child_added", ( snapshot ) => {
      setChatRooms( prev => [ snapshot.val(), ...prev ] );
      
      if( isFirst && snapshot.exists ){
        isFirst = false;
        setCurrentChatRoom( snapshot.val() );
        setPrivateChatRoom( false );
      }
    } );
    return () => {
      listener.off();
    };
  }, [] );

  const handleOpenChat = ( chatRoom:ChatRoom ) => {
    setCurrentChatRoom( chatRoom );
    setPrivateChatRoom( false );
  };

  const makeRoom = ( room:ChatRoom ) => (
    <li key={room.id} className={currentChatRoom.id === room.id ? "active" : ""} onClick={() => handleOpenChat( room )}>
      # {room.name}
    </li>
  );

  return (
    <>
      <ChatRoomSectionContainer>
        <header>
          <span><IoChatboxEllipsesOutline/> chat rooms</span>
          <FaPlus className="plus" onClick={handleShow}/>
        </header>
        <ul className="rooms">
          {chatRooms.map( makeRoom )}
        </ul>
      </ChatRoomSectionContainer>
      <CreateModal show={show} onHide={handleClose}>
        <CreateModal.Header closeButton>
          <CreateModal.Title>CREATE NEW CHAT</CreateModal.Title>
        </CreateModal.Header>
        <CreateModal.Body>
          <Form className="chat-form">
            <Form.Group controlId="formBasicEmail">
              <Form.Label >ROOM&apos;S NAME</Form.Label>
              <Form.Control value={name} name="name" onChange={handleChangeFormInput} type="text" placeholder="Enter a chat room's name" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="form-label">DESCRIPTION</Form.Label>
              <Form.Control value={description} name="description" onChange={handleChangeFormInput} type="text" placeholder="Enter a chat room's description" />
            </Form.Group>
          </Form>
        </CreateModal.Body>
        <CreateModal.Footer>
          <Button variant="none" className="cancel-btn" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="none" className="create-btn" onClick={handleMakeNewRoom}>
            CREATE
          </Button>
        </CreateModal.Footer>
      </CreateModal>
    </>
  );
}



const INIT_ROOM_STATE = {
  name: "",
  description: "",
}; 

export default ChatRoomSection;
