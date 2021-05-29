import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../../_reducer';
import { openModal } from '../../../../_reducer/modal';
import { RoomType } from './ChattingRoomsList';
import server from '../../../../api';

const CHATTINGOPTION = styled.div`
  flex: 1;
`;
const OPTIONBOX = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  margin-left: auto;
`;
const COMPLETEBTN = styled.button`
  flex: 1;
`;
const ESCAPEBTN = styled.button`
  flex: 1;
`;

interface ChattingOptionProps {
  roomId: string;
}
interface RoomInfo {
  userId: string | undefined;
  chatRoomId: string;
  otherId: string;
  talentId: string;
}

export default function ChattingOption({ roomId }: ChattingOptionProps): JSX.Element {
  const dispatch = useDispatch();
  const chatRooms = useSelector((state: RootState) => state.user.userInfo?.chatRooms);
  const userId = useSelector((state: RootState) => state.user.userInfo?.id);
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);

  useEffect(() => {
    if (!roomId) {
      return;
    }
    setRoomInfo(getRoomInfo());
  }, [roomId]);

  const getRoomInfo = () => {
    const currentRoomInfo = chatRooms.find((room: RoomType) => room.roomId === roomId);
    return {
      userId,
      chatRoomId: roomId,
      otherId: currentRoomInfo.otherId,
      talentId: currentRoomInfo.talentId,
    };
  };

  const handleComplete = () => {
    const data = {
      talentId: roomInfo?.talentId,
      userId: roomInfo?.userId,
      chatroomId: roomInfo?.chatRoomId,
    };
    server
      .post('/users/confirm', data)
      .then(() => {
        dispatch(openModal({ type: 'ok', text: '거래완료 신청이 성공적으로 접수되었습니다!' }));
      })
      .catch((err) => {
        if (!err.response) {
          console.log(err);
          return;
        }
        dispatch(openModal({ type: 'error', text: err.response.data.message }));
      });
  };

  return (
    <CHATTINGOPTION>
      <OPTIONBOX>
        <COMPLETEBTN>거래완료</COMPLETEBTN> <ESCAPEBTN>나가기</ESCAPEBTN>
      </OPTIONBOX>
    </CHATTINGOPTION>
  );
}
