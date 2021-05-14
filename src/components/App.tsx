import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import KakaoSignIn from './pages/SignInPage/kakao';

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        Yummy Dango!
        <KakaoSignIn />
      </div>
    </Router>
  );
}

export default App;
