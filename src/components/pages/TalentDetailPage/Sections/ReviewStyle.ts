import styled from 'styled-components';

const CONTAINER = styled.div`
  display: flex;
  flex-direction: column;
  grid-row: 2/9;
  grid-column: 3/4;
  border: 1px solid green;
`;
const REVIEWLIST = styled.ul`
  border: 1px solid black;
  flex: 7 1 auto;
`;

const REVIEWCREATE = styled.div`
  border: 1px solid black;
  flex: 3 1 auto;
`;

export { CONTAINER, REVIEWLIST, REVIEWCREATE };
