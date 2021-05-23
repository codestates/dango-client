import React, { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components';

import { connectSocket2 } from './Socket';

import MessageInput from './MessageInput';
import { RootState } from "../../../../_reducer";

const LIST = styled.div`
  border: 1px solid;
`

interface UnreadList {
    _id: string,
    type: string,
    message: string,
    postedBy : {
        _id: string,
        nickname: string,
        image: string,
    },
    readBy: | null,
    createdAt: string
}

interface List {
    time: string,
    chats: string,
    image: string,
}

// 더미로 만든 컴포넌트

function ChattingRoomTest2(): JSX.Element {
    
    const [sendChats, setsendChats] = useState<string>("");
    const [chatsLists, setChatsLists] = useState<[List] | any>([]);
    const [timeLists, setTimeLists] = useState<string>('');
    const { userInfo } = useSelector((state: RootState) => state.user);
    const now = new Date();

    // server.post(`/chat/${userInfo.roomId}`, userInfo.id)
    //       .then(response => {
    //           const messageList = response.data;
    //           setUnreadChats(messageList)
    //       });
    //       .catch(()=>'');


    const createNewChats = (message: string): void => {
        setsendChats(message);
        setTimeLists(`${now.getHours() < 12 ? '오전': '오후'} ${now.getHours() === 0 ? `12`: `${now.getHours()}`} : ${now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()}`)
        const newChats = {
            time: timeLists,
            chats: message,
            image: userInfo?.image
        }
        setChatsLists([...chatsLists, newChats]);
    };

    useEffect(() => {
        // 같은 방으로 연결
        connectSocket2.emit('joinroom', ['logout-user1', 'logout-user2', 'logout-user3', 'user1-Oid']);
        connectSocket2.on('hasjoined', (data) => {
            console.log('ChattingRoom2 -> ChattingRoom2 hasjoined가 되었나?', data)
        });
    },[]);
    
    useEffect(()=> {
        // 메세지가 바뀔 때 마다 바로 내 메세지는 서버쪽 소켓으로 보내주고 상대방 메세지도 서버쪽 소켓에서 받아온다.
        connectSocket2.emit("messageToOther", 'user1-Oid' ,sendChats);
        connectSocket2.on('messageFromOther', (receivedChats) => {
            createNewChats(receivedChats)
            console.log('::::받아온 메세지::::', receivedChats)
        });
    },[sendChats])
    


    return (
        <>
          {/* <div className="unreadChats">
            {unreadChats.map((chats: any) => (
                <div key={chats.postedBy._id}>
                  <div>
                    {chats.postedBy.nickname}
                  </div>
                  <div>
                    {chats.postedBy.image}
                  </div>
                  <div>
                    {chats.message}
                  </div>
                </div>
            ))}
          </div> */}
          <div className="chats">
            <LIST>
              {chatsLists.map((chatList: any) => (
                  <div key={chatList.chats}>
                    <div>
                        {chatList.time}
                    </div>
                    <div>
                        {chatList.chats}
                    </div>
                    <div>
                        {chatList.image}
                    </div>
                  </div>
              ))}
            </LIST>
            <div>
              <MessageInput setsendChats={setsendChats}/>
            </div>
          </div>
        </>
    )
} 

export default memo(ChattingRoomTest2);