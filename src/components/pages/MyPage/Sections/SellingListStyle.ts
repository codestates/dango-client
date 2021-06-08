import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';

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

export const SELLINGLIST = styled.div<{ showSell: boolean }>`
  grid-column: 3/5;
  grid-row: 2/11;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 0.2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    top: -0.1rem;
  }

  @media screen and (max-width: 768px) {
    display: none;
    z-index: 5;
    animation: ${showModal} 0.5s forwards;
    ${({ showSell }) =>
      showSell &&
      css`
        display: flex;
        grid-column: 2/6;
        grid-row: 2/11;
        position: relative;
        background-color: white;
      `}
  }
  @media screen and (max-width: 540px) {
    grid-row: 3/10;
    font-size: 0.8rem;
  }
`;

export const HEADER = styled.header`
  width: 100%;
  flex: 1;
  ${({ theme }) => theme.common.flexCenter};
  font-weight: 600;
  padding: 0 1vw;
  min-height: 3rem;
  position: relative;
  color: ${({ theme }) => theme.colors.purple};
  background-color: ${({ theme }) => theme.colors.purple};
  color: white;
  font-size: 1.25rem;
`;
export const LIST = styled.div`
  flex: 8;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  overflow-y: auto;
  width: 100%;
`;

export const ITEM = styled(Link)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  min-height: 72px;
  box-shadow: 1px 1px 2px 1px ${({ theme }) => theme.colors.lightgray};
  &:hover,
  &:focus,
  &:active {
    color: ${({ theme }) => theme.colors.purple};
    cursor: pointer;
    box-shadow: 1px 1px 4px 1px ${({ theme }) => theme.colors.lightpurple};
  }
`;

export const CATEGORY_IMG = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  @media screen and (max-width: 540px) {
    font-size: 38px;
  }
  border-right: 1px solid ${({ theme }) => theme.colors.lightgray};
`;

export const SELLINFO = styled.div`
  flex: 7;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const TITLE = styled.div`
  font-weight: 600;
`;
export const PRICE = styled.div`
  color: grey;
`;

export const MOBILE_ESC = styled.div<{ showSell: boolean }>`
  display: none;
  position: absolute;
  top: 50%;
  right: 0.7rem;
  transform: translateY(-50%);
  margin-left: auto;
  margin-right: 0.5rem;
  cursor: pointer;
  color: white;
  ${(props) => props.showSell && 'display:block;'}
`;
