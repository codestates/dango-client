import styled from 'styled-components';

export const USERINFO = styled.div`
  grid-column: 1/4;
  grid-row: 2/10;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: relative;
  top: 0;

  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    top: -0.5rem;
  }

  @media screen and (max-width: 768px) {
    grid-column: 2/10;
    grid-row: 2/6;
    margin-bottom: 1rem;
  }
`;
export const WRAPIMG = styled.div`
  height: 15vw;
  width: 15vw;
  border-radius: 70%;
  overflow: hidden;
`;
export const PROFILEIMG = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
export const INFO = styled.div`
  width: 100%;
`;
