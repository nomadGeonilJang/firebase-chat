
import React from 'react';
import { Route, Switch } from "react-router-dom";

import ChatPage from 'pages/chat/chat.component';
import LogInPage from 'pages/login/login.component';
import RegisterPage from 'pages/register/register.component';



function App() {
  return (
    <Switch>
      <Route exact path="/">
        <LogInPage/>
      </Route>
      <Route path="/register">
        <RegisterPage/>
      </Route>
      <Route path="/">
        <ChatPage/>
      </Route>
    </Switch>
  );
}

export default App;
