import React from 'react';
import styled from "styled-components";
import color from 'utils/style/color';
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
    background-color:${color.darkBlue};
    padding:10px;
`;
const MessageSectionContainer = styled.div`
  border-radius:5px;
  height:550px;
  border:.2rem solid #ececec;
  padding:1rem;
  margin-bottom:1rem;
  overflow-y:auto;
`;

export default MainPanel;
