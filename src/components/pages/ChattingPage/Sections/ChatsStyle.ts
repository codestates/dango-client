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
  align-items: center;
  /* height: 90%; */
  margin: 1% 0px;
`;
export const WRAPIMG = styled.div<mineProps>`
  // 프로필이미지 크기
  width: 5vw;
  height: 5vw;
  border-radius: 70%;
  overflow: hidden;
  margin: ${(props) => (props.mine ? '0px 1% 0px 4%' : '0px 4% 0px 1%')};
`;
export const PROFILEIMG = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
export const MESSAGEBOX = styled.div`
  height: 5.5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const MESSAGE = styled.div<mineProps>`
  flex: 9;
  position: relative;
  display: inline-block;
  padding: 10%;
  min-width: 5vw;
  border-radius: 9px;
  background-color: ${(props) => (props.mine ? ({ theme }) => theme.colors.lightpurple : 'white')};

  &:after {
    content: '';
    position: absolute;
    /* left: 0; //right: 0 */
    border: 0 solid transparent;
    border-top: 9px solid ${(props) => (props.mine ? ({ theme }) => theme.colors.lightpurple : 'white')};
    border-radius: 0 80% 0;
    width: 2vw;
    height: 2vh;
    /* transform: rotate(145deg) translateX(80%); */
    /* transform: rotate(235deg) translateX(80%) scaleX(-1); */
    ${(props) => {
      if (props.mine) {
        return 'right:0; transform: rotate(235deg) translate(-30%,60%) scaleX(-1);';
      }
      return 'left:0; transform: rotate(145deg) translateX(80%);';
    }}
  }
`;
export const TIME = styled.div`
  flex: 1;
  /* color: ${({ theme }) => theme.colors.lightgray}; */
  color: grey;
  font-size: 0.8rem;
`;
