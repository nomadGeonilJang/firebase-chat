import React, { useEffect, useState } from 'react';
import { BsHeartFill } from 'react-icons/bs';
import styled from "styled-components";
import ChatRoom from 'types/chat-room';
import myFirebase from 'utils/firebase/myFirebase';
import { useCurrentChatRoom, useSetCurrentChatRoom, useSetPrivateChatRoom } from 'utils/redux/reducers/chat-room/chat-room.hook';
import { useCurrentUser } from 'utils/redux/reducers/user/user.hook';
import color from 'utils/style/color';

type FavoritRoom = {
  id:string;
  name:string;
  description:string;
  createdBy:{
    name:string;
    image:string;
  }
}
function FavoritSection() {

  const user = useCurrentUser();
  const setCurrentChatRoom = useSetCurrentChatRoom();
  const setPrivateChatRoom = useSetPrivateChatRoom();
  const { currentChatRoom } = useCurrentChatRoom();

  const [ favoritRooms, setFavoritRooms ] = useState<FavoritRoom[]>( [] );

  useEffect( () => {
    
    const usersRef = myFirebase.database.ref( "users" ).child( String( user?.uid ) ).child( "favorit" );
  
    usersRef
      .on( "child_added", ( snap ) => {
        const favoritChatRoom = { id: snap.key, ...snap.val() };
        setFavoritRooms( prev => [ ...prev, favoritChatRoom ] );
      } );

    usersRef
      .on( "child_removed", ( snap ) => {
        setFavoritRooms( prev => prev.filter( room => room.id !== snap.key ) );
      } );
    
    return () => {
      usersRef.off();
    };
  }, [ user ] );

  const handleOpenChat = ( chatRoom:ChatRoom ) => {
    setCurrentChatRoom( chatRoom );
    setPrivateChatRoom( false );
  };



  const makeRoom = ( room:ChatRoom ) => {
    return (
      <li key={room.id} className={currentChatRoom.id === room.id ? "active" : ""} onClick={() => handleOpenChat( room )}>
        <div className="dm-left">
          # {room.name}
        </div>
      </li>
    );
  };

  return (
    <FavoritSectionsContainer>
      <header>
        <BsHeartFill/>
        <span>Favorites</span>
      </header>
      <ul className="rooms">
        {favoritRooms.map( makeRoom )}
      </ul>
    </FavoritSectionsContainer>
  );
}

const FavoritSectionsContainer = styled.section`
header{
  display:flex;
  align-items:center;
  text-transform:uppercase; 
  padding-top:1rem;
  font-weight:bold;
  span{
    padding-top:0.3rem;
    display:flex;
    align-items:center;
    margin-left:5px;
  }
}
.rooms{
  font-size:1.1rem;
  padding-left:10px;
  li{
    display:flex;
    align-items:center;
    justify-content:space-between;
    border-radius:5px;
    padding:5px;
    cursor: pointer;

    .dm-left{
      display:flex;
      align-items:center;
      position:relative;
      img{
        margin-right:5px;
        width:20px;
        height:20px;
      }
    }
    &:hover{
      opacity:0.8;
    }
  }
  li.active{
    font-weight:bold;
    background-color:${color.yellow};
    color:${color.brown};
  } 
}
`;



export default FavoritSection;
