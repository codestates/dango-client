import styled from 'styled-components';

export const CONTAINER = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  gap: 20px;
  padding-bottom: 1rem;
  height: 85vh;
  margin-top: 3rem;
  width: 1080px;
  min-width: 768px;
  @media screen and (max-width: 1200px) {
    width: 95%;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

export const FORM = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  grid-column: 1/10;
  grid-row: 1/11;
  padding: 1rem;
  box-shadow: 1px 1px 3px 1px #dadce0;
  @media screen and (max-width: 768px) {
    grid-column: 1/13;
    grid-row: 1/13;
    height: 90vh;
  }
`;

export const TITLEBOX = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
`;

export const TITLE_SPAN = styled.span`
  width: 8rem;
  ${({ theme }) => theme.common.flexCenter};
`;

export const TITLE = styled.input`
  all: unset;
  box-shadow: 1px 1px 3px 1px #dadce0;
  transition: all 0.2s ease-in-out;
  &:focus {
    box-shadow: 3px 3px 6px 1px #dadce0;
  }
  background-color: #fffcf0;
  padding: 0 1rem;
  width: 368px;
  height: 2.5rem;
`;

export const SEARCHBOX = styled.div`
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
`;

export const SEARCH_SPAN = styled.span`
  width: 8rem;
  ${({ theme }) => theme.common.flexCenter};
`;

export const ADDRESSBOX = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
`;

export const ADDRESS_SPAN = styled.span`
  width: 8rem;
  ${({ theme }) => theme.common.flexCenter};
`;

export const ADDRESS = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  width: 368px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.purple};
  height: 2.5rem;
`;

export const CATEGORYBOX = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
`;

export const CATEGORY_SPAN = styled.span`
  width: 8rem;
  ${({ theme }) => theme.common.flexCenter};
`;

export const CATEGORY = styled.select`
  border: none;
  outline: none;
  box-shadow: 1px 1px 3px 1px #dadce0;
  padding: 0 1rem;
  width: 400px;
  height: 2.5rem;
  transition: all 0.2s ease-in-out;
  &:focus {
    box-shadow: 3px 3px 6px 1px #dadce0;
  }
`;

export const OPTION = styled.option`
  all: unset;
`;

export const PRICEBOX = styled.div`
  display: flex;
  height: 10%;
  align-items: center;
`;

export const PRICE_SPAN = styled.span`
  width: 8rem;
  ${({ theme }) => theme.common.flexCenter};
`;

export const PRICE = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  justify-content: space-between;
`;

export const PRICEINPUT = styled.input`
  all: unset;
  box-shadow: 1px 1px 3px 1px #dadce0;
  text-align: end;
  padding-right: 1rem;
  height: 2.5rem;
  width: 170px;
  transition: all 0.2s ease-in-out;
  &:focus {
    box-shadow: 3px 3px 6px 1px #dadce0;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const FREE = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  margin-left: 5rem;
`;

export const FREELABEL = styled.label`
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(139, 139, 139, 0.3);
  color: #adadad;
  border-radius: 25px;
  white-space: nowrap;
  padding: 8px 12px;
  user-select: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.8rem;
  &:before {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    padding: 2px 6px 2px 2px;
  }
`;

export const FREEINPUT = styled.input`
  display: absolute;
  position: absolute;
  opacity: 0;
  &:checked + ${FREELABEL} {
    background-color: ${({ theme }) => theme.colors.yellow};
    color: #fff;
  }
`;

export const DESCRIPTIONBOX = styled.div`
  height: 30%;
  display: flex;
`;

export const DESCRIPTION_SPAN = styled.span`
  width: 8rem;
  display: flex;
  align-items: stretch;
  justify-content: center;
  margin-top: 0.5rem;
`;

export const DESCRIPTION = styled.textarea`
  all: unset;
  box-shadow: 1px 1px 3px 1px #dadce0;
  transition: all 0.2s ease-in-out;
  &:focus {
    box-shadow: 3px 3px 6px 1px #dadce0;
  }
  background-color: #fffcf0;
  padding: 1rem;
  line-height: 180%;
  white-space: pre-wrap;
  width: 368px;
`;

export const BUTTONDIV = styled.div`
  grid-column: 10/13;
  grid-row: 10/11;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media screen and (max-width: 768px) {
    grid-column: 1/13;
    grid-row: 16/17;
  }
`;

export const BUTTON = styled.button`
  outline: none;
  border: none;
  border-radius: 1.25rem;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  color: ${({ theme }) => theme.colors.purple};
  border: 0.12rem solid ${({ theme }) => theme.colors.purple};
  background: white;
  &:hover {
    color: ${({ theme }) => theme.colors.yellow};
    border: 0.12rem solid ${({ theme }) => theme.colors.yellow};
  }
  &:active {
    color: ${({ theme }) => theme.colors.lightpurple};
    border: 0.12rem solid ${({ theme }) => theme.colors.lightpurple};
  }
  height: 2.25rem;
  ${({ theme }) => theme.common.flexCenter};
  font-size: 1rem;
`;
