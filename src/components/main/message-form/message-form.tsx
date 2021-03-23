import React, { useState, useRef } from 'react';
import { Form, ProgressBar } from 'react-bootstrap';

import styled from "styled-components";
import myFirebase from 'utils/firebase/myFirebase';
import { useCurrentChatRoom } from 'utils/redux/reducers/chat-room/chat-room.hook';
import { useCurrentUser } from 'utils/redux/reducers/user/user.hook';
import color from 'utils/style/color';

function MessageForm() {

  const chatRoom = useCurrentChatRoom();
  const { user } = useCurrentUser();

  const [ content, setContent ] = useState( "" );
  const [ error, setError ] = useState( "" );
  const [ loading, setLoading ] = useState( false );
  const messageRef = useRef( myFirebase.database.ref( "messages" ) );


  const createMessage = ( fileUrl:string|null = null ) => {
    const message :any = {
      timestamp: myFirebase.firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user?.uid,
        name: user?.displayName,
        image: user?.photoURL
      }
    };

    if( fileUrl !== null ){
      message[ "image" ] = fileUrl;
    }else{
      message[ "content" ] = content;
    }

    return message;

  };

  const handleSubmit = async ( e:any ) => {
  
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
        <ProgressBar className="loading" now={80} label={"60%"}/>
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
        <button>UPLOAD</button>
      </div>

      {error && <span className="error-text">{error}</span>}
     
    </MessageContainer>
  );
}

const MessageContainer = styled.section`
  textarea{
    resize:none;
  }
  .error-text{
    padding-top:10px;
    color:red;
  }
  .loading-container{
    margin:10px 0;
    height:17px;
  }
  .loading{
    height:17px;
  }

  .button-group{

    display:grid;
    grid-template-columns:repeat(2, 1fr);
    grid-gap:5px;

    button{
      cursor: pointer;
      border-radius:5px;
      color:white;
      text-transform:uppercase;
      border:none;
      padding:20px;
      font-size:2rem;
      font-weight:200;
      letter-spacing:10px;
      background-color:${color.brown};
    }
    button:hover{
      opacity:0.8
    }
    button:active{
      opacity:1
    }
    button:disabled{
      background-color:gray;
    }
    button:disabled:hover{
      opacity:1;
      cursor: not-allowed;
    }
  }
`;

export default MessageForm;
