import React from 'react';
import { SidePanelContainer } from './side-panel.styles';

import UserSection from 'components/side/user-section/user-section.component';
import ChatRoomSection from 'components/side/chat-room-section/chat-room-section.component';
import DirectMessageSection from 'components/side/direct-message-section/direct-message-section.component';
import FavoritSection from 'components/side/favorit-section/favoit-section.component';

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

export default SidePanel;
