import styled from 'styled-components';

export const CONTAINER = styled.div`
  place-items: center;
  grid-column: 10/13;
  grid-row: 1/10;
  box-shadow: 1px 1px 3px 1px #dadce0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 65vh;
  @media screen and (max-width: 768px) {
    grid-column: 1/13;
    grid-row: 13/16;
  }
`;

export const IMAGESPAN = styled.div`
  width: 450px;
  line-height: 8vh;
  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.lightgray};
`;

export const IMAGEBIGDIV = styled.div`
  width: 450px;
  height: 450px;
  max-width: 450px;
  display: flex;
  padding: 10px;
`;

export const IMAGEDIV = styled.div`
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
  position: relative;
  margin: 10px;
  box-shadow: 1px 1px 4px 2px #dadce0;
`;

export const PLUS = styled.div`
  position: absolute;
  margin-left: 220px;
  margin-top: 223px;
  width: 190px;
  height: 190px;
  ${({ theme }) => theme.common.flexCenter}
  cursor: pointer;
  background-color: #fffcf0;
  box-shadow: 1px 1px 3px 1px #dadce0;
  color: gray;
  &:hover {
    color: ${({ theme }) => theme.colors.purple};
  }
`;

export const SPAN = styled.span`
  font-size: 3.5rem;
`;
