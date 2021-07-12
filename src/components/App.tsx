import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import 'dotenv/config';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { io } from 'socket.io-client';
import server from '../api';
import { RootState } from '../_reducer';
import { renewChatRooms, updatePurchase } from '../_reducer/user';
import { setIsJoined } from '../_reducer/chattings';
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

interface ChatInfo {
  createdAt: string;
  message: string;
  postedBy: {
    image: string;
    nickname: string;
    _id: string;
  };
  roomId: string;
  type: 'text' | 'confirm' | 'init';
  _id: string;
}
function App(): JSX.Element {
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.user.userInfo?.id, shallowEqual);
  const chatRooms = useSelector((state: RootState) => state.user.userInfo?.chatRooms, shallowEqual);
  const [connectSocket, setConnectSocket] = useState<any | null>(null);
  const [lastChat, setLastChat] = useState<ChatInfo | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    const socket = io(`${process.env.REACT_APP_API_URL}/?clientId=${id}`, {
      transports: ['websocket'],
      path: '/socket.io',
      withCredentials: true,
    });
    const connect = socket.on('connect', () => {
      socket.id;
    });
    setConnectSocket(connect);

    connect.emit(
      'joinroom',
      chatRooms?.map((chatRoom: any) => chatRoom.otherId),
    );
    connect.on('hasjoined', (data: any) => {
      data;
    });

    connect.on('otherIsJoined', (otherId: string, roomId: string, isJoined: boolean) => {
      dispatch(setIsJoined({ otherId, roomId, isJoined }));
    });

    connect.on('messageFromOther', (receivedChats: ChatInfo, talentId: string) => {
      if (receivedChats.type === 'init') {
        server
          .get(`/users/chatinfo/${id}`)
          .then((res) => {
            dispatch(renewChatRooms({ chatRooms: res.data.chatrooms }));
          })
          .catch(() => '');
        if (receivedChats.message === '거래가 시작됐습니다.') {
          return;
        }
      }

      if (receivedChats.type === 'confirm') {
        const who: 'mine' | 'other' = receivedChats.postedBy._id === id ? 'mine' : 'other';
        const { roomId } = receivedChats;
        dispatch(updatePurchase({ roomId, who, talentId }));
      }

      setLastChat(receivedChats);
    });
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
              <Route
                path="/chatting"
                render={(props) => (
                  <ChattingPage
                    {...props}
                    connectSocket={connectSocket}
                    lastChat={lastChat}
                    setLastChat={setLastChat}
                  />
                )}
              />
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
