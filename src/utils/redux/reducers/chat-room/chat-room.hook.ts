import { useDispatch, useSelector } from "react-redux";
import { setChatRoomPrivate, setCurrentChatRoom } from "./chat-room.action";

import ChatRoom from "types/chat-room";
import { RootState } from "utils/redux/reducers/root";


export const useSetCurrentChatRoom = () => {
  const dispatch = useDispatch();
  return ( chatRoom:ChatRoom ) => dispatch( setCurrentChatRoom( chatRoom ) );
};

export const useCurrentChatRoom = () => useSelector( ( state:RootState ) => state.chatRoom );

export const useSetPrivateChatRoom = () => {
  const dispatch = useDispatch();
  return ( isPrivate:boolean ) => dispatch( setChatRoomPrivate( isPrivate ) );
};