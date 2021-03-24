import React, { useMemo } from 'react';
import { Badge, Image } from 'react-bootstrap';
import { DBUser } from 'types/user';
import styled from "styled-components";
import color from 'utils/style/color';
import { useCurrentUser } from 'utils/redux/reducers/user/user.hook';
import { useCurrentChatRoom, useSetCurrentChatRoom, useSetPrivateChatRoom } from 'utils/redux/reducers/chat-room/chat-room.hook';


type DirectMessageSectionItemProps = {
    userInfo:DBUser
}
function DirectMessageSectionItem( { userInfo }:DirectMessageSectionItemProps ) {

  const currentUser = useCurrentUser();
  const chatRoom = useCurrentChatRoom();
  const setCurrentChatRoom = useSetCurrentChatRoom();
  const setPrivateChatRoom = useSetPrivateChatRoom();

  const chatRoomId = useMemo( () => {
    const currentUserId = currentUser!.uid;
    const userId = userInfo.uid!;
    return userId > currentUserId 
      ? `${userId}/${currentUserId}` 
      : `${currentUserId}/${userId}`;
  }, [] );

  

  const handleChageChatRoom = () => {    
    const chatRoomInfo = {
      id: chatRoomId,
      name: userInfo.name
    };
    setCurrentChatRoom( chatRoomInfo );
    setPrivateChatRoom( true );
  };

  return (
    <li key={userInfo.uid} onClick={handleChageChatRoom} className={`${chatRoom.currentChatRoom.id === chatRoomId ? "active" : ""}`}>
      <div className="dm-left">
        <Image rounded src={userInfo.image}/>
        <Status status={userInfo.status as string} />
        {userInfo.name}
      </div>
      <div className="dm-right">
        {<Badge pill variant="danger">0</Badge>}
      </div>
    </li>
  );
}

const statusHelper = ( { status }:{status:string} ) => status === "offline" ? color.pink : color.green;

const Status = styled.div<{status:string}>`
  position:absolute;
  left:15px;
  top:15px;
  width:10px;
  height:10px;
  background-color:${statusHelper};
  border-radius:50%;
`;


// const makeDirectRoom = ( user:DBUser ) => {

//     const makeChatRoomId = ( userId:string ) => {
//       const currentUserId = user.uid!;
//       return userId > currentUserId ? `${userId}/${currentUserId}` : `${currentUserId}/${userId}`;
//     };

//     const changeChatRoom = ( user:DBUser ) => {
//       const chatRoomId = makeChatRoomId( user.uid! );
//     };
    
//     return (
//       <li key={user.uid} onClick={() => {changeChatRoom( user );}}>
//         <div className="dm-left">
//           <Image rounded src={user.image}/>
//           <Status status={user.status as string} />
//           {user.name}
//         </div>
//         <div className="dm-right">
//           {<Badge pill variant="danger">0</Badge>}
//         </div>
//       </li>
//     );
//   };


export default DirectMessageSectionItem;
