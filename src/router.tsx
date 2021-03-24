import React, { Suspense, lazy } from "react";

import Loading from "components/loading/loading.component";
import { Switch, Route } from "react-router-dom";

const ChatPage = lazy( () => import( 'pages/chat/chat.component' ) );
const LogInPage = lazy( () => import( 'pages/login/login.component' ) );
const RegisterPage = lazy( () => import( 'pages/register/register.component' ) );

type RouterProps = {
  isUserLoaded:boolean
}
const Router = ( { isUserLoaded }:RouterProps ) => {
  return (
    <Suspense fallback={<Loading/>}>
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
    </Suspense>
  );
};


export default Router;