import styled from 'styled-components';

export const CONTAINER = styled.div`
  width: 370px;
  z-index: 2;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const FILTERSECTION = styled.div`
  width: 370px;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const CHECKBOX = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.lightgray};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 60%;
  padding: 0 1rem;
`;

export const CHECKBOX_SPAN = styled.span`
  font-size: 0.9rem;
`;

export const UL = styled.ul`
  list-style: none;
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
  font-size: 0.8rem;
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
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 35%;
  padding: 0 1rem;
`;

export const RADIOBOX_SPAN = styled.span`
  font-size: 0.9rem;
`;

export const RADIODIV = styled.div`
  background: white;
  border-radius: 3px;
  text-align: left;
  display: inline;
`;
export const RADIOLABEL = styled(LABEL)`
  border-radius: 5px;
`;

export const RADIOINPUT = styled.input`
  display: absolute;
  position: absolute;
  opacity: 0;
  &:checked + ${LABEL} {
    background-color: ${({ theme }) => theme.colors.yellow};
    color: #fff;
  }
  &:hover + ${LABEL} {
    background-color: ${({ theme }) => theme.colors.yellow};
    color: #fff;
  }
`;

export const TALENTSLIST = styled.div`
  height: 70vh;
  border-top: 1.5px solid rgba(0, 0, 0, 0.09);
  overflow: auto;
`;

export const TALENT = styled.div`
  height: 12vh;
  display: flex;
  justify-content: center;
  color: #787878;
  align-items: center;
  box-shadow: 1px 1px 2px 1px ${({ theme }) => theme.colors.lightgray};
  &:hover,
  &:focus,
  &:active {
    color: ${({ theme }) => theme.colors.purple};
    cursor: pointer;
    box-shadow: 1px 1px 4px 1px ${({ theme }) => theme.colors.lightpurple};
  }
`;

export const CATEGORY = styled.div`
  height: 12vh;
  text-align: center;
  line-height: 11vh;
  margin-left: 0.5rem;
`;

export const EMOJI = styled.div`
  width: 90px;
  height: 90px;
  font-size: 3rem;
`;

export const TEXT = styled.div`
  margin: 0 1rem;
  margin-left: 0;
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
