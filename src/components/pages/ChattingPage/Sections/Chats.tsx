import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ChatsLists } from './ChattingRoom';
import { RootState } from '../../../../_reducer';
import { newChattingRoom, clickMoreBtn, getChattingData } from '../../../../_reducer/chattings';
import server from '../../../../api/index';
import getChatTime from '../../../../utils/getChatTime';
import { RENDER, MOREBTNBOX, MOREBTN, CHAT, WRAPIMG, PROFILEIMG, MESSAGEBOX, MESSAGE, TIME } from './ChatsStyle';

// TODO: 프로필 이미지를 읽어오기전에 채팅이 랜더되면서 뒤늦게 이미지가 나타나서 스크롤이 위로 밀린다.
// image의 onLoad에 함수를 넣어 상태를 바꾼뒤에 랜더시키는 방법이있는것같은데 일단 나중에..

interface ChatsProps {
  chatsLists: ChatsLists[];
  setChatsLists: (chatsLists: ChatsLists[]) => void;
  curRoomId: string;
  chattingRoomRef: any;
}

function Chats({ chatsLists, setChatsLists, curRoomId, chattingRoomRef }: ChatsProps): JSX.Element {
  const dispatch = useDispatch();
  const { page, render } = useSelector((state: RootState) => state.chattings, shallowEqual);
  const { userInfo } = useSelector((state: RootState) => state.user, shallowEqual);
  const [loading, setLoading] = useState(true);
  // const [imageLoad, setImageLoad] = useState(false);

  useEffect(() => {
    console.log('render:::::::::', render);
    if (page === 0) {
      setChatsLists([]);
    }
    getChats(page);
  }, [curRoomId, page]);

  const getChats = useCallback(
    (page = 0) => {
      const body = {
        id: userInfo?.id,
        skip: chatsLists.length,
        limit: 10,
        page,
      };

      server
        .post(`/chats/${curRoomId}`, body)
        .then((response) => {
          dispatch(getChattingData({ data: response.data.data }));
        })
        .then(() => {
          setLoading(false);
          if (chattingRoomRef.current) {
            if (page === 0) {
              chattingRoomRef.current.scrollTop = chattingRoomRef.current.scrollHeight;
            } else {
              chattingRoomRef.current.scrollTop = 0;
            }
          }
        })
        .catch((err) => console.log(err));
    },
    [userInfo, chatsLists, page, curRoomId, render],
  );

  const loadMoreHandler = useCallback((): void => {
    dispatch(clickMoreBtn());
  }, [page]);

  return (
    <RENDER>
      {!loading /* && imageLoad  */ ? (
        <RENDER>
          <MOREBTNBOX>
            <MOREBTN type="button" onClick={loadMoreHandler}>
              더보기
            </MOREBTN>
          </MOREBTNBOX>
          <div>
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
          </div>
        </RENDER>
      ) : (
        '로딩중'
      )}
    </RENDER>
  );
}

export default Chats;
