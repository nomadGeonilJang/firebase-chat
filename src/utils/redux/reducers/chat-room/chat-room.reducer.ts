import ChatRoom from "types/chat-room";
import { ChatRoomAction } from "./chat-room.action";
import ChatRoomActionTypes from "./chat-room.type";


type CHAT_ROOM_STATE = {
    currentChatRoom:ChatRoom;
}
const INITIAL_CHAT_ROOM_STATE = {
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
      currentChatRoom: action.payload
    };
  default :
    return state;
  }
};

export default chatRoomReducer;