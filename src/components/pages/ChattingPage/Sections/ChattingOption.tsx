import React, { useState, useEffect, SetStateAction } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ChatInfo } from './ChattingRoom';
import { RootState } from '../../../../_reducer';
import { openModal } from '../../../../_reducer/modal';
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
  } | null;
  setCurRoomId: (roomId: string) => void;
  setLastChat: (lastChat: ChatInfo) => void;
  showChatList: boolean;
  setShowChatList: (boolean: boolean) => void;
  connectSocket: any;
}

export default function ChattingOption({
  roomInfo,
  setCurRoomId,
  setLastChat,
  showChatList,
  setShowChatList,
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

    // setLastChat(response.data.confirmedChat);
    if (roomInfo) {
      connectSocket.emit('confirm', roomInfo.talentId, roomInfo.userId, roomInfo.chatRoomId, roomInfo.otherId);
      // dispatch(purchaseComplete({ talentId: roomInfo.talentId, confirmed: response.data.confirmed }));

      dispatch(openModal({ type: 'ok', text: '거래완료 신청이 성공적으로 접수되었습니다!' }));
    }
  };

  const handleEscape = () => {
    const config = {
      data: {
        userId: roomInfo?.userId,
        otherId: roomInfo?.otherId,
        chatRoomId: roomInfo?.chatRoomId,
      },
    };
    server
      .delete('/chats/delete', config)
      .then(() => setCurRoomId('')) // 방을 나갔으므로 curRoomId도 초기값으로 초기화해준다.
      .then(() => {
        if (roomInfo?.talentId) {
          dispatch(escapeRoom({ talentId: roomInfo.talentId }));
        }
        dispatch(openModal({ type: 'ok', text: '채팅방 나가기 완료' }));
      })
      .catch((err) => {
        if (!err.response) {
          console.log(err);
          return;
        }
        dispatch(openModal({ type: 'error', text: err.response.data.message }));
      });
  };

  const checkPurchase = () => {
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
