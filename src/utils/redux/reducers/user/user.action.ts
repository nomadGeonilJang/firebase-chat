import  UserActionTypes from "utils/redux/reducers/user/user.type";
import { User } from "types/user";

export const setCurrentUser = ( user:User ) => ( {
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
} );

export const clearUser = () => ( {
  type: UserActionTypes.CLEAR_USER,
} );

export const setPhotoURL = ( url:string ) => ( {
  type: UserActionTypes.SET_PHOTO_URL,
  payload: url
} );


export type UserAction = 
| ReturnType<typeof setCurrentUser>
| ReturnType<typeof clearUser>
| ReturnType<typeof setPhotoURL>