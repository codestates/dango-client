import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import TalentRegistrationPage from './pages/TalentRegistrationPage/TalentRegistrationPage';

function App():JSX.Element {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <div className="App">Yummy Dango!</div>
        </Route>
        <Route exact path="/registration">
          <TalentRegistrationPage />
        </Route>
      </Switch>
    </BrowserRouter>
    </>
  )
}

export default App;
