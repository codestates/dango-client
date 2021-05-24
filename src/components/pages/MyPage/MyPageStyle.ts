import styled from 'styled-components';

export const MYPAGE = styled.div`
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  height: 95vh;
  width: 95vw;
  border: 1px solid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const USERINFO = styled.div`
  grid-row: 2/6;
  border: 1px solid;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
export const WRAPIMG = styled.div`
  height: 200px;
  width: 200px;
  border-radius: 70%;
  overflow: hidden;
`;
export const PROFILEIMG = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const TALENTLIST = styled.div`
  grid-row: 6/11;
  border: 1px solid;
`;
