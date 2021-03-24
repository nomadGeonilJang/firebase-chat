import ChatRoom from "types/chat-room";
import { ChatRoomAction } from "./chat-room.action";
import ChatRoomActionTypes from "./chat-room.type";


type CHAT_ROOM_STATE = {
    currentChatRoom:ChatRoom;
    isPrivate:boolean;
}

const INITIAL_CHAT_ROOM_STATE = {
  isPrivate: false,
  currentChatRoom: {
    id: "",
    description: "",
    name: "",
    createdBy: {
      name: "",
      image: "",
    }
  }
};


const chatRoomReducer = ( state:CHAT_ROOM_STATE = INITIAL_CHAT_ROOM_STATE, action:ChatRoomAction ) => {
  switch( action.type ){
  case ChatRoomActionTypes.SET_CURRENT_CHAT_ROOM:
    return {
      ...state,
      currentChatRoom: action.payload,
    };
  case ChatRoomActionTypes.SET_CHAT_ROOM_PRIVATE:
    return {
      ...state,
      isPrivate: action.payload
    };
  
  default :
    return state;
  }
};

export default chatRoomReducer;