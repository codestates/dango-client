// import { useSelector } from "react-redux";
import { io } from "socket.io-client";
// import { RootState } from "../../../../_reducer";

// const { userInfo } = useSelector((state: RootState) => state.user)

// 리렌더링 방지 process.env.REACT_APP_API_URL?clientId=${_id}
// const socket = io(`process.env.REACT_APP_API_URL?clientId=${userInfo.id}`, {
//     transports:["websocket"],
//     path: "/socket.io",
//     withCredentials: true,
// });

const socket1 = io(`${process.env.REACT_APP_API_URL}/?clientId=user1-Oid`, {
    transports: ['websocket'],
    withCredentials: true,
    path: '/socket.io',
});

const socket2 = io(`${process.env.REACT_APP_API_URL}/?clientId=user2-Oid`, {
    transports: ['websocket'],
    withCredentials: true,
    path: '/socket.io',
});


// export const connectSocket = socket.on("connect", ()=> {console.log('connectSocket', socket.id)})
export const connectSocket1 = socket1.on("connect", ()=> {console.log('connectSocket1', socket1.id)})
export const connectSocket2 = socket2.on("connect", ()=> {console.log('connectSocket2', socket2.id)})


