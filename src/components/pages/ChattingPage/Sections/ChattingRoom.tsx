import React, { useEffect, useState, memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../../../_reducer';
import getChatTime from '../../../../utils/getChatTime';
import MessageInput from './MessageInput';
import Chats from './Chats';

// 실제로 기능구현이 되는 컴포넌트

const CHATLANDING = styled.div`
  flex: 8;
  border: 1px solid pink;
  overflow: auto;
  /*   transform: rotate(180deg);
  direction: ltr; */
`;

const CHATINPUT = styled.div`
  flex: 1;
  border: 1px solid black;
  /*   transform: rotate(180deg);
  direction: ltr; */
  /* overflow: auto; */
`;

interface ChattingRoomProps {
  curOtherId: string;
  curRoomId: string;
  connectSocket: any;
  lastChat: string;
  setLastChat: (lastChat: string) => void;
}

function ChattingRoom({ curOtherId, curRoomId, connectSocket, lastChat, setLastChat }: ChattingRoomProps): JSX.Element {
  const [chatsLists, setChatsLists] = useState<any[]>([]);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const chattingRoomRef = useRef<HTMLDivElement>(null);

  // TODO: 4. 메시지와 시간,이미지를 담아서 chatsLists 배열안에 넣는다.
  const createNewChats = async (message: string) => {
    const now = new Date();
    const newChats = {
      time: getChatTime(now.toString()),
      chats: message,
      image: userInfo?.image,
    };
    await setChatsLists([...chatsLists, newChats]);

    if (chattingRoomRef.current) {
      chattingRoomRef.current.scrollTop = chattingRoomRef.current.scrollHeight;
    }
  };
  // 실제 사용 로직
  useEffect(() => {
    // 내가 가진 상대방의 아이디 목록을 전부 서버 소켓으로 보낸 뒤 연결한다.
    connectSocket.emit(
      'joinroom',
      userInfo?.chatRooms.map((chatRoom: any) => chatRoom.other),
    );
    connectSocket.on('hasjoined', (data: any) => {
      console.log('ChattingRoom2 -> ChattingRoom2 hasjoined가 되었나?', data);
    });

    // 모든 메세지(내가 보낸거 + 상대방이 보낸거)를 받아온 뒤 렌더링 할 수 있게 state를 바꿔준다.
    // TODO: 2. 메시지를 보내면 소켓에서 다시 그메시지를 준다. 그걸 setLastchat에 넣는다.
    connectSocket.on('messageFromOther', (receivedChats: any) => {
      console.log('messageFromOther되면 오는 receivedChats:::', receivedChats);
      setLastChat(receivedChats.message);
    });
  }, []);
  // 바뀐 state를 활용해서 메세지를 보낸다.(상대방 아이디, 메세지, 상대방과 함께 들어가 있는 roomId)
  // TODO: 1. 입력창에 메시지를 보낸다.
  const callback = (message: string) => {
    connectSocket.emit('messageToOther', curOtherId, message, curRoomId);
  };

  // lastChat가 바뀔 때 함수 실행
  // TODO: 3. 메시지를 보내서 lastChat이바뀔때마다 creatNewChats을 실행시킨다.
  useEffect(() => {
    if (lastChat !== '') {
      createNewChats(lastChat);
    }
  }, [lastChat]);
  // 렌더링 하는 부분에서 똑같이 roomId를 활용해서 api 요청을 보내야하기 때문에 props로 내려주고
  // 메세지 박스에서 바뀐 메세지를 서버 소켓쪽으로 보내줘야하기 때문에 callback 함수를 props로 내려준다

  return (
    <>
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
    </>
  );
}
export default memo(ChattingRoom);
