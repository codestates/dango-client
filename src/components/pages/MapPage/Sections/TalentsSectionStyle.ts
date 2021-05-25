import React from 'react';
import styled from 'styled-components';

export const CONTAINER = styled.div`
  display: grid;
  grid-column: 5/7;
  border: 1px solid black;
`;

export const FILTERSECTION = styled.div`
  grid-row: 1/2;
  border: 1px solid black;
`;

export const TALENTSLIST = styled.div`
  display: grid;
  grid-row: 2/4;
  border: 1px solid black;
`;

export const TALENT = styled.div`
  border: 1px solid black;
  &:hover {
    background-color: ${({ theme }) => theme.colors.purple};
    color: white;
  }
`;

export const CATEGORY = styled.div`
  border: 1px solid black;
`;

export const NICKNAME = styled.div`
  border: 1px solid black;
`;

export const RATINGS = styled.div`
  border: 1px solid black;
`;

export const RATINGSCOUNT = styled.div`
  border: 1px solid black;
`;

export const PRICE = styled.div`
  border: 1px solid black;
`;

export const TITLE = styled.div`
  border: 1px solid black;
`;
