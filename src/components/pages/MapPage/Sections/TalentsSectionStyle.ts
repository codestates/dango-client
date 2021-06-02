import styled from 'styled-components';

export const CONTAINER = styled.div`
  // grid-column: 5/7;
  width: 420px;
  // border: 1px solid;
  z-index: 2;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const FILTERSECTION = styled.div`
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem 0;
  // box-shadow: 1px 1px 3px 1px #dadce0;
`;

export const CHECKBOX = styled.div`
  // max-width: 640px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.lightgray};
  padding: 0 1rem 1rem 1rem;
  //  height: 100px;
`;

export const UL = styled.ul`
  list-style: none;
  // padding: 20px;

  // max-width: 600px;
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
  margin-bottom: 3px;
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
    border: 2px solid #978bb5;
    background-color: #835af1;
    color: #fff;
  }
`;

export const RADIOBOX = styled.div`
  width: 100%;
  max-width: 600px;
  // margin: 2rem auto;
  background: white;
  // border: 1px solid;
  border-radius: 3px;
  text-align: left;
  display: flex;
  justify-content: space-evenly;
  padding: 1rem 1rem 0 1rem;
`;

export const RADIOLABEL = styled(LABEL)`
  // color: #adadad;
  border-radius: 5px;
`;

export const RADIOINPUT = styled.input`
  display: absolute;
  position: absolute;
  opacity: 0;
  &:checked + ${RADIOLABEL} {
    background-color: ${({ theme }) => theme.colors.yellow};
    color: #fff;
  }
  &:hover + ${RADIOLABEL} {
    background-color: ${({ theme }) => theme.colors.yellow};
    color: #fff;
  }
`;

export const TALENTSLIST = styled.div`
  height: 70vh;
  border-top: 1.5px solid rgba(0, 0, 0, 0.09);
  overflow: auto; // 내용이 넘칠 때 스크롤바 생김.
`;

export const TALENT = styled.div`
  height: 12vh;
  display: flex;
  // padding: 1rem 0;
  justify-content: center;
  color: #787878;
  align-items: center;
  margin-bottom: 0.5rem;
  box-shadow: 1px 1px 2px 2px ${({ theme }) => theme.colors.lightgray};

  &:hover,
  &:focus,
  &:active {
    // background-color: #835af1;
    color: #835af1;
    cursor: pointer;
    box-shadow: 2px 2px 5px 3px ${({ theme }) => theme.colors.lightpurple};
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
  margin-right: 1rem;
`;
