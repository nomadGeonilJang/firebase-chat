import React, { useState, useEffect, useRef } from 'react';
import firebase from "firebase";
import { Badge, Button, Form } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

import { ChatRoomSectionContainer, CreateModal } from './chat-room-section.styles';

import { useCurrentChatRoom, useSetCurrentChatRoom, useSetPrivateChatRoom } from 'utils/redux/reducers/chat-room/chat-room.hook';
import { useCurrentUser } from 'utils/redux/reducers/user/user.hook';
import myFirebase from 'utils/firebase/myFirebase';
import ChatRoom from 'types/chat-room';


type Notification = {
  id:string;
  total:number;
  lastKnownTotal:number;
  count:number;
}

function ChatRoomSection() {

  const user = useCurrentUser();
  const { currentChatRoom } = useCurrentChatRoom();
  const setCurrentChatRoom = useSetCurrentChatRoom();
  const setPrivateChatRoom = useSetPrivateChatRoom();

  const chatRoomRef = useRef( myFirebase.database.ref( "chatRooms" ) );
  const messagesRef = useRef( myFirebase.database.ref( "messages" ) );
  const chatRoomIdListRef = useRef<string[]>( [] );

  const [ { name, description }, setRoomState ] = useState( INIT_ROOM_STATE );
  const [ chatRooms, setChatRooms ] = useState<ChatRoom[]>( [] );
  const [ show, setShow ] = useState( false );
  const [ isFirst, setIsFirst ] = useState( true );
  const [ notifications, setNotifications ] = useState<Notification[]>( [] );
  
  
  const handleChangeFormInput = ( e:React.ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = e.target;
    setRoomState( prev => ( { ...prev, [ name ]: value } ) );
  };


  const handleMakeNewRoom = async () => {
    setShow( false );
    const key = chatRoomRef.current.push().key!;
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
      await chatRoomRef.current.child( key ).update( newChatRoomObj );
    } catch ( error ) {
      alert( error.message );
    }
    setRoomState( INIT_ROOM_STATE );
  };
  
  useEffect( () => {
    chatRoomIdListRef.current.forEach( chatRoomId => {
      messagesRef.current.child( chatRoomId ).on( "value", ( snap ) => {
        if( currentChatRoom.id ){
          setNotifications( handleNotification( chatRoomId, currentChatRoom.id, notifications, snap ) );
        }
      } );
    } );

  }, [ currentChatRoom ] );


  useEffect( () => {
    chatRoomRef.current
      .on( "child_added", ( snapshot ) => {
        setChatRooms( prev => {
          const loaded = [ ...prev ];
          const addedChatRoom = snapshot.val();
          const index = loaded.findIndex( room => room.id === addedChatRoom.id );
          if( index < 0 ){
            loaded.push( addedChatRoom );
          }
          return [ ...loaded ];
        } );
        chatRoomIdListRef.current.push( String( snapshot.key ) );
        if( isFirst && snapshot.exists ){
          setIsFirst( false );
          setCurrentChatRoom( snapshot.val() );
          setPrivateChatRoom( false );
        }
      } );
    return () => {
      chatRoomRef.current.off();
    };
  }, [  ] );

  useEffect( () => {
    return () => {
      chatRooms.forEach( chatRoom => messagesRef.current.child( chatRoom.id ).off() );
    };
  }, [ chatRooms ] );

  const handleOpenChat = ( chatRoom:ChatRoom ) => {
    setCurrentChatRoom( chatRoom );
    setPrivateChatRoom( false );
    clearNotification( notifications, chatRoom );
  };

  

  const makeRoom = ( room:ChatRoom ) => {
    const count = getNotificationCount( notifications, room );
    return (
      <li key={room.id} className={currentChatRoom.id === room.id ? "active" : ""} onClick={() => handleOpenChat( room )}>
        <div className="dm-left">
          # {room.name}
        </div>
        <div className="dm-right">
          {Boolean( count ) && <Badge variant="danger" style={{ paddingTop: "0.3rem" }}>{count}</Badge>}
        </div>
      </li>
    );
  };

  return (
    <>
      <ChatRoomSectionContainer>
        <header>
          <span><IoChatboxEllipsesOutline/> chat rooms</span>
          <FaPlus className="plus" onClick={() => setShow( true )}/>
        </header>
        <ul className="rooms">
          {chatRooms.map( makeRoom )}
        </ul>
      </ChatRoomSectionContainer>
      <CreateModal show={show} onHide={() => setShow( false )}>
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
          <Button variant="none" className="cancel-btn" onClick={() => setShow( false )}>
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

const clearNotification = ( notifications:Notification[], room:ChatRoom ) => {
  const index = notifications.findIndex( noti => noti.id === room.id );
  const updatedNotifications = [ ...notifications ];
  if( index > -1 ){
    const currentNotification = updatedNotifications[ index ];
    updatedNotifications[ index ].lastKnownTotal = currentNotification.total;
    updatedNotifications[ index ].count = 0;
  }
  return updatedNotifications;
};
const getNotificationCount = ( notifications:Notification[], room:ChatRoom ) => {
  let count = 0;
  const myNotificaction = notifications.find( noti => noti.id === room.id );
  if( myNotificaction ){
    count = myNotificaction.count;
  }
  return count;
};
const handleNotification = ( 
  chatRoomId:string, 
  currentChatRoomId:string,
  notifications:Notification[],
  snapshot:firebase.database.DataSnapshot
) => {
  const index = notifications.findIndex( notification => chatRoomId === notification.id );
  let lastTotal = 0;
  if( index < 0 ){
    notifications.push( {
      id: chatRoomId,
      total: snapshot.numChildren(),
      lastKnownTotal: snapshot.numChildren(),
      count: 0
    } );
  }else{
    if( chatRoomId !== currentChatRoomId ){
      lastTotal = notifications[ index ].lastKnownTotal;

      if( snapshot.numChildren() - lastTotal > 0 ){
        notifications[ index ].count = snapshot.numChildren() - lastTotal;
      }

    }
    notifications[ index ].total = snapshot.numChildren();
  }
  return [ ...notifications ];
};



const INIT_ROOM_STATE = {
  name: "",
  description: "",
}; 

export default ChatRoomSection;
