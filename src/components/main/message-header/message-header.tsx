import React from 'react';
import styled from "styled-components";
import { FaLock } from "react-icons/fa";
import { Accordion, Button, Card, FormControl, Image, InputGroup } from 'react-bootstrap';
function MessageHeader() {
  return (
    <MessageHeaderContainer>
      <h2><FaLock/></h2>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Search Message"
          aria-label="Search Message"
          aria-describedby="Message"
        />
      </InputGroup>
      <div></div>
      <div>
        <p><Image src=""/>user name</p>
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
  height:170px;
  border:.2rem solid #ececec;
  border-radius:5px;
  padding:1rem;
  margin-bottom:1rem;

  display:grid;
  grid-template-columns:repeat(2, 1fr);
  grid-template-rows:repeat(3, 1fr);
  grid-gap:10px;
`;

export default MessageHeader;
