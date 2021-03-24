import ChatRoom from "types/chat-room";
import ChatRoomActionTypes from "./chat-room.type";

export const setCurrentChatRoom = ( chatRoom:ChatRoom ) => ( {
  type: ChatRoomActionTypes.SET_CURRENT_CHAT_ROOM,
  payload: chatRoom
} );

export type ChatRoomAction = 
| ReturnType<typeof setCurrentChatRoom>