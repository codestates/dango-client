import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../_reducer';

import server from '../../../../api/index';

interface BodyType {
  id: string | undefined;
  skip: number;
  limit: number;
  page: number;
}

function ChatsListLanding({ chatsLists, curRoomId }: any): JSX.Element {
  // 더보기 버튼
  const [render, setRender] = useState<any>([]);
  const [Skip, setSkip] = useState<number>(chatsLists.length || 10);
  const [Limit, setLimit] = useState<number>(10);
  const [Page, setPage] = useState<number>(0);

  const { userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const body = {
      id: userInfo?.id,
      skip: Skip,
      limit: Limit,
      page: Page,
    };
    getChats(body);
    setPage(Page + 1);
  }, [curRoomId]);

  const getChats = async (body: BodyType) => {
    await server

      .post(`/chats/${curRoomId}`, body)
      .then((response) => {
        setRender([...response.data.data, ...render]);
      })
      .catch(() => '');
  };

  const loadMoreHandler = (): void => {
    const skip = Skip + Limit;
    setPage(Page + 1);
    const body = {
      id: userInfo?.id,
      skip: Skip,
      limit: Limit,
      page: Page,
    };
    getChats(body);
    setSkip(skip);
  };

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
