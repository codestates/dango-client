import styled from 'styled-components';

export const CONTAINER = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(5, 1fr);
  height: 95vh;
  grid-gap: 20px;
  margin: 20px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(6, 1fr);
  }
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
