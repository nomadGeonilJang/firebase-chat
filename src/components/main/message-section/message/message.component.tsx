import React from 'react';
import mement from "moment";
import { MessageMedia } from './message.styles';

import { default as MessageType } from 'types/message';
import { useCurrentUser } from 'utils/redux/reducers/user/user.hook';

type MessageProps = {
    message:MessageType
}

function Message( { message }:MessageProps ) {

  const user = useCurrentUser();
  const isMine = user?.uid === message.user.id;

  return (
    <MessageMedia>
      <img
        src={message.user.image}
        alt={message.user.name}
      />
      <MessageMedia.Body>
        <h6>{message.user.name}
          <span>{mement( message.timestamp ).fromNow()}</span>
        </h6>
        {message.image 
          ? <img className="content-image" src={message.image} alt={"이미지"}/>
          : (
            <p className={isMine ? "me" : ""}>
              {message.content}
            </p>
          )}
      </MessageMedia.Body>
    </MessageMedia>
  );
}


export default Message;
