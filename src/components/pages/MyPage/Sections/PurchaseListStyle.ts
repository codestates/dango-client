import styled from 'styled-components';
import { USERINFO } from './UserInfoStyle';

export const PURCHASELIST = styled(USERINFO)`
  grid-column: 7/10;

  @media screen and (max-width: 768px) {
    flex-direction: column;

    grid-column: 6/10;
    grid-row: 6/10;
  }
`;

export const tmp = {};
