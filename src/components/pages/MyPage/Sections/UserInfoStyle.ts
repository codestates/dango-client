import styled, { keyframes } from 'styled-components';
import { ReactComponent as ModifySvg } from '../../../../images/edit.svg';

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
  grid-column: 1/4;
  grid-row: 2/11;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: relative;
  top: 0;

  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    top: -0.1rem;
  }

  @media screen and (max-width: 768px) {
    grid-column: 2/10;
    grid-row: 2/6;
    margin-bottom: 1rem;
  }
`;
export const IMAGEBOX = styled.div`
  flex: 3;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: 1px solid;
`;
export const WRAPIMG = styled.div`
  height: 15vw;
  width: 15vw;
  border-radius: 70%;
  overflow: hidden;
`;
export const PROFILEIMG = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
export const INFO = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  border: 1px solid;
`;
export const NICKNAMEBOX = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  width: 100%;
  position: relative;
`;
export const NICKNAME = styled.div<{ modify: boolean }>`
  display: flex;
  ${(props) => props.modify && 'flex-direction:column;'}
  justify-content: center;
  align-items: center;
  border: 2px solid red;
  position: relative;
  width: auto;
`;
export const NICKNAME_INPUT = styled.input`
  all: unset;
  text-align: center;
  padding: 0 1vw;
  border: 1px solid blue;
  width: 9rem;
  height: 2vw;
  ${(props) => props.disabled && 'margin-bottom:2vw;'}// modifyBox만큼 미리 마진을줘서 수정할때 위치안변하게
`;
export const NICKNAME_MODIFYBOX = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid green;
  position: relative;
  margin-left: auto;
  height: 2vw;
`;
export const MODIFY_BUTTON = styled(ModifySvg)`
  fill: ${({ theme }) => theme.colors.middlepurple};
  height: 1rem;
  cursor: pointer;
  margin-left: auto;
  position: absolute;
  top: 25%;
  right: 0.5vw;
  transform: translateY(-50%);

  &:hover {
    fill: ${({ theme }) => theme.colors.mustard};
  }
  &:active {
    fill: ${({ theme }) => theme.colors.lightpurple};
  }
`;
export const EMAIL = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
