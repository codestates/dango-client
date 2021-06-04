import styled from 'styled-components';

const REVIEW = styled.div`
  display: flex;
  grid-column: 7/10;
  grid-row: 1/5;
  // box-shadow: 1px 1px 3px 1px #dadce0;
  box-shadow: 0 0 3px 1px ${({ theme }) => theme.colors.lightpurple};
  flex-direction: column;
  // border: 5px solid ${({ theme }) => theme.colors.lightpurple};

  @media screen and (max-width: 768px) {
    grid-column: 1/7;
    grid-row: 6/10;
  }
  padding: 1rem;
  min-width: 300px;
`;

// ReviewList
const REVIEWLIST = styled.ul`
  flex: 7 1 auto;
  padding-left: 0.5rem;
  padding-top: 1rem;
`;

// original review
export const LIST = styled.li`
  margin-bottom: 2.5rem;
`;
export const INFO = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  // border: 1px solid;
  padding-right: 0.5rem;
`;

export const USERSTAR = styled.div``;

export const STAR = styled.span`
  min-width: 100px;
`;

export const NICKNAME = styled.span`
  margin-right: 1rem;
  font-weight: 500;
`;
export const DATE = styled.div`
  color: gray;
  font-size: 0.8rem;
`;

export const REVIEWCONTENT = styled.p`
  white-space: pre-wrap;
  margin-bottom: 1rem;
  line-height: 120%;
`;

// 답글
export const REPLYBUTTON = styled.div`
  margin-right: 0.5rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
`;

export const REPLYBOX = styled.div`
  background-color: #fafafa;
  margin-top: 10px;
  padding: 0.5rem;
  margin-left: 1.5rem;
`;
export const REPLY = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const REPLYTOP = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const REPLYNAME = styled.span`
  font-weight: 500;
  margin-right: 10px;
`;

export const REPLYDATE = styled.span`
  color: gray;
  font-size: 0.8rem;
`;

export const REPLYCONTENT = styled.p`
  white-space: pre-wrap;
  line-height: 120%;
`;

// ReviewCreate
const REVIEWCREATE = styled.div`
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media screen and (max-width: 768px) {
    height: 17vh;
  }
`;

export const STARDIV = styled.div`
  margin-left: auto;

  display: flex;
  align-items: center;
`;

export const TEXTAREA = styled.textarea`
  all: unset;
  box-shadow: 1px 1px 2px 1px #dadce0;
  background-color: #fffcf0;
  padding: 1rem;
  line-height: 110%;
  font-size: 0.75rem;
  margin: 1rem 0;
`;

export const BUTTONDIV = styled.div`
  margin-left: auto;

  display: flex;
  align-items: center;
`;

// reply review create
export const FORM = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const REPLYTEXTAREA = styled.textarea`
  all: unset;
  box-shadow: 1px 1px 2px 1px #dadce0;
  background-color: #fffcf0;
  padding: 1rem;
  line-height: 110%;
  font-size: 0.75rem;
`;

export const REPLYBUTTONDIV = styled.div`
  padding: 0 0.2rem;
  margin-top: 0.5rem;
`;

export { REVIEW, REVIEWLIST, REVIEWCREATE };
