import React, { useState, useEffect, SetStateAction } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ChatInfo } from './ChattingRoom';
import { RootState } from '../../../../_reducer';
import { openModal } from '../../../../_reducer/modal';
import { purchaseComplete, escapeRoom } from '../../../../_reducer/user';
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
}

export default function ChattingOption({
  roomInfo,
  setCurRoomId,
  setLastChat,
  showChatList,
  setShowChatList,
}: ChattingOptionProps): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleComplete = () => {
    const data = {
      talentId: roomInfo?.talentId,
      userId: roomInfo?.userId,
      chatroomId: roomInfo?.chatRoomId,
    };
    server
      .post('/users/confirm', data)
      .then((response) => {
        setLastChat(response.data.confirmedChat);
        if (roomInfo?.talentId) {
          dispatch(purchaseComplete({ talentId: roomInfo.talentId, confirmed: response.data.confirmed }));
        }
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

  // 현재유저가 해당채팅방에서 구매중/판매중인사람인지 거래가 끝난사람인지 확인
  // FIXME: confirmed에 접근해서 내유저정보가있는지확인
  // const checkSellingOrBuying = (): boolean => {
  //   const isBuying = buying.indexOf(roomInfo?.talentId) !== -1;
  //   const isSelling = selling.indexOf(roomInfo?.talentId) !== -1;

  //   // 판매중도 아니고 구매중도 아니면 거래가 끝난 것이므로 false를 리턴한다.
  //   if (!isBuying && !isSelling) {
  //     return false;
  //   }
  //   return true;
  // };

  // 채팅방나가기누르면 user정보에서 buying에서 지워주고, chatRooms에서도 지워줘야함.
  // const { userId, otherId, chatRoomId } = req.body;
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
      return <COMPLETEBTN onClick={handleComplete}>거래완료</COMPLETEBTN>;
    }
    if (roomInfo?.clickPurchase[1] === false) {
      return <COMPLETED>상대방의 거래완료를 기다리고있어요 😃</COMPLETED>;
    }
    return <COMPLETED>거래가 완료된 채팅방입니다. 👍</COMPLETED>;
  };

  return (
    <CHATTINGOPTION>
      <CHATLISTBTN fill="grey" onClick={() => setShowChatList(!showChatList)} />
      {roomInfo && checkPurchase()}
      <ESCAPEBTN onClick={handleEscape} fill="#a68bf6" />
    </CHATTINGOPTION>
  );
}
