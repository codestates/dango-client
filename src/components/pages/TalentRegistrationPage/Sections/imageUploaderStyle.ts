import styled from 'styled-components';

export const CONTAINER = styled.div`
  place-items: center;
  grid-column: 10/13;
  grid-row: 1/10;
  box-shadow: 1px 1px 3px 1px #dadce0;
  // margin-right: 1rem;
  /* width: auto;
  height: auto; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  @media screen and (max-width: 768px) {
    grid-column: 1/13;
    grid-row: 13/16;
  }
`;

export const IMAGESPAN = styled.div`
  // border: 1px solid;
  width: 450px;
  height: 8vh;
  line-height: 8vh;
  // padding: 0 2rem;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.purple};
  font-weight: 600;
  // text-align: center;
`;

export const IMAGEBIGDIV = styled.div`
  width: 450px;
  height: 450px;
  max-width: 450px;
  box-shadow: 1px 1px 3px 1px #dadce0;
  display: flex;
  /* justify-content: center;
  align-items: center; */
  padding: 10px;
`;

export const IMAGEDIV = styled.div`
  // border: 2px solid red;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

export const IMAGEP = styled.p`
  display: flex;
  flex-direction: row;
  width: 190px;
  height: 190px;
  overflow-x: scroll;
  // border: 1px solid;
  position: relative;
  margin: 10px;
  box-shadow: 1px 1px 4px 2px #dadce0;
`;

export const PLUS = styled.div`
  position: absolute;
  margin-left: 220px;
  margin-top: 220px;
  // border: 1px solid;
  width: 190px;
  height: 190px;
  ${({ theme }) => theme.common.flexCenter}
  cursor: pointer;
  background-color: #fffcf0;
  box-shadow: 1px 1px 3px 1px #dadce0;
  &:hover {
    color: ${({ theme }) => theme.colors.purple};
  }
`;

export const SPAN = styled.span`
  font-size: 3.5rem;
`;
