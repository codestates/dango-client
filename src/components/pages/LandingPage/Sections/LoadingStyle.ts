import styled, { keyframes } from 'styled-components';

export const ROTATE = keyframes`
from {
    transform: rotate(0deg);
}
to{
    transform: rotate(360deg);
}
`;

export const CONTAINER = styled('div')`
  position: relative;
`;

export const LOADING = styled('div')`
  animation: ${ROTATE} 1.3s linear infinite;
  position: absolute;
  top: 38vh;
  left: 45%;
  border-top: 5px solid ${({ theme }) => theme.colors.lightpurple};
  border-right: 5px solid ${({ theme }) => theme.colors.lightpurple};
  border-bottom: 5px solid ${({ theme }) => theme.colors.lightpurple};
  border-left: 7px solid ${({ theme }) => theme.colors.purple};
  background: transparent;
  width: 24vh;
  height: 24vh;
  border-radius: 50%;
`;
