import styled from 'styled-components';

const MYPAGE = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-column-gap: 2%;

  height: 80vh; // 카드높이 조절
  width: 75%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default MYPAGE;
