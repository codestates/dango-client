import styled from 'styled-components';

export const CONTAINER = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  // grid-template-columns: 3fr 1fr;
  gap: 20px;
  // font-size: 1.5rem;
  padding-bottom: 1rem;
  height: 85vh;
  // margin: 1.25rem auto;
  margin-top: 3rem;
  width: 75%;
  // border: 3px solid;
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
  // align-items: center;
  grid-column: 1/10;
  grid-row: 1/11;
  // border: 1px solid black;
  // margin: 0 1rem;
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

  // border-bottom: 1px solid white;
  box-shadow: 1px 1px 3px 1px #dadce0;
  transition: all 0.2s ease-in-out;
  &:focus {
    box-shadow: 3px 3px 6px 1px #dadce0;
  }
  background-color: #fffcf0;
  padding: 0 1rem;
  // color: #835af1;
  width: 368px;
  height: 2.5rem;
`;

export const SEARCHBOX = styled.div`
  // display: grid;
  grid-template-columns: repeat(2, 1fr);
  // justify-items: start;
  // border: 1px solid black;
  width: 100%;
  height: 10%;
  // margin-bottom: 8rem;
  display: flex;
  // justify-content: space-between;
  align-items: center;
`;

export const SEARCH_SPAN = styled.span`
  width: 8rem;
  ${({ theme }) => theme.common.flexCenter};
`;

export const ADDRESSBOX = styled.div`
  height: 10%;
  display: flex;
  // justify-content: space-between;
  align-items: center;
`;

export const ADDRESS_SPAN = styled.span`
  width: 8rem;
  ${({ theme }) => theme.common.flexCenter};
`;

export const ADDRESS = styled.div`
  // border: 1px solid red;
  // grid-column: 2/3;
  // width: 60%;
  // height: 10%;
  // ${({ theme }) => theme.common.flexCenter}
  // box-shadow: 1px 1px 3px 1px #dadce0;
  // max-width: 600px;
  width: 368px;
  font-size: 0.8rem;
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
  // width: 40%;
  box-shadow: 1px 1px 3px 1px #dadce0;
  padding: 0 1rem;
  // height: 10%;
  width: 400px;
  height: 2.5rem;
  transition: all 0.2s ease-in-out;
  &:focus {
    box-shadow: 3px 3px 6px 1px #dadce0;
  }
`;

export const OPTION = styled.option`
  all: unset;
  color: red;
  &:hover {
    color: ${({ theme }) => theme.colors.yellow};
    border: 2px solid ${({ theme }) => theme.colors.yellow};
  }
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
  // height: 10%;
  // border-bottom: 1px solid white;
  box-shadow: 1px 1px 3px 1px #dadce0;
  text-align: end;
  padding-right: 1rem;
  // height: 120%;
  height: 2.5rem;
  transition: all 0.2s ease-in-out;
  &:focus {
    box-shadow: 3px 3px 6px 1px #dadce0;
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
    // font-size: 1rem;
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
  height: 25%;
  display: flex;
  // align-items: center;
`;

export const DESCRIPTION_SPAN = styled.span`
  width: 8rem;
  display: flex;
  // flex-direction: column;
  // border: 1px solid;
  align-items: stretch;
  justify-content: center;
  margin-top: 0.5rem;
`;

export const DESCRIPTION = styled.textarea`
  all: unset;
  // height: 25%;
  // border-bottom: 1px solid white;
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
  ${({ theme }) => theme.common.flexCenter}
  @media screen and (max-width: 768px) {
    grid-column: 1/13;
    grid-row: 16/17;
  }
`;

export const BUTTON = styled.button`
  outline: none;
  border: 2px solid ${({ theme }) => theme.colors.yellow};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.yellow};
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 색상 */
  background: none;
  &:hover {
    color: ${({ theme }) => theme.colors.purple};
    border: 2px solid ${({ theme }) => theme.colors.purple};
  }

  /* 크기 */
  height: 3rem;
  line-height: 3rem; // 글자 수직 가운데 정렬
  font-size: 1.25rem;
  width: 100%;
`;
