import styled from 'styled-components';
import { SELLINGLIST } from './SellingListStyle';

export const PURCHASELIST = styled(SELLINGLIST)`
  grid-column: 5/7;

  @media screen and (max-width: 768px) {
    flex-direction: column;

    grid-column: 4/7;
    grid-row: 6/11;
  }
`;

export const STAR = styled.div`
  color: grey;
`;

export const GO_TO_REVIEW = styled.div``;
