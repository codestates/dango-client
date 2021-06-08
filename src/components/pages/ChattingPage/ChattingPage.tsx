import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../_reducer';
import { setIsFirstChat } from '../../../_reducer/chattings';
import { initCount } from '../../../_reducer/user';

import ChattingOption from './Sections/ChattingOption';
import ChattingRoom from './Sections/ChattingRoom';
import Modal from '../../../utils/modal';

import {
  CONTAINER,
  CHATLIST,
  CHAT,
  USERBOX,
  WRAPIMG,
  PROFILEIMG,
  USER,
  COUNT,
  NUMBER,
  CHATLISTTITLE,
  CHATLISTTEXT,
  CHATLISTESC,
  EMPTYBOX,
  EMPTYROOM,
  NOROOMBTN,
} from './ChattingPageStyle';

export interface RoomType {
  talentId: string;
  roomId: string;
  count: number;
  otherId: string;
  otherNickname: string;
  profileImage: string;
  clickPurchase: boolean[];
  otherIsJoined: boolean;
}
interface RoomInfo {
  userId: string | undefined;
  chatRoomId: string;
  otherId: string;
  talentId: string;
  clickPurchase: boolean[];
  otherIsJoined: boolean;
}

interface ChatInfo {
  createdAt: string;
  message: string;
  postedBy: {
    image: string;
    nickname: string;
    _id: string;
  };
  roomId: string;
  type: 'text' | 'confirm' | 'init';
  _id: string;
}

interface Props {
  connectSocket: any;
  lastChat: ChatInfo | null;
  setLastChat: (any: any) => void;
}

function ChattingPage({ connectSocket, lastChat, setLastChat }: Props): JSX.Element {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { isFromDetail, isFirstChat, talentId } = useSelector((state: RootState) => state.chattings);
  const [curOtherId, setCurOtherId] = useState<string>('');
  const [curRoomId, setCurRoomId] = useState<string>('');
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
  const [showChatList, setShowChatList] = useState<boolean>(false);
  const [clickedRoom, setClickedRoom] = useState<number>(-1);

  const roomIdList = userInfo?.chatRooms.map((chatRoom: RoomType) => chatRoom.roomId);
  const otherList = userInfo?.chatRooms.map((chatRoom: RoomType) => chatRoom.otherId);
  const talentIdList = userInfo?.chatRooms.map((chatRoom: RoomType) => chatRoom.talentId);

  useEffect(() => {
    if (isFromDetail) {
      if (isFirstChat) {
        setCurOtherId(otherList[otherList.length - 1]);
        setCurRoomId(roomIdList[roomIdList.length - 1]);
        dispatch(setIsFirstChat({ isFromDetail: false, isFirstChat: false, talentId }));
      } else {
        const chatIndex = talentIdList.indexOf(talentId);
        setCurOtherId(otherList[chatIndex]);
        setCurRoomId(roomIdList[chatIndex]);
      }
    }
    if (curRoomId !== '') {
      setRoomInfo(getRoomInfo());
    }
  }, [userInfo, connectSocket]);

  useEffect(() => {
    if (curRoomId === '') {
      return;
    }
    setRoomInfo(getRoomInfo());
    connectSocket.emit('joinchat', curOtherId, curRoomId);
    return () => {
      connectSocket.emit('leavechat', curOtherId, curRoomId);
      connectSocket.emit('updateReadBy', curOtherId, curRoomId);
    };
  }, [curRoomId]);

  const getRoomInfo = () => {
    const currentRoomInfo = userInfo?.chatRooms.find((room: RoomType) => room.roomId === curRoomId);
    if (currentRoomInfo) {
      return {
        userId: userInfo?.id,
        chatRoomId: curRoomId,
        otherId: currentRoomInfo.otherId,
        talentId: currentRoomInfo.talentId,
        clickPurchase: currentRoomInfo.clickPurchase,
        otherIsJoined: currentRoomInfo.otherIsJoined,
      };
    }
    return null;
  };

  const changeRoom = (index: number): void => {
    setCurOtherId(otherList[index]);
    setCurRoomId(roomIdList[index]);
    setShowChatList(false);
    setClickedRoom(index);
    dispatch(initCount({ index }));
    setLastChat(null);
  };

  return (
    <>
      <Modal />
      <CONTAINER>
        <CHATLIST show={showChatList}>
          <CHATLISTTITLE>
            <CHATLISTTEXT>채팅 목록</CHATLISTTEXT>
            <CHATLISTESC show={showChatList} onClick={() => setShowChatList(false)}>
              ✕
            </CHATLISTESC>
          </CHATLISTTITLE>
          {!userInfo && <USER clicked={false}>로그인이 필요한 서비스입니다.</USER>}
          {userInfo?.chatRooms.length === 0 && (
            <USER clicked={false} style={{ textAlign: 'center' }}>
              현재 참여하고 계신 채팅방이 없습니다! <br />
              <br />
              지금 바로 우리동네 이웃들과 재능을 나눠보세요!!
              <br />
              <br />
              😊
            </USER>
          )}
          {userInfo?.chatRooms?.map((chatRoom: RoomType, index: number) => (
            <USERBOX key={index} onClick={() => changeRoom(index)} clicked={clickedRoom === index}>
              <WRAPIMG>
                <PROFILEIMG src={chatRoom.profileImage} alt="profile image," />
              </WRAPIMG>
              <USER clicked={clickedRoom === index}>{chatRoom.otherNickname}</USER>
              <COUNT value={chatRoom.count}>
                <NUMBER>{chatRoom.count}</NUMBER>
              </COUNT>
            </USERBOX>
          ))}
        </CHATLIST>
        <CHAT>
          {curRoomId && (
            <ChattingOption
              roomInfo={roomInfo}
              setCurRoomId={setCurRoomId}
              setLastChat={setLastChat}
              showChatList={showChatList}
              setShowChatList={setShowChatList}
              connectSocket={connectSocket}
            />
          )}
          {curRoomId ? (
            <ChattingRoom
              curOtherId={curOtherId}
              curRoomId={curRoomId}
              connectSocket={connectSocket}
              lastChat={lastChat}
            />
          ) : (
            <EMPTYBOX>
              <NOROOMBTN onClick={() => setShowChatList(!showChatList)} />
              <EMPTYROOM />
            </EMPTYBOX>
          )}
        </CHAT>
      </CONTAINER>
    </>
  );
}

export default ChattingPage;
