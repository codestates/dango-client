import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../_reducer';
import server from '../../../../api/index';
import { clickMoreBtn, getChattingData } from '../../../../_reducer/chattings';

// TODO: 프로필 이미지를 읽어오기전에 채팅이 랜더되면서 뒤늦게 이미지가 나타나서 스크롤이 위로 밀린다.
// image의 onLoad에 함수를 넣어 상태를 바꾼뒤에 랜더시키는 방법이있는것같은데 일단 나중에..
function ChatsListLanding({ chatsLists, setChatsLists, curRoomId, chattingRoomRef }: any): JSX.Element {
  const dispatch = useDispatch();
  const { page, render } = useSelector((state: RootState) => state.chattings, shallowEqual);
  const { userInfo } = useSelector((state: RootState) => state.user, shallowEqual);
  const [loading, setLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    console.log('첫랜더할때 chatsLists', chatsLists);
    console.log('첫 랜더할때 render', render);
    setChatsLists([]);
    getChats();
  }, [curRoomId]);

  useEffect(() => {
    getChats(page);
  }, [page]);

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

  // useEffect(() => {
  //   if(loading){
  //     return
  //   }
  //   if (chattingRoomRef.current) {
  //     console.log('loding ---- use effect');
  //     console.log('ddddd', chattingRoomRef.current.scrollHeight);
  //     if (imgRef.current) {
  //       console.log('img clientHeight::::::', imgRef.current.clientHeight);
  //     }
  //     chattingRoomRef.current.scrollTop = chattingRoomRef.current.scrollHeight;
  //   }
  // }, [loading]);

  return (
    <div>
      {loading ? (
        '로딩중'
      ) : (
        <>
          <div>
            <button type="button" onClick={loadMoreHandler}>
              {' '}
              더보기{' '}
            </button>
            <div>
              {render.map((chat: any) => (
                <div key={Math.random()}>
                  <div>{`${new Date(chat.createdAt).getHours() < 12 ? '오전' : '오후'} ${
                    new Date(chat.createdAt).getHours() === 0
                      ? `12`
                      : new Date(chat.createdAt).getHours() > 12
                      ? `${new Date(chat.createdAt).getHours() - 12}`
                      : `${new Date(chat.createdAt).getHours()}`
                  } : ${
                    new Date(chat.createdAt).getMinutes() < 10
                      ? `0${new Date(chat.createdAt).getMinutes()}`
                      : new Date(chat.createdAt).getMinutes()
                  }`}</div>
                  <div>{chat.message}</div>
                  <img alt={chat.postedBy.image} src={chat.postedBy.image} />
                </div>
              ))}
            </div>
          </div>

          <div>
            {chatsLists.map((chatList: any) => (
              <div key={Math.random()}>
                <div>{chatList.time}</div>
                <div>{chatList.chats}</div>
                <img alt={chatsLists.image} src={chatList.image} onLoad={() => setLoading(false)} ref={imgRef} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ChatsListLanding;
