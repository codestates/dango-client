import React from 'react';
import 'dotenv/config';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Kakao from './pages/SigninPage/kakao';
import MapPage from './pages/MapPage/MapPage';
import ChattingPage from './pages/ChattingPage/ChattingPage';
import TalentRegister from './pages/TalentRegistrationPage/TalentRegistrationPage';
import TalentDetailPage from './pages/TalentDetailPage/TalentDetailPage';
import Mypage from './pages/MyPage/MyPage';
// import TalentRegistrationPage from './pages/TalentRegistrationPage/TalentRegistrationPage';

// path뒤의 exact는 세부경로 페이지가 다른 라우트에 걸려있을때만 붙여준다.
// ex) path="/" exact
// ex) path="/main" exact (다른 라우트에 path="/main/:id" 와같은 path가 걸려있을때)
//      -> /main 라우트에 exact를 걸어줬으니, /main/:id 라우트에는 굳이 exact 안걸어줘도 된다.
//         (/main/:id/detail 처럼 또 겹치면 걸어줘야한다.)
function App(): JSX.Element {
  return (
    <>
      <GlobalStyles />
      <Router>
        <div className="App">
          {/* NavBar */}
          <Switch>
            <Route path="/" exact>
              Yummy Dango!
            </Route>
            <Route path="/kakao" component={Kakao} />
            <Route path="/map" component={MapPage} />
            <Route path="/chatting" component={ChattingPage} />
            <Route path="/register" component={TalentRegister} />
            <Route path="/detail/:talentId" component={TalentDetailPage} />
            <Route path="/mypage" component={Mypage} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
