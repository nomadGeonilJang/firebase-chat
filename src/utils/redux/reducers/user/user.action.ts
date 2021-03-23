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

// export const googleSignInRequest = () => ( {
//   type: UserActionTypes.GOOGLE_SIGN_IN_REQUEST
// } ); 

// export const emailSignInRequest = ( emailAndPassword:{email:string, password:string} ) => ( {
//   type: UserActionTypes.EMAIL_SIGN_IN_REQUEST,
//   payload: emailAndPassword
// } ); 

// export const signInSuccess = ( user:User ) => ( {
//   type: UserActionTypes.SIGN_IN_SUCCESS,
//   payload: user
// } ); 

// export const signInFailure = ( error:Error ) => ( {
//   type: UserActionTypes.SIGN_IN_FAILURE,
//   payload: error
// } ); 

// export const checkUserSession = () => ( {
//   type: UserActionTypes.CHECK_USER_SESSION
// } );

// export const signOutStart  = () => ( {
//   type: UserActionTypes.SIGN_OUT_REQUEST
// } );

// export const signOutSuccess  = () => ( {
//   type: UserActionTypes.SIGN_OUT_SUCCESS
// } );

// export const signOutFailure  = ( error:Error ) => ( {
//   type: UserActionTypes.SIGN_OUT_FAILURE,
//   payload: error
// } );

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const signUpStart  = ( userCredentials:any ) => ( {
//   type: UserActionTypes.SIGN_UP_REQUEST,
//   payload: userCredentials
// } );
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const signUpSuccess  = ( { user, additionalData }:any ) => ( {
//   type: UserActionTypes.SIGN_UP_SUCCESS,
//   payload: { user, additionalData }
// } );

// export const signUpFailure  = ( error:Error ) => ( {
//   type: UserActionTypes.SIGN_UP_FAILURE,
//   payload: error
// } );


export type UserAction = 
| ReturnType<typeof setCurrentUser>
| ReturnType<typeof clearUser>
| ReturnType<typeof setPhotoURL>
// | ReturnType<typeof googleSignInRequest>
// | ReturnType<typeof emailSignInRequest>
// | ReturnType<typeof signInSuccess>
// | ReturnType<typeof signInFailure>
// | ReturnType<typeof checkUserSession>
// | ReturnType<typeof signOutStart>
// | ReturnType<typeof signOutSuccess>
// | ReturnType<typeof signOutFailure>
// | ReturnType<typeof signUpStart>
// | ReturnType<typeof signUpSuccess>
// | ReturnType<typeof signUpFailure>