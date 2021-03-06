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
  background-color: white;
  margin-right: 1.5vw;
  min-width: 200px;

  @media screen and (max-width: 768px) {
    display: none;
    grid-column: 4/9;
    grid-row: 4/10;
    width: 80%;
    height: 80%;
    max-width: 348px;
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
`;

export const CHAT = styled.div`
  grid-column: 5/10;
  grid-row: 2/11;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 252, 240, 0.7);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  @media screen and (max-width: 768px) {
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
  margin-bottom: 0.6rem;
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
  background-color: ${({ theme }) => theme.colors.purple};
  color: whitesmoke;
  white-space: nowrap;
  font-size: 1.3rem;
`;
export const CHATLISTESC = styled.div<{ show: boolean }>`
  display: none;
  color: black;
  position: absolute;
  top: 0.5rem;
  right: 0.7rem;
  margin-left: auto;
  cursor: pointer;
  color: whitesmoke;
  ${(props) => props.show && 'display:block;'}
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const USERBOX = styled.div<{ clicked: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 5vw;
  min-width: 163px;
  min-height: 41px;
  padding: 1vw;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  white-space: nowrap;

  &:hover {
    border: 1px solid rgba(131, 90, 241, 0.4);
    box-shadow: 1px 1px 4px 1px ${(props) => props.theme.colors.lightpurple};
  }
`;
export const WRAPIMG = styled.div`
  width: 4vw;
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
export const USER = styled.div<{ clicked: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: grey;
  margin-right: 1vw;

  ${(props) => props.clicked && `color: ${props.theme.colors.purple}; font-weight: 600;`}
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
  fill: #2f2e40;
  top: 3vw;
  left: 3vw;
  width: 8vw;
  height: 8vw;
`;
