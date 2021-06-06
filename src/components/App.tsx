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
// import Loading from './pages/LandingPage/Sections/Loading';
// import TalentRegistrationPage from './pages/TalentRegistrationPage/TalentRegistrationPage';
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

  // id가 제대로 안들어갈때가있어서 deps를 빈배열로넣고 로그인할때마다 페이지 새로고침시킴
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

    connect.emit(
      'joinroom',
      chatRooms.map((chatRoom: any) => chatRoom.otherId),
    );
    connect.on('hasjoined', (data: any) => {
      console.log('ChattingRoom2 -> ChattingRoom2 hasjoined가 되었나?', data);
    });

    // FIXME:
    connect.on('otherIsJoined', (otherId: string, roomId: string, isJoined: boolean) => {
      console.log('otherIsJoined::::: otherId:', otherId, 'roomId:', roomId, isJoined);
      dispatch(setIsJoined({ otherId, roomId, isJoined }));
    });

    // TODO: 2. 메시지를 보내면 소켓에서 다시 그메시지를 준다. 그걸 setLastchat에 넣는다.
    connect.on('messageFromOther', (receivedChats: ChatInfo, talentId: string) => {
      console.log('messageFromOther되면 오는 receivedChats:::', receivedChats);

      // 새방이 만들어졌다는 메시지라면 서버에서 새 chatRooms를 받아서
      if (receivedChats.type === 'init') {
        console.log('채팅방 만들어졌음 이제 서버에서 룸데이터받을꺼임');
        server
          .get(`/users/chatinfo/${id}`)
          .then((res) => {
            console.log('서버에서받은 룸데이터', res.data);
            dispatch(renewChatRooms({ chatRooms: res.data.chatrooms }));
          })
          .catch((err) => console.log(err));
        return;
      }

      // 메시지타입이 confirm인경우
      if (receivedChats.type === 'confirm') {
        console.log('구매완료눌렀을때 roomId::: ', receivedChats.roomId, '  ,  talentId::::', talentId);
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
