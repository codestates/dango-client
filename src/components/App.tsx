import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import 'dotenv/config';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { io } from 'socket.io-client';
import { RootState } from '../_reducer';
import GlobalStyles from './GlobalStyles';
import MapPage from './pages/MapPage/MapPage';
import ChattingPage from './pages/ChattingPage/ChattingPage';
import TalentRegister from './pages/TalentRegistrationPage/TalentRegistrationPage';
import TalentDetailPage from './pages/TalentDetailPage/TalentDetailPage';
import Mypage from './pages/MyPage/MyPage';
import theme from '../styles/theme';
import Navbar from './pages/LandingPage/Sections/Navbar';
import SigninModal from './pages/SigninPage/SigninModal';
import LandingPage from './pages/LandingPage/LandingPage';
// import TalentRegistrationPage from './pages/TalentRegistrationPage/TalentRegistrationPage';

function App(): JSX.Element {
  const id = useSelector((state: RootState) => state.user.userInfo?.id, shallowEqual);
  const [connectSocket, setConnectSocket] = useState<any | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    console.log('app에서 소켓생성 ----------------------');
    const socket = io(`${process.env.REACT_APP_API_URL}/?clientId=${id}`, {
      transports: ['websocket'],
      path: '/socket.io',
      withCredentials: true,
    });
    const connect = socket.on('connect', () => {
      console.log('connectSocket! socket.id: ', socket.id);
    });
    setConnectSocket(connect);
  }, [id]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/signin" component={SigninModal} />
              <Route path="/map" component={MapPage} />
              <Route path="/chatting" render={(props) => <ChattingPage {...props} connectSocket={connectSocket} />} />
              <Route path="/register" component={TalentRegister} />
              <Route
                path="/detail/:talentId"
                render={(props) => <TalentDetailPage {...props} connectSocket={connectSocket} />}
              />
              <Route path="/mypage" component={Mypage} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
