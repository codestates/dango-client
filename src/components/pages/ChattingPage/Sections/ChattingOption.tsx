import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ChatInfo } from './ChattingRoom';
import { openModal } from '../../../../_reducer/modalSlice';
import { escapeRoom } from '../../../../_reducer/user';
import server from '../../../../api';
import { CHATTINGOPTION, COMPLETEBTN, COMPLETED, ESCAPEBTN, CHATLISTBTN } from './ChattingOptionStyle';

interface ChattingOptionProps {
  roomInfo: {
    userId: string | undefined;
    chatRoomId: string;
    otherId: string;
    talentId: string;
    clickPurchase: boolean[];
    otherIsJoined: boolean;
  } | null;
  setCurRoomId: (roomId: string) => void;
  setLastChat: (lastChat: ChatInfo) => void;
  showChatList: boolean;
  setShowChatList: (boolean: boolean) => void;
  setClickedRoom: (index: number) => void;
  connectSocket: any;
}

export default function ChattingOption({
  roomInfo,
  setCurRoomId,
  setLastChat,
  showChatList,
  setShowChatList,
  setClickedRoom,
  connectSocket,
}: ChattingOptionProps): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleComplete = () => {
    const data = {
      talentId: roomInfo?.talentId,
      userId: roomInfo?.userId,
      chatroomId: roomInfo?.chatRoomId,
    };

    if (roomInfo) {
      connectSocket.emit('confirm', roomInfo.talentId, roomInfo.userId, roomInfo.chatRoomId, roomInfo.otherId);

      dispatch(openModal({ type: 'ok', text: '거래완료 신청이 성공적으로 접수되었습니다!' }));
    }
  };

  const handleEscape = () => {
    const onConfirmCallback = () => {
      const config = {
        data: {
          userId: roomInfo?.userId,
          otherId: roomInfo?.otherId,
          chatRoomId: roomInfo?.chatRoomId,
        },
      };
      server
        .delete('/chats/delete', config)
        .then(() => setCurRoomId(''))
        .then(() => {
          connectSocket.emit('initChat', roomInfo?.otherId, roomInfo?.chatRoomId, true);
          if (roomInfo?.talentId) {
            dispatch(escapeRoom({ talentId: roomInfo.talentId }));
          }
          setClickedRoom(-1);
          dispatch(openModal({ type: 'ok', text: '채팅방 나가기 완료' }));
        })
        .catch((err) => {
          if (!err.response) {
            return;
          }
          dispatch(openModal({ type: 'error', text: err.response.data.message }));
        });
    };

    dispatch(openModal({ type: 'danger', text: '채팅방을 나가시겠습니까?', onConfirm: onConfirmCallback }));
  };

  const checkPurchase = () => {
    if (roomInfo?.otherIsJoined === false) {
      return <COMPLETED>상대방이 채팅방을 나갔습니다. 😅</COMPLETED>;
    }
    if (roomInfo?.clickPurchase[0] === false) {
      return <COMPLETEBTN onClick={handleComplete}>거래 완료</COMPLETEBTN>;
    }
    if (roomInfo?.clickPurchase[0] === true && roomInfo?.clickPurchase[1] === false) {
      return <COMPLETED>상대방의 거래 완료를 기다리고 있어요. 😃</COMPLETED>;
    }
    return <COMPLETED>거래가 완료된 채팅방입니다. 👍</COMPLETED>;
  };

  return (
    <CHATTINGOPTION>
      <CHATLISTBTN onClick={() => setShowChatList(!showChatList)} />
      {roomInfo && checkPurchase()}
      <ESCAPEBTN onClick={handleEscape} />
    </CHATTINGOPTION>
  );
}
