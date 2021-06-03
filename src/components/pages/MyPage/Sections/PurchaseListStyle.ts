import styled, { keyframes, css } from 'styled-components';

const showModal = keyframes`
  from {
    opacity: 0.5;
    transform: translateY(3%);
  }
  to{
    opacity: 1;
    transform: translateY(0%);
  }
`;

export const PURCHASELIST = styled.div<{ showPurchase: boolean }>`
  grid-column: 5/7;
  grid-row: 2/11;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 0.2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: relative;
  overflow: hidden;
  /* min-width: 261px; */

  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    top: -0.1rem;
  }

  @media screen and (max-width: 768px) {
    display: none;
    z-index: 5;
    animation: ${showModal} 0.5s forwards;

    ${({ showPurchase }) =>
      showPurchase &&
      css`
        display: flex;
        grid-column: 2/6;
        grid-row: 2/11;
        position: relative;
        background-color: white;
      `}
  }
`;

export const STAR = styled.div`
  color: grey;
`;

export const GO_TO_REVIEW = styled.div`
  color: ${({ theme }) => theme.colors.purple};

  &:hover {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.yellow};
  }
`;

// -----------모바일 버튼 -------------- //

export const MOBILE_ESC = styled.div<{ showPurchase: boolean }>`
  display: none;
  color: black;
  position: absolute;
  top: 50%;
  right: 0.7rem;
  transform: translateY(-50%);
  margin-left: auto;
  cursor: pointer;
  color: black;
  ${(props) => props.showPurchase && 'display:block;'}
`;
