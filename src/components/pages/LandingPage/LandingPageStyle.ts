import styled, { keyframes } from 'styled-components';

const SHOWUP = keyframes`
  ${'0%'} {
    opacity: 0;
  }

  ${'20%'} {
    opacity: 1;
  }

  ${'80%'} {
    opacity: 1;
  }

  ${'100%'} {
    opacity: 0;
  }
`;

const SLIDEIN = keyframes`
  ${'0%'} {
    margin-left: -800px;
    opacity: 0;
  }

  ${'20%'} {
    margin-left: -800px;
    opacity: 0;
  }

  ${'40%'} {
    margin-left: 0px;
    opacity: 0;
  }

  ${'80%'} {
    margin-left: 0px;
    opacity: 1;
  }

  ${'100%'} {
    margin-left: 0px;
    opacity: 1;
  }
`;

const REVEAL = keyframes`
  ${'0%'} {
    opacity: 0;
    width: 0px;
  }

  ${'20%'} {
    opacity: 1;
    width: 0px;
  }

  ${'30%'} {
    width: 355px;
  }

  ${'80%'} {
    opacity: 1;
  }

  ${'100%'} {
    opacity: 1;
    width: 355px;
  }
`;

export const STRUCTURE = styled('div')`
  padding: 20px;
  ${({ theme }) => theme.common.flexCenter}
`;

export const TITLECONTAINER = styled('div')`
  ${({ theme }) => theme.common.flexCenter};
  text-align: center;
  font-weight: 300;
  font-size: 70px;
  padding-top: 20vh;
  height: 70vh;
  overflow: hidden;
  animation: ${SHOWUP} 9s ease-in-out forwards;
`;

export const HELLO = styled('div')`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  color: #83818c;
  animation: ${REVEAL} 9s ease-in-out forwards;
`;

export const TITLE = styled(HELLO)`
  color: ${({ theme }) => theme.colors.purple};
  margin-left: -355px;
  animation: ${SLIDEIN} 9s ease-in-out forwards;
`;
