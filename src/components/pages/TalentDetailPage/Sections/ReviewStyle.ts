import styled from 'styled-components';

const REVIEW = styled.div`
  display: flex;
  grid-column: 7/10;
  grid-row: 2/6;
  border: 1px solid;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    grid-column: 1/7;
    grid-row: 6/10;
  }
`;
// ReviewList
const REVIEWLIST = styled.ul`
  border: 1px solid black;
  flex: 7 1 auto;
  padding: 10px;
`;

export const LIST = styled.li`
  margin-bottom: 20px;
`;
export const INFO = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;
export const NICKNAME = styled.span`
  margin-right: 10px;
`;
export const DATE = styled.div`
  color: gray;
`;
export const REPLYBOX = styled.div`
  background-color: #fafafa;
  margin-top: 10px;
`;
export const REPLY = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
`;
export const REPLYNAME = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

export const REPLYDATE = styled.span`
  color: gray;
`;

// ReviewCreate
const REVIEWCREATE = styled.div`
  border: 1px solid black;
  flex: 3 1 auto;
`;

export { REVIEW, REVIEWLIST, REVIEWCREATE };
