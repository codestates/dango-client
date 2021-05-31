import styled from 'styled-components';

export const CONTAINER = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(5, 1fr);
  height: 95vh;
  grid-gap: 20px;
  margin: 1.25rem auto;
  width: 75%;
  // border: 2px solid;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(6, 1fr);
    width: 95%;
  }
`;

export const SELLER = styled.div`
  grid-column: 1/3;
  grid-row: 2/5;
  box-shadow: 1px 1px 3px 1px ${({ theme }) => theme.colors.lightpurple};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const PROFILE = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  height: 40%;
`;

export const PROFILEIMG = styled.div`
  ${({ theme }) => theme.common.flexCenter};
`;

export const IMG = styled.img`
  border-radius: 50%;
  width: 80%;
`;

export const NICKNAME = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 1rem;
`;

export const GRADE = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 30%;
`;

export const RATING = styled.div``;

export const COUNT = styled.div``;

export const BUTTONDIV = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  height: 10%;
`;

export const DETAIL = styled.div`
  grid-column: 3/7;
  grid-row: 2/5;
  // box-shadow: 1px 1px 3px 1px #dadce0;
  box-shadow: 1px 1px 3px 1px ${({ theme }) => theme.colors.lightpurple};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  // align-items: center;
`;

export const ADDRESS = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  height: 10%;
  padding: 0 1rem;
  color: gray;
  font-size: 0.8rem;
`;

export const TOP = styled.div`
  padding: 0 1rem;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const CATEGORY = styled.div``;

export const PRICE = styled.div``;

export const TITLE = styled.div`
  height: 10%;
  ${({ theme }) => theme.common.flexCenter};
  color: ${({ theme }) => theme.colors.purple};
  font-size: 1.25rem;
  font-weight: bold;
`;

export const DESCRIPTION = styled.div`
  // border: 1px solid;
  padding: 0 3rem;
  // margin: 0 1rem;
  height: 50%;
  display: flex;
  align-items: center;
  // box-shadow: 1px 1px 3px 1px #dadce0;
  // background-color: ${({ theme }) => theme.colors.lightgray};
  white-space: pre-wrap;
  line-height: 180%;
`;

export const BOTTOM = styled.div`
  padding: 0 1rem;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin-left: auto;
  margin-top: 2rem;
`;

export const SHARE = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.purple};
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  &:hover {
    background-color: black;
  }
`;

export const TEXTAREA = styled.textarea`
  all: unset;
  height: 90%;
  width: 100%;
  // border-bottom: 1px solid white;
  box-shadow: 1px 1px 3px 1px #dadce0;
  &:focus {
    // border-bottom: 2px solid #835af1;
    box-shadow: 1px 1px 3px 1px #835af1;
  }
  // background-color: #fffcf0;
  padding: 1rem;
  line-height: 180%;
`;

export const PHOTOS = styled.div`
  grid-column: 1/7;
  grid-row: 5/6;
  box-shadow: 1px 1px 3px 1px #dadce0;
`;
