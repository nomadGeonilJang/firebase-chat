import { useDispatch, useSelector } from "react-redux";
import { User } from "types/user";
import { RootState } from "../root";
import { clearUser, setCurrentUser, setPhotoURL } from "./user.action";

export const useCurrentUser = () => {
  const { user } = useSelector( ( state:RootState ) => state.user );
 
  return user;
};


export const useSetCurrentUser = () => {
  const dispatch = useDispatch();
  return ( user:User ) => dispatch( setCurrentUser( user ) ); 
};
export const useClearUser = () => {
  const dispatch = useDispatch();
  return () => dispatch( clearUser() );
};
export const useSetPhotoURL = () => {
  const dispatch = useDispatch();
  return ( url:string ) => dispatch( setPhotoURL( url ) );
};