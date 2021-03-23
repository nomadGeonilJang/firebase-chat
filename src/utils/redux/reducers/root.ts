import { combineReducers } from "redux";
import user from "utils/redux/reducers/user/user.reducer";

const rootReducer = combineReducers( { user } );
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
