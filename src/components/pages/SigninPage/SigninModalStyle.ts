import styled, { keyframes } from 'styled-components';

import loginsvg from '../../../images/loginsvg.svg';

export const SHOWMODAL = keyframes`
from {
  opacity: 0.5;
  transform: translate(0%, 2%);
}
to{
  opacity: 1;
  transform: translate(0%, -4%);
}
`;

export const BACKGROUND = styled('div')`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  z-index: 6;
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const CONTAINER = styled('div')`
  outline: 0;
  max-width: 600px;
  height: 460px;
  background: white;
  animation: ${SHOWMODAL} 0.7s forwards;
`;

export const SIGNINCONTAINER = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  padding-top: 40px;
  min-width: 400px;
  flex: 1 1 0%;
  position: relative;
`;

export const XBTN = styled('button')`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: white;
  width: 70px;
  height: 70px;
  padding: 11px;
  outline: none;
  position: absolute;
  top: 1px;
  right: 3px;
`;

export const IMG = styled('img')`
  height: 135px;
  width: 300px;
`;

IMG.defaultProps = {
  src: loginsvg,
};

export const WELCOME = styled('div')`
  margin-top: 45px;
`;

export const DESCRIPTION = styled('div')`
  margin-top: 10px;
  max-width: 427px;
  text-align: center;
  line-height: 1.71;
  color: rgb(91, 91, 91);
  font-size: 14px;
  font-weight: 300;
`;

export const BTNCONTAINER = styled('div')`
  width: 80%;
  margin: 1rem;
  margin-top: 2rem;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BTNDIV = styled('div')`
  padding: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
  cursor: pointer;
`;

export const GOOGLE = styled('div')`
  box-shadow: rgb(0 0 0 / 24%) 0px 2px 2px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px;
  display: flex;
  align-items: center;
  height: 45px;
  width: 172px;
  padding: 10px;
`;

export const LOGO = styled('img')`
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.25rem;
`;
