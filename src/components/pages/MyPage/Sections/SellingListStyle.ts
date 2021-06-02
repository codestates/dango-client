import styled from 'styled-components';
import { USERINFO } from './UserInfoStyle';

export const SELLINGLIST = styled(USERINFO)`
  grid-column: 4/7;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    grid-column: 2/6;
    grid-row: 6/10;
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
  margin-bottom: 1vw;
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

export const ITEM = styled.ul`
  display: flex;
  /* border: 1px solid; */
  width: 100%;
  height: 5vw;
  min-height: 72px;
  border-bottom: 3px solid rgba(0, 0, 0, 0.05);
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
  /* border: 1px solid; */
`;
