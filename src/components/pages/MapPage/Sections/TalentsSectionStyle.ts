import styled from 'styled-components';

export const CONTAINER = styled.div`
  display: grid;
  grid-column: 5/6;
  width: 30vw;
`;

export const FILTERSECTION = styled.div`
  grid-row: 1/2;
  height: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const CHECKBOX = styled.div`
  max-width: 640px;
  // border: 1px solid;
`;

export const UL = styled.ul`
  list-style: none;
  padding: 20px;
`;

export const LI = styled.li`
  display: inline;
  margin-right: 0.5rem;
`;

export const LABEL = styled.label`
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(139, 139, 139, 0.3);
  color: #adadad;
  border-radius: 25px;
  white-space: nowrap;
  margin: 3px 0px;
  padding: 8px 12px;
  user-select: none;
  cursor: pointer;
  &:before {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    font-weight: 900;
    font-size: 12px;
    padding: 2px 6px 2px 2px;
  }
`;

export const INPUT = styled.input`
  display: absolute;
  position: absolute;
  opacity: 0;
  &:checked + ${LABEL} {
    //border: 2px solid #1bdbf8;
    background-color: ${({ theme }) => theme.colors.yellow};
    color: #fff;
  }
`;

export const RADIOBOX = styled.div`
  width: 100%;
  max-width: 400px;
  // margin: 2rem auto;
  background: white;
  // border: 1px solid white;
  border-radius: 3px;
  text-align: left;
  display: flex;
  justify-content: space-evenly;
`;

export const RADIOINPUT = styled.input`
  display: absolute;
  position: absolute;
  opacity: 0;
  &:checked + ${LABEL} {
    border: 2px solid #b5808c;
    background-color: #e0758f;
    color: #fff;
  }
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

  &:hover {
    background-color: #835af1;
    color: white;
    cursor: pointer;
    box-shadow: 2px 2px 2px 2px ${({ theme }) => theme.colors.lightpurple};
  }
`;

export const CATEGORY = styled.div`
  height: 12vh;
  text-align: center;
  line-height: 12vh;
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
