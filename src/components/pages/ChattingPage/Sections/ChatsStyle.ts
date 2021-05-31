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
interface mineProps {
  mine: boolean;
}

interface MessageProps {
  mine: boolean;
}

export const RENDER = styled.div`
  width: 100%;
  /* height: 100%; */
`;
export const MOREBTNBOX = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const MOREBTN = styled.button``;

export const CHAT = styled.div<mineProps>`
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: ${(props) => (props.mine ? 'row-reverse' : 'row')};
  align-items: flex-start;
  /* height: 90%; */
  margin: 1% 0px;
  min-height: 4.5vw;
`;
export const WRAPIMG = styled.div<mineProps>`
  // 프로필이미지 크기
  width: 4.5vw; // 5vw * 0.9
  height: 4.5vw;
  border-radius: 70%;
  overflow: hidden;
`;
export const PROFILEIMG = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
export const MESSAGEBOX = styled.div<mineProps>`
  /* border: 1px solid; */
  width: 70%;
  height: auto;
  min-height: 4.5vw; // 부모 CHAT에 꽉맞춘다.
  flex-direction: ${(props) => (props.mine ? 'row-reverse' : 'row')};

  display: flex;
  justify-content: stretch; // ??
  align-items: flex-end;
`;
export const MESSAGE = styled.div<mineProps>`
  position: relative;
  /* display: inline-block; */
  padding: 3%;
  margin-bottom: 1%;
  color: ${(props) => (props.mine ? 'white' : 'grey')};
  /* min-height: 1vw; */
  width: auto;
  min-width: 10%;
  max-width: 90%;
  border-radius: 1rem;
  background-color: ${(props) => (props.mine ? ({ theme }) => theme.colors.purple : 'white')};
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
    /* transform: rotate(145deg) translateX(80%); */
    /* transform: rotate(235deg) translateX(80%) scaleX(-1); */
    ${(props) => {
      if (props.mine) {
        return 'top: 0; right:0; transform: rotate(235deg) translateX(-1.15vw) scaleX(-1);';
      }
      return 'top: 0; left:0; transform: rotate(145deg) translateX(1vw);';
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
  min-width: 4vw;
`;
