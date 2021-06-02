import styled from 'styled-components';
import { USERINFO } from './UserInfoStyle';

export const SELLINGLIST = styled(USERINFO)`
  grid-column: 4/7;

  @media screen and (max-width: 768px) {
    grid-column: 2/6;
    grid-row: 6/10;
  }
`;

export const tmp = {};
