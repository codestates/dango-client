import styled from 'styled-components';

export const CONTAINER = styled.div`
  display: grid;
  grid-column: 5/6;
  width: 30vw;
`;

export const FILTERSECTION = styled.div`
  grid-row: 1/2;
  height: 30vh;
`;

export const CHECKBOX = styled.div`
  border: 1px solid;
`;

export const RADIOBOX = styled.div`
  border: 1px solid;
`;

export const TALENTSLIST = styled.div`
  grid-row: 2/4;
  height: 70vh;
`;

export const TALENT = styled.div`
  height: 12vh;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin-bottom: 0.5rem;
  box-shadow: 2px 2px 2px 2px ${({ theme }) => theme.colors.lightgray};
  // border-bottom: 2px solid ${({ theme }) => theme.colors.purple};

  &:hover {
    background-color: ${({ theme }) => theme.colors.purple};
    color: white;
    cursor: pointer;
    box-shadow: 2px 2px 2px 2px ${({ theme }) => theme.colors.lightpurple};
  }
`;

export const CATEGORY = styled.div`
  /* width: 80px; */
  height: 12vh;

  text-align: center;
  line-height: 12vh;
  // margin-right: 1rem;
`;

export const EMOJI = styled.div`
  width: 90px;
  height: 90px;
  font-size: 3rem;
`;

export const TEXT = styled.div`
  margin: 0 1rem;
  height: 12vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
`;

export const TITLE = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem;
  font-weight: bold;
`;

export const PRICE = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem;
`;

export const STARNICK = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RATINGS = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem;
`;

export const NICKNAME = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem;
`;
