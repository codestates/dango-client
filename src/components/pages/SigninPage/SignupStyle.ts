import styled from 'styled-components';

import { BACKGROUND, CONTAINER, SIGNINCONTAINER } from './SigninModalStyle';
import { MBUTTON } from '../../../styles/Buttons';

export const SIGNUP_BACKGROUND = styled(BACKGROUND)`
  z-index: 6;
  background: #7f7f7f;
  border: 2px solid #7f7f7f;
  outline: none;
`;

export const SIGNUP_CONTAINER = styled(CONTAINER)`
  height: 50%;
  max-width: 350px;
`;

export const CLOSEBTN = styled('button')`
  position: absolute;
  top: 5px;
  left: 300px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: white;
  width: 40px;
  height: 40px;
`;

export const SIGNUP_DIV = styled(SIGNINCONTAINER)`
  padding: 20px;
  height: 130px;
  justify-content: space-between;
`;

export const SIGNUP_FORM = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  padding: 20px;
  padding-left: 17px;
  height: 5px;
  left: 60px;
`;

export const SIGNUP_SPAN = styled('div')`
  top: 200px;
  justify-content: center;
  align-items: center;
`;

export const SIGNUP_INPUT = styled('input')`
  top: 25px;
  left: 0;
  position: relative;
  outline: 0;
  padding: 8px;
  border: 0px;
  background-color: ${({ theme }) => theme.colors.lightpurple};
  font-size: 1rem;
  color: #83818c;
`;

export const SIGNUP_BTN = styled(MBUTTON)`
  top: 50px;
  left: 0;
  padding: 6px;
  position: relative;
`;
