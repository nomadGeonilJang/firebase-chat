import { useDispatch, useSelector } from "react-redux";
import ChatRoom from "types/chat-room";
import { RootState } from "../root";
import { setCurrentChatRoom } from "./chat-room.action";

export const useSetCurrentChatRoom = () => {
  const dispatch = useDispatch();
  return ( chatRoom:ChatRoom ) => dispatch( setCurrentChatRoom( chatRoom ) );
};
export const useCurrentChatRoom = () => useSelector( ( state:RootState ) => state.chatRoom );