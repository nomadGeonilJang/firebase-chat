import React from 'react';
import { Accordion, Button, Card, FormControl, Image, InputGroup } from 'react-bootstrap';
import { FaLock, FaUnlock } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { MessageHeaderContainer } from './message-header.styles';

import { useCurrentUser } from 'utils/redux/reducers/user/user.hook';
import { useCurrentChatRoom } from 'utils/redux/reducers/chat-room/chat-room.hook';

type MessageHeaderProps ={
  onSearch:( e:React.ChangeEvent<HTMLInputElement> ) => void;
}

function MessageHeader( { onSearch }:MessageHeaderProps ) {

  const user = useCurrentUser();
  const chatRoom = useCurrentChatRoom();

  return (
    <MessageHeaderContainer>
      <h2>{chatRoom.isPrivate ? <FaLock/> : <FaUnlock/>}  <span>Room:  {chatRoom.currentChatRoom.name}</span></h2>
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


export default MessageHeader;
