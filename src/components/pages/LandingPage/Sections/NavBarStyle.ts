import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LINK = styled(Link)<{ current: boolean; disPlay: boolean }>`
  padding: 15px 20px;
  color: ${(props) => (props.current ? '#6A60A9' : '#83818c')};
  border-top: 3px solid white;
  border-bottom: 3px solid ${(props) => (props.current ? '#6A60A9' : 'transparent')};
  font-weight: ${(props) => (props.current ? 450 : 320)};
  font-size: 1.15rem;
  z-index: 15;
  &:hover {
    color: ${({ theme }) => theme.colors.purple};
    font-weight: 450;
    cursor: pointer;
    border-bottom: 3px solid ${(props) => (props.current ? '#6A60A9' : '#F6F6F6')};
  }
  @media screen and (max-width: 895px) {
    border-bottom: none;
    display: ${({ disPlay }) => (disPlay ? 'flex' : 'none')};
    &:hover {
      border-bottom: none;
    }
  }
`;

export const NAV = styled('ul')`
  list-style: none;
  justify-content: space-around;
  width: 40%;
  margin-left: auto;
  padding-left: 0;
  display: inline-flex;
  position: relative;
  @media screen and (max-width: 895px) {
    flex-direction: column;
    display: flex;
    align-items: center;
    width: 100%;
  }
`;

export const MENUBARS = styled('button')`
  display: none;
  border-style: none;
  background-color: #fff;
  z-index: 1;
  color: #83818c;
  padding: 9px 25px 0 0;
  right: 25px;
  @media screen and (max-width: 895px) {
    display: flex;
    position: absolute;
    &:hover {
      color: ${({ theme }) => theme.colors.purple};
      cursor: pointer;
    }
  }
`;

export const LOGO = styled('div')`
  color: ${({ theme }) => theme.colors.purple};
  font-size: 2.4rem;
  padding: 9px 25px 0 0;
  font-weight: 600;
`;

export const LOGOCONTAINER = styled('div')`
  display: flex;
  margin-right: 5px;
  @media screen and (max-width: 895px) {
  }
`;

export const CONTAINER = styled('header')`
  display: flex;
  padding: 5px 30px;
  top: 0;
  width: 100%;
  align-items: center;
  background-color: #fff;
  z-index: 15;
  justify-content: space-between;
  border-bottom: 0.5px solid #efefef;
  position: fixed;
  ${NAV}:first-child {
    margin-right: auto;
  }
  @media screen and (max-width: 895px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
