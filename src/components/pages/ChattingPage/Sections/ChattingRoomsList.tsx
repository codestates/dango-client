import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../_reducer';

function ChattingRoomsList(): JSX.Element {
  const { userInfo } = useSelector((state: RootState) => state.user);

  console.log('채팅방 목록: ', userInfo?.talks);

  return (
    <div>
      {userInfo?.talks?.map((chatRoom) => (
        <div key={chatRoom.roomId}>
          {chatRoom.other}안 읽음 메시지{chatRoom.count}
        </div>
      ))}
    </div>
  );
}

export default ChattingRoomsList;
