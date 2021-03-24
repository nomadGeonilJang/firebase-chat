import { UserAction } from "./user.action";
import UserActionTypes from "./user.type";

import { User } from "types/user";

type USER_STATE = {
    user:User | null
    isLoading:boolean
}
const INITIAL_USER_STATE:USER_STATE = { 
  user: null,
  isLoading: true
};

const userReducer = ( state:USER_STATE = INITIAL_USER_STATE, action:UserAction ) => {
  switch( action.type ){
  case UserActionTypes.SET_CURRENT_USER:
    return {
      ...state,
      user: action.payload,
      isLoading: false
    };
  case UserActionTypes.CLEAR_USER:
    return {
      ...state,
      user: null
    };
  case UserActionTypes.SET_PHOTO_URL:
    return {
      ...state,
      user: {
        ...state.user!,
        photoURL: action.payload
      }
    };
  default:
    return state;
  }
    
};

export default userReducer;