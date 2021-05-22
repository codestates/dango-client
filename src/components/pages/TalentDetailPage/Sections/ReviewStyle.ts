import styled from 'styled-components';

const CONTAINER = styled.div`
  display: flex;
  flex: 3 1 auto;
  flex-direction: column;

  border: 1px solid green;
`;
const REVIEWLIST = styled.ul`
  width: 100%;
  border: 1px solid black;
  flex: 7 1 auto;
`;

const REVIEWCREATE = styled.div`
  border: 1px solid black;
  flex: 3 1 auto;
`;

export { CONTAINER, REVIEWLIST, REVIEWCREATE };
