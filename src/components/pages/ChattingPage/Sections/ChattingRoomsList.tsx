import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { RootState } from '../../../../_reducer';
import { setIsFirstChat, newChattingRoom } from '../../../../_reducer/chattings';
import ChattingOption from './ChattingOption';

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
  otherId: string;
  otherNickname: string;
  count: number;
  talentId: string;
  profileImage: string;
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
  const { isFromDetail, isFirstChat, talentId } = useSelector((state: RootState) => state.chattings);
  const dispatch = useDispatch();
  const [curOtherId, setCurOtherId] = useState<string>('');
  const [curRoomId, setCurRoomId] = useState<string>('');
  const [connectSocket, setConnectSocket] = useState<any>();
  const roomIdList = userInfo?.chatRooms.map((chatRoom: RoomType) => chatRoom.roomId);
  const otherList = userInfo?.chatRooms.map((chatRoom: RoomType) => chatRoom.otherId);
  const talentIdList = userInfo?.chatRooms.map((chatRoom: RoomType) => chatRoom.talentId);

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

    // 상세페이지에서 [채팅으로 거래하기] 버튼을 통해 들어온 경우
    if (isFromDetail) {
      // 첫 채팅일 경우, 채팅방을 바로 열어주고 isFirstChat 변경
      if (isFirstChat) {
        console.log('첫 채팅방');
        setCurOtherId(otherList[otherList.length - 1]);
        setCurRoomId(roomIdList[roomIdList.length - 1]);
        dispatch(setIsFirstChat({ isFromDetail: false, isFirstChat: false, talentId }));
      } else {
        // 기존 채팅방이 있으면, 그 채팅방을 열어준다.
        // chatRooms에서 해당 talentId에 해당하는 인덱스를 알아내서 roomID를 찾는다.
        console.log('talentIdList', talentIdList);
        console.log('index::::', talentIdList.indexOf(talentId));
        const chatIndex = talentIdList.indexOf(talentId);
        setCurOtherId(otherList[chatIndex]);
        setCurRoomId(roomIdList[chatIndex]);
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (curRoomId === '') {
      return;
    }

    dispatch(newChattingRoom());
  }, [curRoomId]);

  const changeRoom = (index: number): void => {
    console.log('클릭된 idx::', index);
    setCurOtherId(otherList[index]);
    setCurRoomId(roomIdList[index]);
    // 이렇게하면 똑같은방을 클릭했을때 curRoomId가 변하지않아서 빈채팅방이 랜더된다.
    // dispatch(newChattingRoom());
  };

  return (
    <CONTAINER>
      <CHATLIST>
        {userInfo?.chatRooms?.map((chatRoom: RoomType, index: number) => (
          <div style={{ cursor: 'pointer' }} key={chatRoom.roomId} onClick={() => changeRoom(index)}>
            <img src={chatRoom.profileImage} alt="상대방 프사," />
            상대방 닉네임: {chatRoom.otherNickname}, 안 읽은 메시지: {chatRoom.count}
          </div>
        ))}
      </CHATLIST>
      <CHAT>
        <ChattingOption />
        {curRoomId ? <ChattingRoom curOtherId={curOtherId} curRoomId={curRoomId} connectSocket={connectSocket} /> : ''}
        {/* 임시개발용 */}
        {/*         <ChattingRoom curOtherId={curOtherId} curRoomId={curRoomId} connectSocket={connectSocket} /> */}
      </CHAT>
    </CONTAINER>
  );
}

export default ChattingRoomsList;
