import React, { useEffect, useState, memo } from "react";
import server from '../../../../api/index';
// import { connectSocket } from './Socket';

import MessageInput from './MessageInput';


// 실제로 기능구현이 되는 컴포넌트

function ChattingRoom(): JSX.Element {
    
    const [sendChats, setsendChats] = useState<string>("");
    const [chatsLists, setChatsLists] = useState<[[]] | any>([]);
    const [timeLists, setTimeLists] = useState<string>('');
    const now = new Date();

    // server.post(`/chat/${roomId}`)
    //     .then(response=> {})


    const createNewChats = (message: string): void => {
        setsendChats(message);
        setTimeLists(`${now.getHours() < 12 ? 'AM': 'PM'} ${now.getHours()} : ${now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()}`)
        setChatsLists([...chatsLists, timeLists ,message]);
    };

    // useEffect(() => {
    //     // 같은 방으로 연결
    //     connectSocket.emit('joinroom', ['logout-user1', 'logout-user2', 'logout-user3', 'user1-Oid']);
    //     connectSocket.on('hasjoined', (data) => {
    //         console.log('ChattingRoom2 -> ChattingRoom2 hasjoined가 되었나?', data)
    //     });
    // },[]);
    
    // useEffect(()=> {
    //     // 메세지가 바뀔 때 마다 바로 내 메세지는 서버쪽 소켓으로 보내주고 상대방 메세지도 서버쪽 소켓에서 받아온다.
    //     connectSocket.emit("messageToOther", 'user1-Oid' ,sendChats);
    //     connectSocket.on('messageFromOther', (receivedChats) => {
    //         console.log(receivedChats)
    //         createNewChats(receivedChats)
    //     });
    // },[sendChats])
    


    return (
        <>
          <div>
            <div>
              {chatsLists.map((chatList: []) => chatList)}
            </div>
          </div>
          <div>
            <MessageInput setsendChats={setsendChats} />
          </div> 
        </>
    )
} 

export default memo(ChattingRoom);