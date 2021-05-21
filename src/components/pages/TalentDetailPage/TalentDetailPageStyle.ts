import styled from 'styled-components';

export const CONTAINER = styled.div`
  display: grid;
  height: 95vh;
  grid-gap: 20px;
  margin: 20px;
`;

export const SELLER = styled.div`
  grid-column: 1/3;
  grid-row: 2/5;
  border: 1px solid;
`;

export const DETAIL = styled.div`
  grid-column: 3/7;
  grid-row: 2/5;
  border: 1px solid;
`;

export const PHOTOS = styled.div`
  grid-column: 1/7;
  grid-row: 5/6;
  border: 1px solid;
`;

export const REVIEW = styled.div`
  grid-column: 7/10;
  grid-row: 2/6;
  border: 1px solid;
`;
