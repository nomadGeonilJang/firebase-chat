
import React, { useState, useEffect }from 'react';

import myFirebase from 'utils/firebase/myFirebase';
import Router from 'router';
import { User } from 'types/user';
import { useSetCurrentUser } from 'utils/redux/reducers/user/user.hook';
import Loading from 'components/loading/loading.component';

function App() {

  const setCurrentUser = useSetCurrentUser();
  const [ initApp, setInitApp ] = useState( false );
  const [ isUserLoaded, setIsUserLoaded ] = useState( false );

  console.log( "s" );
  useEffect( () => {
    myFirebase.auth.onAuthStateChanged( ( user ) => {
      setInitApp( true );
      if( user ){
        setTimeout( () => {  
          const userObj:User = {
            displayName: user.displayName!,
            email: user.email!,
            photoURL: user.photoURL!,
            uid: user.uid
          };
          setCurrentUser( userObj );
          setIsUserLoaded( true );
        }, 1000 );
      }else{
        setIsUserLoaded( false );
      }
    } );
  }, [] );

  return ( initApp ? <Router isUserLoaded={isUserLoaded}/> : <Loading/> );
    
 
}

export default App;
