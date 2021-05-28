import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../_reducer';

import server from '../../../../api/index';

interface BodyType {
  id: string | undefined;
  skip: number;
  limit: number;
  page: number;
}

// limit (10상수)* page(더보기누를때마다 1씩증가) + skip(실시간메시지받을때마다 +1)
// skip은 skip+실시간채팅수 (= chatsLists.length)
// 이렇게 계산하고 서버에 보내서, 데이터를 받았으면 chatsLists는 초기화되어야한다.
function ChatsListLanding({ chatsLists, curRoomId }: any): JSX.Element {
  // 더보기 버튼
  const [render, setRender] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  // const [body, setBody] = useState<BodyType>();

  const { userInfo } = useSelector((state: RootState) => state.user);
  const chattingRoomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getChats();
    console.log('curRoomId', curRoomId);
  }, [curRoomId]);

  useEffect(() => {
    getChats(page);
  }, [page]);

  useEffect(() => {
    if (chattingRoomRef.current) {
      console.log('첫랜딩시 스크롤 맨아래로');
      chattingRoomRef.current.scrollTop = chattingRoomRef.current.scrollHeight;
    }
  }, [render]);

  const getChats = (page = 1) => {
    const body = {
      id: userInfo?.id,
      skip: chatsLists.length,
      limit: 10,
      page,
    };

    server
      .post(`/chats/${curRoomId}`, body)
      .then((response) => {
        console.log('response.data.data', response.data.data);
        setRender([...render, ...response.data.data]);
      })
      .catch(() => '');
  };

  const loadMoreHandler = (): void => {
    setPage((page) => page + 1);
  };

  // 처음에 10개의메시지를받는다. 이때 10개 === limit : 받아올갯수 제한 : 페이지당 몇개
  // limit * page가
  // 예시 _ 10개받고 5개더받는다.  이때 5개 === skip: 실시간으로받아온갯수
  // skip limit page  혼동중
  return (
    <div>
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
        {chatsLists.map((chatList: any) =>
          chatList.chats === '' ? (
            <div key={Math.random()}> </div>
          ) : (
            <div key={Math.random()}>
              <div>{chatList.time}</div>
              <div>{chatList.chats}</div>
              <img alt={chatsLists.image} src={chatList.image} />
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default ChatsListLanding;
