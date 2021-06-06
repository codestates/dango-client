import React, { useEffect, useState, memo, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import server from '../../../../api/index';
import { RootState } from '../../../../_reducer';
import { newChattingRoom, getChattingData } from '../../../../_reducer/chattings';

import getChatTime from '../../../../utils/getChatTime';
import MessageInput from './MessageInput';
import Chats from './Chats';
import Loading from '../../LandingPage/Sections/Loading';

// 실제로 기능구현이 되는 컴포넌트
const CHATTINGROOM = styled.div`
  flex: 9;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: hidden;
`;
const CHATLANDING = styled.div`
  flex: 9;
  overflow-y: auto;
  padding: 0.5rem;
`;

const CHATINPUT = styled.div`
  flex: 1;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
`;

export interface ChatInfo {
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

export interface ChatsLists {
  id: string;
  type: 'text' | 'confirm' | 'init';
  time: string;
  message: string;
  image: string;
}
interface ChattingRoomProps {
  curOtherId: string;
  curRoomId: string;
  connectSocket: any;
  lastChat: ChatInfo | null;
}

function ChattingRoom({ curOtherId, curRoomId, connectSocket, lastChat }: ChattingRoomProps): JSX.Element {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user, shallowEqual);

  const [chatsLists, setChatsLists] = useState<ChatsLists[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastData, setLastData] = useState(false);

  const chattingRoomRef = useRef<HTMLDivElement>(null);
  const currentScroll = useRef<number>(0);

  useEffect(() => {
    console.log('방바꿈~~~~~~~~~~~~~~~');
    if (curRoomId !== '') {
      getChats();
    }
    return () => {
      console.log('+++++++++++++++++++방청소~~~~~~~~~~~~~~~');
      // soon)방옮겼을때 room unmount하면서 render,page,chatsLists 초기화 시켜야함.
      dispatch(newChattingRoom());
      setChatsLists([]);
    };
  }, [curRoomId]);

  // lastChat가 바뀔 때 함수 실행
  // soon) app의 socket io event에서 거르려고했는데, 소켓이벤트가 처음 선언될때의 상태값만을 사용하고, 업데이트된 상태를 인지하지 못해서
  // creatNewChats를 실행할때 걸러줬음.
  // 문제는 채팅방을나가도 실시간으로 lastChat이 갱신되서 저장되고, 이값이 방을 들어갔을때 roomId가 같아지는 순간
  // creatNewChats에 들어가 실행되어 chatLists에 값이 들어가서 메시지가 2개가 떴다.
  // 비동기처리를 위해 채팅방을 클릭할때 lastChat을 null로 초기화시켜서 해결함.
  useEffect(() => {
    if (lastChat && lastChat.roomId === curRoomId) {
      createNewChats(lastChat);
    }
  }, [lastChat]);
  // curRoomId 가 ''인데 lastChat은 들어옴.
  // lastChat.roomId가 4인데, 방들어가면 roomId가 4가되고, lastChat의 roomId와 같아져서 이게 chatList에 들어감.
  // 컴포넌트가 unmount되도 상태는 초기화되지않고 남는다..

  const getChats = (page = 0, skip = 0) => {
    const body = {
      id: userInfo?.id,
      skip,
      limit: 10,
      page,
    };

    server
      .post(`/chats/${curRoomId}`, body)
      .then((response) => {
        if (chattingRoomRef.current) {
          // 데이터를 불러올때의 스크롤위치를 current에 저장
          currentScroll.current = chattingRoomRef.current.clientHeight;
        }
        return response;
      })
      .then((response) => {
        console.log('서버에서 온chatting data ::::', response.data.data);
        dispatch(getChattingData({ data: response.data.data }));
        if (response.data.data.length < 10) {
          setLastData(true);
        } else {
          setLastData(false);
        }
      })
      .then(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          if (chattingRoomRef.current) {
            if (page === 0) {
              // 방에 방금 들어온거라면(page===0) 스크롤을 맨밑으로 내린다.
              chattingRoomRef.current.scrollTop = chattingRoomRef.current.scrollHeight;
            } else {
              // 그게아니라 상단으로올려 함수를 호출한거면, current에 저장한 위치로 스크롤을 이동시킨다.
              chattingRoomRef.current.scrollTop = currentScroll.current;
            }
          }
        }, 200);
      })
      .catch((err) => console.log(err));
  };

  // TODO: 4. 메시지와 시간,이미지를 담아서 chatsLists 배열안에 넣는다.
  const createNewChats = async (lastChat: ChatInfo) => {
    const newChat = {
      id: lastChat.postedBy._id,
      type: lastChat.type,
      time: getChatTime(lastChat.createdAt),
      message: lastChat.message,
      image: lastChat.postedBy.image,
    };
    await setChatsLists([...chatsLists, newChat]);

    // 글쓸때마다 스크롤을 가장 하단으로 내린다.
    if (chattingRoomRef.current) {
      chattingRoomRef.current.scrollTop = chattingRoomRef.current.scrollHeight;
    }
  };

  // 바뀐 state를 활용해서 메세지를 보낸다.(상대방 아이디, 메세지, 상대방과 함께 들어가 있는 roomId)
  const callback = (message: string) => {
    connectSocket.emit('messageToOther', curOtherId, message, curRoomId);
  };

  // 여기서 loading?<Loading/> : Chats 했더니
  // loading상태가 갱신될때마다 Chats컴포넌트가 새로 랜더링되면서 Chats 컴포넌트의 useEffect effect들이 계속 실행됨.   ㄷ ㅐ환장파티,
  // 해결: loading 상태에따라 분기하는 부분을 Chats안으로 옮겨서 컴포넌트 자체가 리랜더링 되지 않도록 함.
  return (
    <CHATTINGROOM>
      <CHATLANDING ref={chattingRoomRef}>
        <Chats
          chatsLists={chatsLists}
          getChats={getChats}
          loading={loading}
          setLoading={setLoading}
          chattingRoomRef={chattingRoomRef}
          lastData={lastData}
        />
      </CHATLANDING>
      <CHATINPUT>
        <MessageInput callback={callback} />
      </CHATINPUT>
    </CHATTINGROOM>
  );
}
export default ChattingRoom;
