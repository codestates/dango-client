import styled from 'styled-components';

const MYPAGE = styled.div`
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

export default MYPAGE;
