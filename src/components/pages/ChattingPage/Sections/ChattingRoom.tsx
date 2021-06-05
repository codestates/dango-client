import React, { useEffect, useState, memo, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import server from '../../../../api/index';
import { RootState } from '../../../../_reducer';
import { newChattingRoom, getChattingData } from '../../../../_reducer/chattings';

import getChatTime from '../../../../utils/getChatTime';
import MessageInput from './MessageInput';
import Chats from './Chats';

// 실제로 기능구현이 되는 컴포넌트
const CHATTINGROOM = styled.div`
  flex: 9;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
const CHATLANDING = styled.div`
  flex: 9;
  overflow: auto;
  /*   transform: rotate(180deg);
  direction: ltr; */
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
  setCurRoomId: (curRoomId: string) => void;
  connectSocket: any;
  lastChat: ChatInfo | null;
  setLastChat: (any: any) => void;
}

function ChattingRoom({
  curOtherId,
  curRoomId,
  setCurRoomId,
  connectSocket,
  lastChat,
  setLastChat,
}: ChattingRoomProps): JSX.Element {
  const dispatch = useDispatch();
  const { page, render } = useSelector((state: RootState) => state.chattings, shallowEqual);
  const { userInfo } = useSelector((state: RootState) => state.user, shallowEqual);

  const [chatsLists, setChatsLists] = useState<ChatsLists[]>([]);
  const [loading, setLoading] = useState(true);

  const chattingRoomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('방바꿈~~~~~~~~~~~~~~~');
    console.log('lastChat null로바꾸기');
    getChats();
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
        if (page === 0) {
          dispatch(newChattingRoom());
        }
        dispatch(getChattingData({ data: response.data.data }));
      })
      .then(() => {
        setLoading(false);
        if (chattingRoomRef.current) {
          if (page === 0) {
            chattingRoomRef.current.scrollTop = chattingRoomRef.current.scrollHeight;
          } else {
            chattingRoomRef.current.scrollTop = 0;
          }
        }
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

    if (chattingRoomRef.current) {
      chattingRoomRef.current.scrollTop = chattingRoomRef.current.scrollHeight;
    }
  };

  // 바뀐 state를 활용해서 메세지를 보낸다.(상대방 아이디, 메세지, 상대방과 함께 들어가 있는 roomId)
  const callback = (message: string) => {
    connectSocket.emit('messageToOther', curOtherId, message, curRoomId);
  };

  return (
    <CHATTINGROOM>
      <CHATLANDING ref={chattingRoomRef}>
        <Chats chatsLists={chatsLists} getChats={getChats} loading={loading} />
      </CHATLANDING>
      <CHATINPUT>
        <MessageInput callback={callback} />
      </CHATINPUT>
    </CHATTINGROOM>
  );
}
export default ChattingRoom;
