import styled from 'styled-components';

// interface LiType {
//   idx: number;
//   liIdx: number;
// }

// const LI = styled.li<LiType>`
//   // background-color: rgba(198, 191, 191, 0.1);
//   // background-color: ${(props) => props.idx === props.liIdx && '#835af1'};
//   color: ${(props) => props.idx === props.liIdx && '#835af1'};
//   color: ${(props) => props.idx === 0 && props.liIdx === -2 && '#835af1'};
//   cursor: pointer;
//   padding: 0.5rem;
// `;
interface CHATPROPS {
  postedUserId?: string;
  userId?: string | undefined;
}

export const RENDER = styled.div`
  width: 100%;
`;
export const MOREBTNBOX = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const MOREBTN = styled.button``;
export const CHAT = styled.div<CHATPROPS>`
  border: 1px solid blue;
  display: flex;
  flex-direction: ${(props) => (props.postedUserId === props.userId ? 'row-reverse' : 'row')};
  background-color: ${(props) => (props.postedUserId === props.userId ? 'yellow' : 'white')};
`;
