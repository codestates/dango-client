import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SELLINGLIST = styled.div`
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
  /* min-width: 261px; */

  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    top: -0.1rem;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 1rem;
    grid-column: 1/4;
    grid-row: 6/11;
  }
  @media screen and (max-width: 532px) {
    display: none;
  }
`;

export const HEADER = styled.header`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* background-color: ${({ theme }) => theme.colors.middlepurple}; */
  border-bottom: 5px solid rgba(0, 0, 0, 0.1);
  font-weight: 600;
  padding: 0 1vw;
  min-height: 3rem;
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
  /* border: 1px solid; */
  width: 100%;
  height: auto;
  min-height: 72px;
  border-bottom: 3px solid rgba(0, 0, 0, 0.05);
  &:hover,
  &:focus,
  &:active {
    color: #835af1;
    cursor: pointer;
    box-shadow: 2px 2px 5px 3px ${({ theme }) => theme.colors.lightpurple};
  }
`;

export const CATEGORY_IMG = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  /* border: 1px solid; */
  font-size: 50px;
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
