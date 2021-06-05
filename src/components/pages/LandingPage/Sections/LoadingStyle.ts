import styled, { keyframes } from 'styled-components';

export const ROTATE = keyframes`
from {
    transform: rotate(0deg);
}
to{
    transform: rotate(360deg);
}
`;

export const CONTAINER = styled('div')<{ loading: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${({ loading }) => (loading ? 'flex' : 'none')};
  height: 100%;
  width: 100%;
  /* background-color: rgba(0, 0, 0, 0.2); */
  justify-content: center;
  align-items: center;
`;

export const LOADING = styled('div')<{ size: string }>`
  animation: ${ROTATE} 1.3s linear infinite;

  border-top: 5px solid ${({ theme }) => theme.colors.lightpurple};
  border-right: 5px solid ${({ theme }) => theme.colors.lightpurple};
  border-bottom: 5px solid ${({ theme }) => theme.colors.lightpurple};
  border-left: 7px solid ${({ theme }) => theme.colors.purple};
  background: transparent;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;
