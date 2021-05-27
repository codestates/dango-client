import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { RootState } from '../../../../_reducer';

import ChattingRoom from './ChattingRoom';

const CONTAINER = styled.div`
  display: grid;
  height: 85vh;
  grid-column-gap: 20px;
  margin: 100px 20px 20px 20px;
`;

const CHATLIST = styled.div`
  grid-column: 1/3;
  border: 1px solid black;
`;

const CHAT = styled.div`
  grid-column: 3/7;
  border: 1px solid black;
  overflow: auto;
  transform: rotate(180deg);
  direction: rtl;
`;

interface RoomType {
  roomId: string;
  other: string;
  count: number;
}

function ChattingRoomsList(): JSX.Element {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [curOtherId, setCurOtherId] = useState<string>('');
  const [curRoomId, setCurRoomId] = useState<string>('');
  const [connectSocket, setConnectSocket] = useState<any>();
  const roomIdList = userInfo?.chatRooms.map((chatRoom: RoomType) => chatRoom.roomId);
  const otherList = userInfo?.chatRooms.map((chatRoom: RoomType) => chatRoom.other);

  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_API_URL}/?clientId=${userInfo?.id}`, {
      transports: ['websocket'],
      path: '/socket.io',
      withCredentials: true,
    });
    const connect = socket.on('connect', () => {
      console.log('connectSocket', socket.id);
    });
    setConnectSocket(connect);
  }, [userInfo]);

  console.log('채팅방 목록: ', userInfo?.chatRooms);

  const changeRoom = (index: number): void => {
    console.log('클릭!');
    setCurOtherId(otherList[index]);
    setCurRoomId(roomIdList[index]);
  };

  return (
    <CONTAINER>
      <CHATLIST>
        {userInfo?.chatRooms?.map((chatRoom: RoomType, index: number) => (
          <div key={chatRoom.roomId} onClick={() => changeRoom(index)}>
            {chatRoom.other}안 읽음 메시지{chatRoom.count}
          </div>
        ))}
      </CHATLIST>
      <CHAT>
        {curRoomId ? <ChattingRoom curOtherId={curOtherId} curRoomId={curRoomId} connectSocket={connectSocket} /> : ''}
      </CHAT>
    </CONTAINER>
  );
}

export default ChattingRoomsList;
