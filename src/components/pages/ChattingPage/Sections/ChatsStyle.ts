import styled from 'styled-components';

interface ChatProps {
  mine: boolean;
  notice?: boolean;
}

export const RENDER = styled.div`
  width: 100%;
  padding: 0.3rem;
`;

export const CHAT = styled.div<ChatProps>`
  display: flex;
  flex-direction: ${(props) => (props.mine ? 'row-reverse' : 'row')};
  align-items: center;
  min-height: 4.5vw;
  padding: 0.1rem 0;
`;
export const WRAPIMG = styled.div<ChatProps>`
  width: 4.2vw;
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
  width: 70%;
  height: auto;
  min-height: 4.5vw;
  flex-direction: ${(props) => (props.mine ? 'row-reverse' : 'row')};
  display: flex;
  justify-content: stretch;
  align-items: flex-end;
`;
export const MESSAGE = styled.div<ChatProps>`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.24);

  position: relative;
  padding: 0.6rem;
  color: ${(props) => (props.mine ? 'whitesmoke' : 'grey')};
  width: auto;
  min-width: 10%;
  max-width: 90%;
  min-height: 34px;
  border-radius: 1rem;
  background-color: ${(props) => (props.mine ? ({ theme }) => theme.colors.purple : 'white')};
  ${(props) => {
    if (props.notice) {
      return 'background-color: #FA697C; color:whitesmoke;';
    }
    return undefined;
  }}
  white-space: pre-wrap;
  margin: 0.5vw 1vw;

  &:after {
    box-shadow: 1.5px 0px 0px rgba(0, 0, 0, 0.03), 1.5px 0px 0px rgba(0, 0, 0, 0.06);

    content: '';
    position: absolute;
    border: 0 solid transparent;
    border-top: ${(props) => (props.mine ? ({ theme }) => `0.7vw solid ${theme.colors.purple}` : ' 0.7vw solid white')};
    border-radius: 0 80% 0;
    width: 1vw;
    height: 1vw;
    min-width: 0.5rem;
    min-height: 0.5rem;

    ${(props) => {
      if (props.mine) {
        return 'top: 0; right:0; transform: rotate(235deg) translateX(-1.15vw) scaleX(-1);';
      }
      return 'top: 0; left:0; transform: rotate(145deg) translateX(1vw);';
    }}

    ${(props) => {
      if (props.notice) {
        return 'border-top-color: #FA697C;';
      }
      return undefined;
    }}
  }
`;
export const TIME = styled.div`
  color: grey;
  font-size: 0.8rem;
  margin-bottom: 1vw;
  min-width: 3.7rem;
`;
