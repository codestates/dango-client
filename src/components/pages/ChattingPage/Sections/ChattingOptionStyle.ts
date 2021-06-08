import styled from 'styled-components';
import { ReactComponent as EscapeSvg } from '../../../../images/chatout.svg';
import { ReactComponent as ChatListSvg } from '../../../../images/chatlist.svg';
import { SBUTTON } from '../../../../styles/Buttons';

export const CHATTINGOPTION = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;
`;

export const COMPLETEBTN = styled(SBUTTON)`
  height: 1.5vw;
  min-height: 1.2rem;
  margin-right: 1vw;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #fa697c;
  }
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;
export const COMPLETED = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #fa697c;
  margin: 0 auto;
  white-space: nowrap;
`;
export const ESCAPEBTN = styled(EscapeSvg)`
  height: 1.5vw;
  width: 1.5vw;
  min-width: 1.2rem;
  min-height: 1.2rem;
  cursor: pointer;
  margin-right: 1.7vw;
  fill: ${({ theme }) => theme.colors.purple};
  &:hover {
    fill: #fa697c;
  }
  &:active {
    fill: ${({ theme }) => theme.colors.lightpurple};
  }
`;
export const CHATLISTBTN = styled(ChatListSvg)`
  height: 1.5vw;
  width: 1.5vw;
  min-width: 1.2rem;
  min-height: 1.2rem;
  cursor: pointer;
  margin-left: 1.7vw;
  margin-right: auto;
  display: none;

  fill: grey;
  &:hover {
    fill: #fa697c;
  }
  &:active {
    fill: ${({ theme }) => theme.colors.lightpurple};
  }

  @media screen and (max-width: 768px) {
    display: block;
  }
`;
