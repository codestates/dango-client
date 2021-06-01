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
interface ChatProps {
  mine: boolean;
  notice?: boolean;
}

export const RENDER = styled.div`
  width: 100%;
  padding: 0.3rem;
  /* height: 100%; */
`;
export const MOREBTNBOX = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const MOREBTN = styled.button``;

export const CHAT = styled.div<ChatProps>`
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: ${(props) => (props.mine ? 'row-reverse' : 'row')};
  align-items: flex-start;
  /* height: 90%; */
  margin: 1% 0px;
  min-height: 4.5vw;
`;
export const WRAPIMG = styled.div<ChatProps>`
  // 프로필이미지 크기
  width: 4.2vw; // 5vw * 0.9
  height: 4.2vw;
  max-width: 60px;
  max-height: 60px;
  min-width: 44px;
  min-height: 44px;
  border-radius: 70%;
  overflow: hidden;
`;
export const PROFILEIMG = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
export const MESSAGEBOX = styled.div<ChatProps>`
  /* border: 1px solid; */
  width: 70%;
  height: auto;
  min-height: 4.5vw; // 부모 CHAT에 꽉맞춘다.
  flex-direction: ${(props) => (props.mine ? 'row-reverse' : 'row')};

  display: flex;
  justify-content: stretch; // ??
  align-items: flex-end;
`;
export const MESSAGE = styled.div<ChatProps>`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  position: relative;
  /* display: inline-block; */
  padding: 3%;
  margin-bottom: 1%;
  color: ${(props) => (props.mine ? 'whitesmoke' : 'grey')};
  /* min-height: 1vw; */
  width: auto;
  min-width: 10%;
  max-width: 90%;
  border-radius: 1rem;
  background-color: ${(props) => (props.mine ? ({ theme }) => theme.colors.purple : 'white')};
  ${(props) => {
    if (props.notice) {
      return 'background-color: #ab8406; color:whitesmoke; font-weight:bold;';
    }
    return undefined;
  }}
  white-space: pre-wrap;
  margin: 1% 1vw;

  &:after {
    content: '';
    position: absolute;
    border: 0 solid transparent;
    border-top: ${(props) =>
      props.mine ? ({ theme }) => `0.9vw solid ${theme.colors.purple}` : ' 0.75vw solid white'};
    border-radius: 0 80% 0;
    width: 1vw;
    height: 1.5vw;

    ${(props) => {
      if (props.mine) {
        return 'top: 0; right:0; transform: rotate(235deg) translateX(-1.15vw) scaleX(-1);';
      }
      return 'top: 0; left:0; transform: rotate(145deg) translateX(1vw);';
    }}

    ${(props) => {
      if (props.notice) {
        return 'border-top-color: #ab8406;';
      }
      return undefined;
    }}
  }
  //top: 50%;
  /* left: 50%;
  transform: translate(-50%, -50%); */
  //translate(-40%,-150%)
`;
export const TIME = styled.div`
  color: grey;
  font-size: 0.8rem;
  margin-bottom: 1vw;
  min-width: 3.7rem;
`;
