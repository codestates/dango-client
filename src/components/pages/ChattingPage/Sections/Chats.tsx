import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ChatsLists } from './ChattingRoom';
import { RootState } from '../../../../_reducer';
import { nextPage } from '../../../../_reducer/chattings';
import getChatTime from '../../../../utils/getChatTime';
import { RENDER, CHAT, WRAPIMG, PROFILEIMG, MESSAGEBOX, MESSAGE, TIME } from './ChatsStyle';
import Loading from '../../LandingPage/Sections/Loading';

interface ChatsProps {
  chatsLists: ChatsLists[];
  getChats: any;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  chattingRoomRef: React.RefObject<HTMLDivElement>;
  lastData: boolean;
}

function Chats({ chatsLists, getChats, loading, setLoading, chattingRoomRef, lastData }: ChatsProps): JSX.Element {
  const dispatch = useDispatch();
  const { page, render, otherId, roomId, isJoined } = useSelector((state: RootState) => state.chattings, shallowEqual);
  const { userInfo } = useSelector((state: RootState) => state.user, shallowEqual);
  const currentScroll = useRef<number>(0);

  useEffect(() => {
    if (page === 0) {
      if (chattingRoomRef.current) {
        chattingRoomRef.current.scrollTop = chattingRoomRef.current.scrollHeight;
      }

      return;
    }
    getChats(page, chatsLists.length);
  }, [page]);

  const infiniteScroll = () => {
    if (chattingRoomRef.current) {
      const { scrollTop } = chattingRoomRef.current;
      if (scrollTop < 25 && !lastData) {
        dispatch(nextPage());
      }
    }
  };

  useEffect(() => {
    chattingRoomRef.current?.addEventListener('scroll', infiniteScroll, true);
    return () => chattingRoomRef.current?.removeEventListener('scroll', infiniteScroll, true);
  }, [infiniteScroll]);

  return (
    <>
      {loading ? (
        <Loading size="12vh" />
      ) : (
        <RENDER>
          {render.map((chat, idx) => (
            <CHAT key={idx} mine={chat.postedBy._id === userInfo?.id}>
              <WRAPIMG mine={chat.postedBy._id === userInfo?.id}>
                <PROFILEIMG alt={chat.postedBy.image} src={chat.postedBy.image} />
              </WRAPIMG>
              <MESSAGEBOX mine={chat.postedBy._id === userInfo?.id}>
                <MESSAGE mine={chat.postedBy._id === userInfo?.id} notice={chat.type === 'confirm'}>
                  {chat.message}
                </MESSAGE>
                <TIME>{getChatTime(chat.createdAt)}</TIME>
              </MESSAGEBOX>
            </CHAT>
          ))}
          {chatsLists.length > 0 &&
            chatsLists.map((chat, idx) => (
              <CHAT key={idx} mine={chat.id === userInfo?.id}>
                <WRAPIMG mine={chat.id === userInfo?.id}>
                  <PROFILEIMG alt={chat.image} src={chat.image} />
                </WRAPIMG>
                <MESSAGEBOX mine={chat.id === userInfo?.id}>
                  <MESSAGE mine={chat.id === userInfo?.id} notice={chat.type === 'confirm'}>
                    {chat.message}
                  </MESSAGE>
                  <TIME>{chat.time}</TIME>
                </MESSAGEBOX>
              </CHAT>
            ))}
        </RENDER>
      )}
    </>
  );
}

export default Chats;
