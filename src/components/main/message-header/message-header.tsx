import React from 'react';
import styled from "styled-components";
import { FaLock } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { Accordion, Button, Card, FormControl, Image, InputGroup } from 'react-bootstrap';
import { useCurrentUser } from 'utils/redux/reducers/user/user.hook';
import { useCurrentChatRoom } from 'utils/redux/reducers/chat-room/chat-room.hook';

type MessageHeader ={
  onSearch:( e:React.ChangeEvent<HTMLInputElement> ) => void;
}
function MessageHeader( { onSearch }:MessageHeader ) {

  const user = useCurrentUser();
  const chatRoom = useCurrentChatRoom();

  return (
    <MessageHeaderContainer>
      
      <h2><FaLock/> <span>Room:  {chatRoom.currentChatRoom.name}</span></h2>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1"><FcSearch/></InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          onChange={onSearch}
          placeholder="Search Message"
          aria-label="Search Message"
          aria-describedby="Message"
        />
      </InputGroup>
      <div></div>
      <div className="user-content">
        <p><Image roundedCircle src={user?.photoURL}/>{user?.displayName}</p>
      </div>
      <Accordion >
        <Card>
          <Card.Header style={{ padding: '0 1rem' }}>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Click me!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Accordion>
        <Card>
          <Card.Header style={{ padding: '0 1rem' }}>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Click me!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </MessageHeaderContainer>
  );
}

const MessageHeaderContainer = styled.header`
  color:white;
  height:180px;
  border:.2rem solid #ececec;
  border-radius:5px;
  padding:1rem;
  margin-bottom:1rem;

  display:grid;
  grid-template-columns:repeat(2, 1fr);
  grid-template-rows:repeat(3, 1fr);
  grid-gap:5px;

  .user-content{
    img{
      width:32px;
      height:32px;
      margin-right:10px;
    }
    p{
      display:flex;
      align-items:center;
      justify-content:flex-end;

    }
  }

  h2{
    display:flex;
    align-items:center;
    span{
      margin-left:10px;
      display:flex;
      align-items:center;
      padding-top:1rem;
    }
  }
`;

export default MessageHeader;
