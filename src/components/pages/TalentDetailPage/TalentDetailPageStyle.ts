import styled from 'styled-components';

export const CONTAINER = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(4, 1fr);
  height: 87vh;
  grid-gap: 20px;
  margin: 1.25rem auto;
  width: 75%;
  @media screen and (max-width: 1024px) {
    width: 95%;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(6, 1fr);
    width: 95%;
    height: 120vh;
  }
  margin-top: 5.5rem;
`;

export const SELLER = styled.div`
  grid-column: 1/3;
  grid-row: 1/4;
  box-shadow: 0 0 3px 1px ${({ theme }) => theme.colors.lightpurple};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  // min-width: 180px;
`;

export const PROFILE = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  height: 40%;
`;

export const PROFILEIMG = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  width: 50%;
`;

export const IMG = styled.img`
  border-radius: 50%;
  width: 100%;
`;

export const NICKNAME = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 2rem;
`;

export const GRADE = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 20%;
`;

export const RATING = styled.div``;

export const COUNT = styled.div`
  margin-top: 1rem;
`;

export const BUTTONDIV = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  height: 10%;
`;

export const DETAIL = styled.div`
  grid-column: 3/7;
  grid-row: 1/4;
  box-shadow: 0 0 3px 1px ${({ theme }) => theme.colors.lightpurple};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  // margin-left: 0.5rem;
  // min-width: 180px;
`;

export const TOP = styled.div`
  padding: 0 2rem;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const CATEGORY = styled.div`
  margin-left: auto;
  margin-right: 0.5rem;
  color: gray;
  margin-bottom: 2.5rem;
`;

export const PRICE = styled.div`
  margin-left: auto;
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.colors.purple};
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 0.3rem;
  margin-bottom: 0.5rem;
`;

export const TITLE = styled.div`
  height: 10%;
  ${({ theme }) => theme.common.flexCenter};
  font-size: 1.25rem;
  font-weight: bold;
`;

export const DESCRIPTION = styled.div`
  padding-right: 0.4rem;
  padding-left: 0.7rem;
  height: 45%;
  display: flex;
  white-space: pre-wrap;
  line-height: 180%;
  margin-top: 2rem;
`;

export const BOTTOM = styled.div`
  padding: 0 0.5rem;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
`;

export const ADDRESS = styled.div`
  height: 100%;
  margin-right: 1rem;
  color: gray;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
`;

export const SHAREBOX = styled.div`
  display: flex;
`;

export const SHAREDIV = styled.div`
  border-radius: 15px;
  border: 1.5px solid #ececf5;
  position: relative; // url 복사할때, textarea 영역이 보이지 않도록 하기 위해.
  overflow: hidden;
  width: 50px;
  height: 50px;
  ${({ theme }) => theme.common.flexCenter};
  &:hover {
    cursor: pointer;
    box-shadow: 1px 1px 2px 0.5px #dadce0;
  }
`;

export const KAKAO = styled.img`
  width: 25px;
  height: 25px;
`;

export const CLIP = styled.img`
  width: 25px;
  height: 25px;
`;

export const SHARETEXTAREA = styled.textarea`
  position: absolute;
  width: 0px;
  height: 0px;
  bottom: 0;
  left: 0;
  opacity: 0;
`;

export const EDITCATEGORY = styled.select`
  border: none;
  outline: none;
  box-shadow: 1px 1px 3px 1px #dadce0;
  height: 130%;
  margin-left: 0.5rem;
  color: gray;
`;

export const OPTION = styled.option`
  all: unset;
  color: red;
  &:hover {
    color: ${({ theme }) => theme.colors.yellow};
    border: 2px solid ${({ theme }) => theme.colors.yellow};
  }
`;

export const PRICEINPUT = styled.input`
  all: unset;
  box-shadow: 1px 1px 3px 1px #dadce0;
  &:focus {
    box-shadow: 1px 1px 3px 1px #835af1;
  }
  text-align: end;
  width: 6rem;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  padding-right: 0.5rem;
`;

export const TITLEINPUT = styled.input`
  all: unset;
  box-shadow: 1px 1px 3px 1px #dadce0;
  &:focus {
    box-shadow: 1px 1px 3px 1px #835af1;
  }
  text-align: center;
  width: 100%;
  padding: 0.5rem 1rem;
`;

export const EDITDESC = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre-wrap;
  line-height: 180%;
  margin-top: 1rem;
`;

export const TEXTAREA = styled.textarea`
  all: unset;
  height: 90%;
  width: 100%;
  box-shadow: 1px 1px 3px 1px #dadce0;
  &:focus {
    box-shadow: 1px 1px 3px 1px #835af1;
  }
  padding: 1rem 0.5rem;
  line-height: 180%;
`;

export const PHOTOS = styled.div`
  grid-column: 1/7;
  grid-row: 4/5;
  display: flex;
  justify-content: space-evenly;
  padding: 1rem 0;
  border: 3px solid ${({ theme }) => theme.colors.lightpurple};
`;

export const PHOTODIV = styled.div`
  box-shadow: 0px 0px 2px 0.5px ${({ theme }) => theme.colors.lightpurple};
  background-color: white;
  width: 30%;
  ${({ theme }) => theme.common.flexCenter};
`;

export const PHOTO = styled.img`
  // height: 80%;
  // width: 40%;
  // max-width: 215px;
  max-height: 122px;
  width: 100%;
  // height: 100%;
  // height: 122px;
  // border: 2px solid #dadce0;
  cursor: pointer;
  &:hover {
    position: absolute;
    bottom: 2rem;
    max-width: 400px;
    max-height: 400px;
    width: 400px;
    height: auto;
    background-color: white;
    box-shadow: 1px 1px 50px 15px #dadce0;
    /* top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
  }
`;

export const SPAN = styled.span`
  color: ${({ theme }) => theme.colors.lightpurple};
`;
