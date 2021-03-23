import React from 'react';
import styled from "styled-components";

import UserSection from 'components/side/user-section/user-section.component';
import ChatRoomSection from '../chat-room-section/chat-room-section.component';
import DirectMessageSection from '../direct-message-section/direct-message.section';
import FavoritSection from '../favorit-section/favoit-section.component';
import color from 'utils/style/color';


function SidePanel() {
  return (
    <SidePanelContainer>
      <UserSection/>
      <FavoritSection/>
      <ChatRoomSection/>
      <DirectMessageSection/>
    </SidePanelContainer>
  );
}

const SidePanelContainer = styled.aside`
  background-color:${color.darkBlue};
  padding:20px;
  color:white;
`;
export default SidePanel;
