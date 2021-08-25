import { React, useState } from "react";

import WelcomePage from "./pages/welcomePage";
import LogInPage from "./pages/LogInPage";
import JoinPage from "./pages/JoinPage";
import HowToPage from "./pages/HowToPage";
import JoinCompletePage from "./pages/JoinCompletePage";
import CreatePostBoxPage1 from "./pages/CreatePostBoxPage1";
import CreatePostBoxPage2 from "./pages/CreatePostBoxPage2";
import CreatePostBoxPage3 from "./pages/CreatePostBoxPage3";
import KakaoPlusPage from "./pages/KakaoPlusPage";
import ReceivedLetterPage from "./pages/ReceivedLetterPage";
import JoinInfoPage from "./pages/JoinInfoPage";
import LetsWriteMailPage from "./pages/LetsWriteMailPage";
import WriteMailPage from "./pages/WriteMailPage";
import CheckWriteMailPage from "./pages/CheckWriteMailPage";
import CompleteWriteMailPage from "./pages/CompleteWriteMailPage";
import MyPostboxPage from "./pages/MyPostboxPage";
import CheckArrivedMailPage from "./pages/CheckArrivedMailPage";

import "./App.css";

import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import styled from "styled-components";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="full">
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route exact path="/login" component={LogInPage} />
            <Route exact path="/join" component={JoinPage} />
            <Route exact path="/joininfo" component={JoinInfoPage} />
            <Route exact path="/joincomplete" component={JoinCompletePage} />
            <Route exact path="/howto" component={HowToPage} />
            <Route
              exact
              path="/createpostboxstepone"
              component={CreatePostBoxPage1}
            />
            <Route
              exact
              path="/createpostboxsteptwo"
              component={CreatePostBoxPage2}
            />
            <Route
              exact
              path="/createpostboxstepthree"
              component={CreatePostBoxPage3}
            />
            <Route exact path="/kakaoplus" component={KakaoPlusPage} />
            <Route
              exact
              path="/receivedletter"
              component={ReceivedLetterPage}
            />
            <Route exact path="/letswritemail" component={LetsWriteMailPage} />
            <Route exact path="/writemail" component={WriteMailPage} />
            <Route
              exact
              path="/checkwritemail"
              component={CheckWriteMailPage}
            />
            <Route
              exact
              path="/completewritemail"
              component={CompleteWriteMailPage}
            />
            <Route exact path="/mypostbox" component={MyPostboxPage} />
            <Route
              exact
              path="/checkarrivedmail"
              component={CheckArrivedMailPage}
            />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
