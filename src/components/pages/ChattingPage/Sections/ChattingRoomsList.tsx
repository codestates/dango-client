import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { RootState } from '../../../../_reducer';

import ChattingRoom from './ChattingRoom';

const CONTAINER = styled.div`
  display: grid;
  height: 85vh;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-column-gap: 20px;
  margin: 1rem;
`;

const CHATLIST = styled.div`
  grid-column: 2/5;
  grid-row: 2/11;
  border: 1px solid black;
`;

const CHAT = styled.div`
  grid-column: 5/10;
  grid-row: 2/11;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  /* overflow: auto;
  transform: rotate(180deg);
  direction: rtl; */
`;

interface RoomType {
  roomId: string;
  other: string;
  count: number;
}
/* interface RoomType {
  roomId: string;
  otherId: string;
  otherNickname: string;
  count: number;
  talentId: string;
  profileImage: string;
} */

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
    console.log('클릭된 idx::', index);
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
        {/* 임시개발용 */}
        {/*         <ChattingRoom curOtherId={curOtherId} curRoomId={curRoomId} connectSocket={connectSocket} /> */}
      </CHAT>
    </CONTAINER>
  );
}

export default ChattingRoomsList;
