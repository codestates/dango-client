import styled, { keyframes } from 'styled-components';
import { ReactComponent as ModifySvg } from '../../../../images/edit.svg';
import { SSBUTTON } from '../../../../styles/Buttons';
import Withdrawal from '../../SigninPage/Withdrawal';
// const showModal = keyframes//`

//    ${'0%'} {
//     transform: translateY(0) translateZ(0) rotateX(0);
//     transform-origin: 50% 100%;
//   }
//   ${'100%'} {
//     transform: translateY(100%) translateZ(100px) rotateX(180deg);
//     transform-origin: 50% 0%;
//   }

//   ${'0%'}{
//     transform: translateY(0) translateZ(0) rotateX(0);
//     transform-origin: 50% 0%;
//   }
//   ${'100%'}{
//     transform: translateY(-100%) translateZ(100px) rotateX(-180deg);
//     transform-origin: 50% 100%;
//   }

// `;

export const USERINFO = styled.div`
  grid-column: 1/3;
  grid-row: 2/11;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-column-gap: 2%;

  border-radius: 0.2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: relative;
  overflow: hidden;
  /* min-width: 261px; */

  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    top: -0.1rem;
  }

  @media screen and (max-width: 768px) {
    grid-column: 1/7;
    grid-row: 1/6;
    margin-bottom: 1rem;
  }
  @media screen and (max-width: 532px) {
    grid-column: 2/6;
    grid-row: 2/11;
  }
`;
export const HELLO = styled.div`
  grid-column: 1/11;
  grid-row: 1/4;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: #4c4c4c;
  font-weight: bold;
  /* white-space: nowrap; */

  @media screen and (max-width: 768px) {
    grid-column: 6/11;
    grid-row: 1/6;
  }
  @media screen and (max-width: 532px) {
    grid-column: 1/11;
    grid-row: 1/4;
  }
`;

export const HELLO_TEXT = styled.div`
  line-height: 140%;
`;

export const PURPLE = styled.span`
  color: ${({ theme }) => theme.colors.purple};
`;

export const PROFILE_BOX = styled.div`
  grid-column: 1/11;
  grid-row: 4/9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 768px) {
    grid-column: 1/6;
    grid-row: 1/11;
  }
  @media screen and (max-width: 532px) {
    grid-column: 1/11;
    grid-row: 4/9;
  }

  /* background-color: ${({ theme }) => theme.colors.middlepurple}; */
`;
export const INFO = styled.div`
  grid-column: 1/11;
  grid-row: 9/11;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 768px) {
    grid-column: 6/11;
    grid-row: 6/11;
  }
  @media screen and (max-width: 532px) {
    grid-column: 1/11;
    grid-row: 9/11;
  }
`;

// ------------PROFILE_BOX 안 ----------------//
export const WRAPIMG = styled.div`
  height: 10vw;
  width: 10vw;
  border-radius: 70%;
  overflow: hidden;
  min-width: 187px;
  min-height: 187px;
  margin-bottom: 1vw;
`;
export const PROFILEIMG = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const NICKNAME_BOX = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;
export const NICKNAME = styled.div<{ modify: boolean }>`
  display: flex;
  ${(props) => props.modify && 'flex-direction:column;'}
  justify-content: center;
  align-items: center;
  position: relative;
`;
export const NICKNAME_INPUT = styled.input`
  flex: 1;
  all: unset;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  text-align: center;
  width: 9rem;
  height: 2vw;
  min-height: 19px;

  ${(props) => props.disabled && 'margin-bottom:19px;'}// modifyBox만큼 미리 마진을줘서 수정할때 위치안변하게
`;
export const MODIFY_BUTTON = styled(ModifySvg)`
  fill: ${({ theme }) => theme.colors.purple};
  height: 1rem;
  cursor: pointer;
  margin-left: auto;
  position: absolute;
  top: 30%;
  right: 0.5vw;
  transform: translateY(-50%);

  &:hover {
    fill: ${({ theme }) => theme.colors.mustard};
  }
  &:active {
    fill: ${({ theme }) => theme.colors.lightpurple};
  }
`;
export const NICKNAME_MODIFYBOX = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-left: auto;
  height: 19px;
  width: 100%;
`;
export const MODIFYCHECK_BUTTON = styled(SSBUTTON)`
  border: none;

  &:hover {
    color: ${({ theme }) => theme.colors.mustard};
  }
`;
export const MODIFY_ESC_BUTTON = styled.div`
  height: 1rem;
  cursor: pointer;
  margin-left: auto;
  position: absolute;
  top: 25%;
  right: 0.5vw;
  transform: translateY(-50%);
`;

// -------------------INFO 안---------------//
export const EMAIL = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 9;
`;
export const WITHDRAWAL_BOX = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 1vw;
`;

export const WITHDRAWAL_BUTTON = styled(Withdrawal)`
  all: unset;
`;

// ----------------모바일 용 버튼 ----------------- //
export const MOBILE_BUTTON = styled.div`
  display: none;

  @media screen and (max-width: 532px) {
    display: flex;
    position: absolute;
    left: 50%;
    bottom: 1rem;
    transform: translateX(-50%);
    width: 50%;
    justify-content: space-between;
  }
`;
export const OPEN_SELL_BUTTON = styled(SSBUTTON)``;
export const OPEN_PURCHASE_BUTTON = styled(SSBUTTON)``;
