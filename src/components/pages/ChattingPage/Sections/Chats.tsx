import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ChatsLists } from './ChattingRoom';
import { RootState } from '../../../../_reducer';
import { clickMoreBtn } from '../../../../_reducer/chattings';
import getChatTime from '../../../../utils/getChatTime';
import { RENDER, CHAT, WRAPIMG, PROFILEIMG, MESSAGEBOX, MESSAGE, TIME } from './ChatsStyle';
import Loading from '../../LandingPage/Sections/Loading';

// TODO: 프로필 이미지를 읽어오기전에 채팅이 랜더되면서 뒤늦게 이미지가 나타나서 스크롤이 위로 밀린다.
// image의 onLoad에 함수를 넣어 상태를 바꾼뒤에 랜더시키는 방법이있는것같은데 일단 나중에..

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
  const { page, render } = useSelector((state: RootState) => state.chattings, shallowEqual);
  const { userInfo } = useSelector((state: RootState) => state.user, shallowEqual);
  const currentScroll = useRef<number>(0);

  useEffect(() => {
    // 더보기를 눌렀을때 서버에서 메시지 10개를 더 받아온다.
    // page가 0일때는 방에 처음 들어왔을 때이므로, room컴포넌트의 함수만 실행되도록한다.
    if (page === 0) {
      return;
    }
    console.log('무한무한');
    getChats(page, chatsLists.length);
  }, [page]);

  const infiniteScroll = () => {
    if (chattingRoomRef.current) {
      const { scrollHeight } = chattingRoomRef.current;
      const { scrollTop } = chattingRoomRef.current;
      const { clientHeight } = chattingRoomRef.current;

      console.log('scrollHeight:::::', scrollHeight);
      console.log('scrollTop::::::', scrollTop);
      console.log('clientHeight::::::', clientHeight);
      console.log('------------------------------------------------------------------------------------------');

      if (scrollTop === 0 && !lastData) {
        console.log('디스패치 클릭모어버튼');
        // if (page !== 0) {
        //   setLoading(true);
        // }
        dispatch(clickMoreBtn());
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll, true);
    return () => window.removeEventListener('scroll', infiniteScroll, true);
  }, [infiniteScroll]);

  return (
    <RENDER>
      {loading ? (
        <Loading loading={true} size="12vh" />
      ) : (
        [
          render.map((chat, idx) => (
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
          )),
          chatsLists.length > 0 &&
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
            )),
        ]
      )}
    </RENDER>
  );
}

export default Chats;
