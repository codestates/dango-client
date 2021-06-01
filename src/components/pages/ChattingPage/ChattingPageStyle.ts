import styled, { keyframes } from 'styled-components';
import { ReactComponent as EmptyRoomSvg } from '../../../images/emptyRoom.svg';
import { CHATLISTBTN } from './Sections/ChattingOptionStyle';

export const CONTAINER = styled.div`
  display: grid;
  height: 95vh;
  width: 95vw;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-column-gap: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const showModal = keyframes`
  from {
    opacity: 0.5;
    transform: translateY(3%);
  }
  to{
    opacity: 1;
    transform: translateY(0%);
  }
`;

export const CHATLIST = styled.div<{ show: boolean }>`
  grid-column: 2/5;
  grid-row: 2/11;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  overflow-y: auto;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: #f2f7f8;
  /* padding: 1.5vw; */
  margin-right: 1.5vw;
  min-width: 200px;

  @media screen and (max-width: 1024px) {
    display: none;
    grid-column: 4/9;
    grid-row: 4/10;
    width: 80%;
    height: 80%;
    z-index: 5;
    animation: ${showModal} 0.5s forwards;

    ${(props) => props.show && 'display:flex;'}
  }

  @media screen and (max-width: 480px) {
    grid-column: none;
    position: absolute;
    width: 60%;
    height: 70%;
    top: 0%;
    left: 20%;

    ${(props) => props.show && 'display:flex;'}
  }

  // 스크롤디자인 보류!
  ::-webkit-scrollbar {
    width: 0.6rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

export const CHAT = styled.div`
  grid-column: 5/10;
  grid-row: 2/11;
  display: flex;
  flex-direction: column;
  background-color: #f2f7f8;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  @media screen and (max-width: 1024px) {
    grid-column: 2/10;
    font-size: 0.8rem;
  }
`;

export const CHATLISTTITLE = styled.div`
  position: relative;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
export const CHATLISTTEXT = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-width: 103px;
  min-height: 30px;
  padding: 1vw;
  margin-bottom: 0.7vw;
  position: relative;
  background-color: ${({ theme }) => theme.colors.middlepurple};
  color: whitesmoke;
  padding-top: 1.2vw; // 글자가 가운데로안감. 글자속성때문에 조금 위로 올라감
  white-space: nowrap;
`;
export const CHATLISTESC = styled.div<{ show: boolean }>`
  display: none;
  color: black;
  position: absolute;
  top: 0;
  right: 0;
  margin-left: auto;
  cursor: pointer;
  color: grey;
  ${(props) => props.show && 'display:block;'}
  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

export const USERBOX = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 5vw;
  min-width: 163px;
  min-height: 41px;
  padding: 1vw;
  margin-bottom: 0.7vw; // CHATLIST의 padding과 같게
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  white-space: nowrap;
`;
export const WRAPIMG = styled.div`
  // 프로필이미지 크기
  width: 4vw; // 5vw * 0.9
  height: 4vw;
  min-width: 33px;
  min-height: 33px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1vw;
`;
export const PROFILEIMG = styled.img`
  object-fit: cover;
  object-position: top;
  width: 100%;
  height: 100%;
`;
export const USER = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: grey;
  margin-right: 1vw;
  &:hover {
    color: ${({ theme }) => theme.colors.middlepurple};
    font-weight: 600;
  }
`;
export const COUNT = styled.div<{ value: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2vw;
  height: 2vw;
  min-width: 20px;
  min-height: 20px;
  margin-left: auto;
  background-color: #a68bf6;
  border-radius: 70%;
  color: whitesmoke;
  padding-top: 0.2vw;
  ${(props) => props.value === 0 && 'display: none;'}
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

export const NUMBER = styled.span`
  vertical-align: bottom;
`;

export const EMPTYBOX = styled(CHAT)`
  width: 100%;
  height: 100%;
`;

export const EMPTYROOM = styled(EmptyRoomSvg)`
  width: 100%;
  height: 100%;
`;

export const NOROOMBTN = styled(CHATLISTBTN)`
  position: relative;
  z-index: 99;
  width: 200px;
  height: 200px;
`;
