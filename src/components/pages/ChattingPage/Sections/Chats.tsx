import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../_reducer';
import { newChattingRoom, clickMoreBtn, getChattingData } from '../../../../_reducer/chattings';
import server from '../../../../api/index';
import getChatTime from '../../../../utils/getChatTime';
import { RENDER, MOREBTNBOX, MOREBTN, CHAT } from './ChatsStyle';

// TODO: 프로필 이미지를 읽어오기전에 채팅이 랜더되면서 뒤늦게 이미지가 나타나서 스크롤이 위로 밀린다.
// image의 onLoad에 함수를 넣어 상태를 바꾼뒤에 랜더시키는 방법이있는것같은데 일단 나중에..
function Chats({ chatsLists, setChatsLists, curRoomId, chattingRoomRef }: any): JSX.Element {
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
      console.log('getChats실행될 때 chatlist', chatsLists);
      const body = {
        id: userInfo?.id,
        skip: chatsLists.length,
        limit: 10,
        page,
      };
      console.log('서버에보내는body', body);
      console.log('서버에보내는roomId', curRoomId);

      server
        .post(`/chats/${curRoomId}`, body)
        .then((response) => {
          console.log('response.data.data', response.data.data);
          dispatch(getChattingData({ data: response.data.data }));
        })
        .then(() => {
          setLoading(false);
          if (chattingRoomRef.current) {
            // if (page === 0) {
            chattingRoomRef.current.scrollTop = chattingRoomRef.current.scrollHeight;
            // } else {
            // chattingRoomRef.current.scrollTop = chattingRoomRef.current.scrollHeight + 1000;
            // }
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
            {render.map((chat: any, idx) => (
              <CHAT key={idx} postedUserId={chat.postedBy._id} userId={userInfo?.id}>
                <div>{getChatTime(chat.createdAt)}</div>
                <div>{chat.message}</div>
                <img alt={chat.postedBy.image} src={chat.postedBy.image} />
              </CHAT>
            ))}
            {chatsLists.map((chatList: any, idx: number) => (
              <CHAT key={idx}>
                <div>chatLists에서 온거임</div>
                <div>{chatList.time}</div>
                <div>{chatList.chats}</div>
                <img alt={chatsLists.image} src={chatList.image} />
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
