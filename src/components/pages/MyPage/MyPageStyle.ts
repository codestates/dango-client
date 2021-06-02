import styled from 'styled-components';

const MYPAGE = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-column-gap: 2%;

  height: 80vh; // 카드높이 조절
  width: 75vw;
  min-width: 768px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 768px) {
    min-width: 516px;
  }
`;

export default MYPAGE;
