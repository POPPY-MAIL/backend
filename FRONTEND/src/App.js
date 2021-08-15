import { React, useState } from 'react';


import WelcomePage from './pages/welcomePage';
import LogInPage from './pages/LogInPage';
import JoinPage from './pages/JoinPage';
import HowToPage from './pages/HowToPage';
import JoinCompletePage from './pages/JoinCompletePage';

import './App.css';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';

function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <div className="full">
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route exact path="/login" component={LogInPage} />
            <Route exact path="/join" component={JoinPage} />
            <Route exact path="/joincomplete" component={JoinCompletePage} />
            <Route exact path="/howto" component={HowToPage} />

          </Switch>
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
