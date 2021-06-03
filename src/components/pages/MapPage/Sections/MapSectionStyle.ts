import styled from 'styled-components';

export const CONTAINER = styled.div`
  width: 80vw;
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

export const SEARCH = styled.div`
  position: absolute;
  top: 3%;
  left: 2%;
  width: 400px;
  z-index: 2;
  background-color: white;
`;
