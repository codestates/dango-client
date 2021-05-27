import styled from 'styled-components';

export const CONTAINER = styled.div`
  display: grid;
  height: 100vh;
  gap: 20px;
  // font-size: 1.5rem;
  padding-bottom: 1rem;
`;

export const FORM = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  // align-items: center;
  grid-column: 1/10;
  grid-row: 3/13;
  // border: 1px solid black;
  margin: 0 1rem;
  padding: 1rem;
  box-shadow: 1px 1px 3px 1px #dadce0;
`;

export const TITLE = styled.input`
  all: unset;
  height: 10%;
  // border-bottom: 1px solid white;
  box-shadow: 1px 1px 3px 1px #dadce0;
  &:focus {
    // border-bottom: 2px solid #835af1;
    box-shadow: 1px 1px 3px 1px #835af1;
  }
  background-color: #fffcf0;
  padding: 0 1rem;
  color: #835af1;
`;

export const SEARCHBOX = styled.div`
  // display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: start;
  align-items: center;
  // border: 1px solid black;
  width: 100%;
  height: 10%;
  margin-bottom: 8rem;
  display: flex;
  justify-content: space-between;
`;
export const ADDRESS = styled.div`
  // border: 1px solid red;
  // grid-column: 2/3;
  width: 60%;
  height: 100%;
  ${({ theme }) => theme.common.flexCenter}
  box-shadow: 1px 1px 3px 1px #dadce0;
  max-width: 600px;
`;

export const CATEGPRICE = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10%;
  // margin-bottom: 5.5rem;
`;

export const CATEGORY = styled.select`
  border: none;
  outline: none;
  width: 40%;
  box-shadow: 1px 1px 3px 1px #dadce0;
  padding-left: 1rem;
`;

export const OPTION = styled.option`
  all: unset;
  color: red;
  &:hover {
    color: ${({ theme }) => theme.colors.yellow};
    border: 2px solid ${({ theme }) => theme.colors.yellow};
  }
`;

export const PRICE = styled.div`
  display: flex;
  justify-content: space-evenly;
  // height: 10%;
  // border: 1px solid;
  width: 40%;
`;

export const PRICEINPUT = styled.input`
  all: unset;
  // height: 10%;
  // border-bottom: 1px solid white;
  box-shadow: 1px 1px 3px 1px #dadce0;
  &:focus {
    // border-bottom: 2px solid #835af1;
    box-shadow: 1px 1px 3px 1px #835af1;
  }
  text-align: end;
  padding-right: 1rem;
`;

export const FREE = styled.div`
  ${({ theme }) => theme.common.flexCenter}
`;

export const FREELABEL = styled.label`
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

export const FREEINPUT = styled.input`
  display: absolute;
  position: absolute;
  opacity: 0;
  &:checked + ${FREELABEL} {
    background-color: ${({ theme }) => theme.colors.yellow};
    color: #fff;
  }
`;

export const DESCRIPTION = styled.textarea`
  all: unset;
  height: 30%;
  // border-bottom: 1px solid white;
  box-shadow: 1px 1px 3px 1px #dadce0;
  &:focus {
    // border-bottom: 2px solid #835af1;
    box-shadow: 1px 1px 3px 1px #835af1;
  }
  background-color: #fffcf0;
  padding: 1rem;
`;

export const BUTTONDIV = styled.div`
  grid-column: 10/13;
  grid-row: 12/13;
  ${({ theme }) => theme.common.flexCenter}
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
  margin-right: 1rem;

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
