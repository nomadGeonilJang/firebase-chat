import { useDispatch, useSelector } from "react-redux";
import { clearUser, setCurrentUser, setPhotoURL } from "./user.action";

import { RootState } from "utils/redux/reducers/root";
import { User } from "types/user";

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