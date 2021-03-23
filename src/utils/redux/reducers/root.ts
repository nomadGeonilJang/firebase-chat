import { combineReducers } from "redux";
import user from "utils/redux/reducers/user/user.reducer";
import chatRoom from "utils/redux/reducers/chat-room/chat-room.reducer";

const rootReducer = combineReducers( { user, chatRoom } );
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
