import React, { useEffect, useState, memo, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import server from '../../../../api/index';
import { RootState } from '../../../../_reducer';
import { newChattingRoom, getChattingData } from '../../../../_reducer/chattings';

import getChatTime from '../../../../utils/getChatTime';
import MessageInput from './MessageInput';
import Chats from './Chats';
import Loading from '../../LandingPage/Sections/Loading';

const CHATTINGROOM = styled.div`
  flex: 9;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: hidden;
`;
const CHATLANDING = styled.div`
  flex: 9;
  overflow-y: scroll;
  padding: 0.5rem;
`;

const CHATINPUT = styled.div`
  flex: 1;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
`;

export interface ChatInfo {
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

export interface ChatsLists {
  id: string;
  type: 'text' | 'confirm' | 'init';
  time: string;
  message: string;
  image: string;
}
interface ChattingRoomProps {
  curOtherId: string;
  curRoomId: string;
  connectSocket: any;
  lastChat: ChatInfo | null;
}

function ChattingRoom({ curOtherId, curRoomId, connectSocket, lastChat }: ChattingRoomProps): JSX.Element {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user, shallowEqual);

  const [chatsLists, setChatsLists] = useState<ChatsLists[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastData, setLastData] = useState(false);

  const chattingRoomRef = useRef<HTMLDivElement>(null);
  const currentScroll = useRef<number>(0);

  useEffect(() => {
    if (curRoomId !== '') {
      getChats();
    }
    return () => {
      dispatch(newChattingRoom());
      setChatsLists([]);
    };
  }, [curRoomId]);

  useEffect(() => {
    if (lastChat && lastChat.roomId === curRoomId) {
      createNewChats(lastChat);
    }
  }, [lastChat]);

  const getChats = (page = 0, skip = 0) => {
    const body = {
      id: userInfo?.id,
      skip,
      limit: page === 0 ? 20 : 10,
      page,
    };

    server
      .post(`/chats/${curRoomId}`, body)
      .then((response) => {
        if (chattingRoomRef.current) {
          currentScroll.current = chattingRoomRef.current.clientHeight;
        }
        return response;
      })
      .then((response) => {
        dispatch(getChattingData({ data: response.data.data }));

        if (page === 0) {
          response.data.data.length < 20 ? setLastData(true) : setLastData(false);
        } else {
          response.data.data.length < 10 ? setLastData(true) : setLastData(false);
        }
      })
      .then(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          if (chattingRoomRef.current) {
            if (page === 0) {
              chattingRoomRef.current.scrollTop = chattingRoomRef.current.scrollHeight;
            } else {
              chattingRoomRef.current.scrollTop = currentScroll.current;
            }
          }
        }, 200);
      })
      .catch(() => '');
  };

  const createNewChats = async (lastChat: ChatInfo) => {
    const newChat = {
      id: lastChat.postedBy._id,
      type: lastChat.type,
      time: getChatTime(lastChat.createdAt),
      message: lastChat.message,
      image: lastChat.postedBy.image,
    };
    await setChatsLists([...chatsLists, newChat]);

    if (chattingRoomRef.current) {
      chattingRoomRef.current.scrollTop = chattingRoomRef.current.scrollHeight;
    }
  };

  const callback = (message: string) => {
    connectSocket.emit('messageToOther', curOtherId, message, curRoomId);
  };

  return (
    <CHATTINGROOM>
      <CHATLANDING ref={chattingRoomRef}>
        <Chats
          chatsLists={chatsLists}
          getChats={getChats}
          loading={loading}
          setLoading={setLoading}
          chattingRoomRef={chattingRoomRef}
          lastData={lastData}
        />
      </CHATLANDING>
      <CHATINPUT>
        <MessageInput callback={callback} />
      </CHATINPUT>
    </CHATTINGROOM>
  );
}
export default ChattingRoom;
