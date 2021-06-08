import styled from 'styled-components';

export const CONTAINER = styled.div`
  width: 80vw;
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

export const SEARCH = styled.div`
  position: absolute;
  top: 2%;
  left: 1.5%;
  width: 400px;
  z-index: 2;
  background-color: white;
`;
