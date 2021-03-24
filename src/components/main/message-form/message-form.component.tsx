import React, { useState, useRef } from 'react';
import { Form, ProgressBar } from 'react-bootstrap';
import { MessageContainer } from './message-form.styles';

import Message from 'types/message';
import myFirebase from 'utils/firebase/myFirebase';
import { useCurrentChatRoom } from 'utils/redux/reducers/chat-room/chat-room.hook';
import { useCurrentUser } from 'utils/redux/reducers/user/user.hook';
import ChatRoom from 'types/chat-room';


const getPath = ( isPrivate:boolean, chatRoomInfo:ChatRoom ) => {
  if( isPrivate ){
    return `/message/private/${chatRoomInfo.id}`;
  }
  return "/message/public";
};

function MessageForm() {

  const chatRoom = useCurrentChatRoom();
  const user = useCurrentUser();

  const imageContentRef = useRef<HTMLInputElement>( null );
  const messageRef = useRef( myFirebase.database.ref( "messages" ) );


  const [ content, setContent ] = useState( "" );
  const [ error, setError ] = useState( "" );  
  const [ loading, setLoading ] = useState( false );
  const [ percent, setPercent ] = useState( 0 );
  

  const handleImageUpload = async ( e:React.ChangeEvent<HTMLInputElement> ) => {

    const file = e.target.files![ 0 ];
    const filePath = `${getPath( chatRoom.isPrivate, chatRoom.currentChatRoom )}/${file.name}`;
    const metadata = { contentType: file.type };

    try {
      setLoading( true );
      const uploadedImageRef  = myFirebase.storage
        .ref()
        .child( filePath )
        .put( file, metadata );
      
      uploadedImageRef.on( "state_chaged", 
        uploadImageSnapshot => {
          const uploadState = Math.round( ( uploadImageSnapshot.bytesTransferred / uploadImageSnapshot.totalBytes ) * 100 ); 
          setPercent( uploadState );
        },
        error => {
          setLoading( false );
          alert( error.message );
        },
        () => {
          uploadedImageRef.snapshot.ref
            .getDownloadURL()
            .then( downloadURL => {
              messageRef.current
                .child( chatRoom.currentChatRoom.id )
                .push( )
                .set( createMessage( downloadURL ) );
              setLoading( false );
            } );
        }
      );
    } catch ( error ) {
      setLoading( false );
      alert( error.message );
    }
  };


  const createMessage = ( fileUrl:string|null = null ) => {
    const message :Message = {
      timestamp: myFirebase.firebase.database.ServerValue.TIMESTAMP as number,
      user: {
        id: user!.uid,
        name: user!.displayName,
        image: user!.photoURL
      }
    };

    if( fileUrl !== null ){
      message[ "image" ] = fileUrl;
    }else{
      message[ "content" ] = content;
    }
    return message;
  };

  const handleSubmit = async (  ) => {

    if( !content.trim() ){
      setError( "Type contents first" );
      return;
    }
    setLoading( true );
    try {
      await messageRef.current
        .child( chatRoom.currentChatRoom.id )
        .push()
        .set( createMessage( ) );
    } catch ( error ) {
      setError( error.message );
    }finally{
      setContent( "" );
      setError( "" );
      setLoading( false );
    }
  };

  const handeChangeContent = ( e:React.ChangeEvent<HTMLInputElement> ) => {
    setError( "" );
    setContent( e.target.value );
  };

  return (
    <MessageContainer>
      <div className="loading-container">
        {( percent !== 0 && percent !== 100 ) && <ProgressBar className="loading" now={percent} label={`${percent}%`}/>}
      </div>
      <Form onSubmit={handleSubmit}> 
        <Form.Group>
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder="Enter your message" 
            onChange={handeChangeContent}
            value={content}
          />
        </Form.Group>
      </Form>
      <div className="button-group">
        <button type="button" className="send-btn" onClick={handleSubmit} disabled={loading}>SEND</button>
        <button onClick={() => imageContentRef.current?.click()} disabled={loading}>UPLOAD</button>
      </div>

      {error && <span className="error-text">{error}</span>}
      <input type="file" ref={imageContentRef} accept="image/*" onChange={handleImageUpload}/>
    </MessageContainer>
  );
}



export default MessageForm;
