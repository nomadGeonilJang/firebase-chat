import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import { GiSupersonicBullet } from 'react-icons/gi';
import { DBUser } from 'types/user';
import myFirebase from 'utils/firebase/myFirebase';
import { useCurrentUser } from 'utils/redux/reducers/user/user.hook';
import color from 'utils/style/color';
import DirectMessageSectionItem from './direct-message-section-item/direct-message-section-item.component';

function DirectMessageSection() {

  const user = useCurrentUser();

  const userRef = useRef( myFirebase.database.ref( "users" ) );
  const [ userList, setUserList ] = useState<DBUser[]>( [] );
  
  useEffect( () => {
    if( user ){
      userRef.current.on( "child_added", ( snap ) => {
        const userInfo = snap.val() as DBUser;
        userInfo[ "uid" ] = snap.key as string;
        userInfo[ "status" ] = 'offline';
        if( userInfo.name !== user?.displayName ){
          setUserList( prev => [ userInfo, ...prev ] );
        }
      } );
    }
    return () => {
      setUserList( [] );
      userRef.current.off();
    };
  }, [] );
  
 
  return (
    <DirectMessageSectionContainer>
      <header>
        <GiSupersonicBullet/>
        <span>direct messages</span>
      </header>
      <ul className="rooms">
        {userList.map( userInfo => <DirectMessageSectionItem key={userInfo.uid} userInfo={userInfo}/> )}
      </ul>
    </DirectMessageSectionContainer>
  );
}




const DirectMessageSectionContainer = styled.section`
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

export default DirectMessageSection;
