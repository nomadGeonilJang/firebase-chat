import React from "react";
import { Switch, Route } from "react-router-dom";

import ChatPage from 'pages/chat/chat.component';
import LogInPage from 'pages/login/login.component';
import RegisterPage from 'pages/register/register.component';

import { useCurrentUser } from "utils/redux/reducers/user/user.hook";

const Router = (  ) => {
  const { user } = useCurrentUser();
  return (
    <Switch>
      {user && (
        <Route path="/">
          <ChatPage/>
        </Route>
      )}
      {!user && (
        <>
          <Route path="/">
            <LogInPage/>
          </Route>
          <Route path="/register">
            <RegisterPage/>
          </Route>
        </>
      )}
    </Switch>
  );
};


export default Router;