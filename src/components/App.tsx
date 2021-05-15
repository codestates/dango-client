import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// path뒤의 exact는 세부경로 페이지가 다른 라우트에 걸려있을때만 붙여준다.
// ex) path="/" exact
// ex) path="/main" exact (다른 라우트에 path="/main/:id" 와같은 path가 걸려있을때)
//      -> /main 라우트에 exact를 걸어줬으니, /main/:id 라우트에는 굳이 exact 안걸어줘도 된다.
//         (/main/:id/detail 처럼 또 겹치면 걸어줘야한다.)
function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        Yummy Dango!
        {/* NavBar */}
        {/* <Switch>
          <Route path="/" exact component={"컴포넌트"} />
        </Switch> */}
      </div>
    </Router>
  );
}

export default App;