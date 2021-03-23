import React from 'react';
import styled from "styled-components";
import mement from "moment";
import { Media } from 'react-bootstrap';
import { default as MessageType } from 'types/message';
import { useCurrentUser } from 'utils/redux/reducers/user/user.hook';
import color from 'utils/style/color';

type MessageProps = {
    message:MessageType
}
function Message( { message }:MessageProps ) {

  const { user } = useCurrentUser();
  const isMine = user?.uid === message.user.id;


  return (
    <MessageMedia>
      <img
        src={message.user.image}
        alt={message.user.name}
      />
      <Media.Body>
        <h6>{message.user.name}
          <span>{mement( message.timestamp ).fromNow()}</span>
        </h6>
        {message.image 
          ? <img style={{ maxWidth: "300px" }} src={message.image} alt={"이미지"}/>
          : (
            <p className={isMine ? "me" : ""}>
              {message.content}
            </p>
          )}
      </Media.Body>
    </MessageMedia>
  );
}

const MessageMedia = styled( Media )`
    margin-bottom:10px;
    color:white;
    img{
        border-radius:10px;
        width:48px;
        height:48px;
        margin-right:10px;
    }
    h6{
        font-size:1.2rem;
        margin-bottom:5px;
    }
    span{
        margin-left:5px;
        font-size:1.1rem;
    }
    p{
        padding:5px;
        background-color:gray;
        border-radius:5px;
    }
    p.me{
        background-color:${color.yellow};
        color:${color.brown};
    }
    /* p{
        text-align:end;
    } */
`;

export default Message;
