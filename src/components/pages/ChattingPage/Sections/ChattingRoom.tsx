import React, { useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../../../_reducer';
import MessageInput from './MessageInput';
import ChatsListLanding from './ChatsListLanding';

// 실제로 기능구현이 되는 컴포넌트

const CHATINPUT = styled.div`
  grid-column: 3/7;
  border: 1px solid black;
  transform: rotate(180deg);
  direction: ltr;
  /* overflow: auto; */
`;

const CHATLENDING = styled.div`
  overflow: auto;
  transform: rotate(180deg);
  direction: ltr;
`;

function ChattingRoom({ curOtherId, curRoomId, connectSocket }: any): JSX.Element {
  const [lastChats, setLastChats] = useState<string>('');
  const [chatsLists, setChatsLists] = useState<[] | any>([]);
  const { userInfo } = useSelector((state: RootState) => state.user);

  const now = new Date();

  const createNewChats = (message: string): void => {
    const newChats = {
      time: `${now.getHours() < 12 ? '오전' : '오후'} ${
        now.getHours() === 0 ? `12` : now.getHours() > 12 ? `${now.getHours() - 12}` : `${now.getHours()}`
      } : ${now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()}`,
      chats: message,
      image: userInfo?.image,
    };
    setChatsLists([...chatsLists, newChats]);
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
    connectSocket.on('messageFromOther', (receivedChats: any) => {
      setLastChats(receivedChats.message);
    });
  }, []);
  // 바뀐 state를 활용해서 메세지를 보낸다.(상대방 아이디, 메세지, 상대방과 함께 들어가 있는 roomId)
  const callback = (message: string) => {
    connectSocket.emit('messageToOther', curOtherId, message, curRoomId);
  };

  // lastChats가 바뀔 때 함수 실행
  useEffect(() => {
    createNewChats(lastChats);
  }, [lastChats]);
  // 렌더링 하는 부분에서 똑같이 roomId를 활용해서 api 요청을 보내야하기 때문에 props로 내려주고
  // 메세지 박스에서 바뀐 메세지를 서버 소켓쪽으로 보내줘야하기 때문에 callback 함수를 props로 내려준다

  return (
    <>
      <CHATINPUT>
        <MessageInput callback={callback} />
      </CHATINPUT>
      <CHATLENDING>
        <ChatsListLanding chatsLists={chatsLists} curRoomId={curRoomId} />
      </CHATLENDING>
    </>
  );
}
export default memo(ChattingRoom);
