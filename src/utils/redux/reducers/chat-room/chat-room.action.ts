import ChatRoom from "types/chat-room";
import ChatRoomActionTypes from "./chat-room.type";

export const setCurrentChatRoom = ( chatRoom:ChatRoom ) => ( {
  type: ChatRoomActionTypes.SET_CURRENT_CHAT_ROOM,
  payload: chatRoom
} );

export const setChatRoomPrivate = ( isPrivate:boolean ) => ( {
  type: ChatRoomActionTypes.SET_CHAT_ROOM_PRIVATE,
  payload: isPrivate
} );

export type ChatRoomAction = 
| ReturnType<typeof setCurrentChatRoom>
| ReturnType<typeof setChatRoomPrivate>