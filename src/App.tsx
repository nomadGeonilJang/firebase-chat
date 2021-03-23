
import React, { useState, useEffect }from 'react';

import myFirebase from 'utils/firebase/myFirebase';
import Router from 'router';
import { User } from 'types/user';
import { useSetCurrentUser } from 'utils/redux/reducers/user/user.hook';

function App() {


  const setCurrentUser = useSetCurrentUser();
  const [ initApp, setInitApp ] = useState( false );

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
        }, 1000 );
      }
      
    } );
  }, [] );

  return ( initApp ? <Router/> : <h1>loading..</h1> );
    
 
}

export default App;
