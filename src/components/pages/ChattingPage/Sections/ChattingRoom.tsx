import React, { useEffect, useState, memo, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../../../_reducer';
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

interface ChattingRoomProps {
  curOtherId: string;
  curRoomId: string;
  connectSocket: any;
  lastChat: ChatInfo | null;
  setLastChat: (lastChat: ChatInfo) => void;
}

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

function ChattingRoom({ curOtherId, curRoomId, connectSocket, lastChat, setLastChat }: ChattingRoomProps): JSX.Element {
  const [chatsLists, setChatsLists] = useState<ChatsLists[]>([]);
  const chattingRoomRef = useRef<HTMLDivElement>(null);

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
  // TODO: 1. 입력창에 메시지를 보낸다.
  const callback = (message: string) => {
    connectSocket.emit('messageToOther', curOtherId, message, curRoomId);
  };

  // lastChat가 바뀔 때 함수 실행
  // TODO: 3. 메시지를 보내서 lastChat이바뀔때마다 creatNewChats을 실행시킨다.
  useEffect(() => {
    if (lastChat) {
      createNewChats(lastChat);
    }
  }, [lastChat]);
  // 렌더링 하는 부분에서 똑같이 roomId를 활용해서 api 요청을 보내야하기 때문에 props로 내려주고
  // 메세지 박스에서 바뀐 메세지를 서버 소켓쪽으로 보내줘야하기 때문에 callback 함수를 props로 내려준다

  return (
    <CHATTINGROOM>
      <CHATLANDING ref={chattingRoomRef}>
        <Chats
          chatsLists={chatsLists}
          setChatsLists={setChatsLists}
          curRoomId={curRoomId}
          chattingRoomRef={chattingRoomRef}
        />
      </CHATLANDING>
      <CHATINPUT>
        <MessageInput callback={callback} />
      </CHATINPUT>
    </CHATTINGROOM>
  );
}
export default memo(ChattingRoom);
