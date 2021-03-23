import React from 'react';
import styled from "styled-components";
import MessageForm from '../message-form/message-form';
import MessageHeader from '../message-header/message-header';
import MessageSection from '../message-section/message-section';

function MainPanel() {
  return (
    <MainPanelContainer>
      <MessageHeader/>
      <MessageSectionContainer>
        <MessageSection/>
      </MessageSectionContainer>
      <MessageForm/>
    </MainPanelContainer>
  );
}

const MainPanelContainer = styled.section`
    background-color:purple;
`;
const MessageSectionContainer = styled.div`
  background-color:red;
  height:450px;
  border:.2rem solid #ececec;
  padding:1rem;
  margin-bottom:1rem;
  overflow-y:auto;
`;

export default MainPanel;
