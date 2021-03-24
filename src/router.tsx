import React from "react";
import { Switch, Route } from "react-router-dom";

import ChatPage from 'pages/chat/chat.component';
import LogInPage from 'pages/login/login.component';
import RegisterPage from 'pages/register/register.component';

type RouterProps = {
  isUserLoaded:boolean
}
const Router = ( { isUserLoaded }:RouterProps ) => {
  return (
    <Switch>
      {isUserLoaded && (
        <Route path="/">
          <ChatPage/>
        </Route>
      )}
      {!isUserLoaded && (
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