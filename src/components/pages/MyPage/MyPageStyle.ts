import styled from 'styled-components';

const MYPAGE = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(100, 1fr);
  grid-column-gap: 2%;

  height: 80vh;
  width: 95%;
  border: 1px solid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 1rem;
`;

export default MYPAGE;
