import styled from 'styled-components';

export const PURCHASELIST = styled.div`
  grid-column: 7/10;
  grid-row: 2/10;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: relative;
  top: 0;

  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    top: -0.5rem;
  }

  @media screen and (max-width: 768px) {
    grid-column: 6/10;
    grid-row: 6/10;
  }
`;

export const tmp = {};
