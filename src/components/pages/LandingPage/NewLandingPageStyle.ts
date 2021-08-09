import styled, { css, keyframes } from 'styled-components';
import section1Main from '../../../images/Section1-mainsvg.svg';
import section1Sub from '../../../images/Section1-subsvg.svg';
import section2Main from '../../../images/Section2-main.svg';
import section2Sub from '../../../images/Section2-subsvg.svg';
import section2Marker from '../../../images/Section2-marker.svg';
import section4Sub1 from '../../../images/Section4-sub1.svg';
import section4Main from '../../../images/Section4-main.svg';
import section4Sub2 from '../../../images/Section4-sub2.svg';

import { LBUTTON } from '../../../styles/Buttons';

const FADEIN = keyframes`
to {
    opacity: 1;
}
`;

const NONE = keyframes`
  ${'0%'} {
    opacity: 1;
  }

  ${'33%'} {
    opacity: 0.7;
  }

  ${'67%'} {
    opacity: 0.4;
  }

  ${'100%'} {
    opacity: 0;
  }
`;

export const CONTAINER = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(44, 1fr);
  grid-row-gap: 2%;
  grid-column-gap: 2%;
  height: 440vh;
  width: 100%;
  position: absolute;
  top: 228%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const SECTION1 = styled.div`
  display: grid;
  grid-column: 2/8;
  grid-row: 1/10;
  height: 100vh;
  position: relative;
  opacity: 0;
  animation: ${FADEIN} 1s linear forwards;
  animation-delay: 1s;
`;

export const SECTION1SVG = styled.img`
  display: grid;
  grid-column: 1/4;
  grid-row: 2/4;
  width: 90%;
  height: 90%;
  @media screen and (max-width: 768px) {
    width: 60%;
    height: 60%;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

SECTION1SVG.defaultProps = {
  src: section1Sub,
};

export const SECTION1_TITLE = styled.div`
  display: grid;
  grid-column: 2/4;
  grid-row: 3/4;
  font-size: 4.1rem;
  font-weight: bold;
  min-width: 320px;
  z-index: 2;
  @media screen and (max-width: 1024px) {
    font-size: 3.2rem;
    min-width: 190px;
  }
  @media screen and (max-width: 768px) {
    grid-column: 2/7;
  }
  @media screen and (max-width: 375px) {
    font-size: 2.6rem;
  }
`;

export const SECTION1_SUBTITLE = styled.div`
  display: grid;
  grid-column: 2/4;
  grid-row: 4/6;
  font-size: 1.75rem;
  font-weight: regular;
  @media screen and (max-width: 1024px) {
    font-size: 1.4rem;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const SECTION1_BTN = styled(LBUTTON)`
  display: grid;
  grid-column: 2/3;
  grid-row: 6/8;
  @media screen and (max-width: 768px) {
    grid-column: 1/8;
  }
`;

export const SECTION1IMG = styled.img`
  display: grid;
  grid-column: 4/7;
  grid-row: 2/7;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
    grid-column: 1/8;
    grid-row: 3/6;
  }
`;

SECTION1IMG.defaultProps = {
  src: section1Main,
};

export const SECTION2 = styled(SECTION1)<{ scrollY: number }>`
  grid-row: 13/22;
  animation: ${({ scrollY }) =>
    scrollY > 628
      ? css`
          ${FADEIN} 1.5s linear forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;

export const SECTION2MAIN = styled.img`
  display: grid;
  grid-column: 1/4;
  grid-row: 2/7;
  width: 80%;
  height: 80%;
  @media screen and (max-width: 768px) {
    grid-column: 1/8;
    grid-row: 3/6;
    width: 100%;
  }
`;

SECTION2MAIN.defaultProps = {
  src: section2Main,
};

export const SECTION2SUB = styled.img`
  display: grid;
  grid-column: 4/5;
  grid-row: 2/4;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

SECTION2SUB.defaultProps = {
  src: section2Sub,
};

export const SECTION2_TITLE = styled(SECTION1_TITLE)`
  grid-column: 5/8;
  grid-row: 2/3;
  @media screen and (max-width: 768px) {
    grid-column: 3/6;
  }
`;

export const SECTION2MARKER = styled.img`
  display: grid;
  grid-column: 5/5;
  grid-row: 1/1;
  @media screen and (max-width: 768px) {
    grid-column: 3/3;
  }
  @media screen and (max-width: 425px) {
    display: none;
  }
`;

SECTION2MARKER.defaultProps = {
  src: section2Marker,
};

export const SECTION2_SUBTITLE = styled(SECTION1_SUBTITLE)`
  grid-column: 5/8;
  grid-row: 3/4;
`;

export const SECTION2_BTN = styled(LBUTTON)`
  display: grid;
  grid-column: 5/5;
  grid-row: 5/6;
  @media screen and (max-width: 768px) {
    grid-column: 1/8;
  }
`;

export const SECTION3 = styled(SECTION1)<{ scrollY: number }>`
  grid-column: 1/9;
  grid-row: 25/27;
  height: 30vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightpurple};
  animation: ${({ scrollY }) =>
    scrollY > 1460
      ? css`
          ${FADEIN} 1.5s linear forwards
        `
      : css`
          ${NONE} 3s forwards
        `};
`;

export const DIV = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn}
`;

export const SECTION3_TITLE = styled.div`
  ${({ theme }) => theme.common.flexCenter}
  font-size: 2.3rem;
  font-weight: bold;
  @media screen and (max-width: 425px) {
    font-size: 1.5rem;
  }
`;

export const SECTION3_SUBTITLE = styled.div`
  ${({ theme }) => theme.common.flexCenter}
  margin: ${({ theme }) => theme.margins.lg};
  font-size: 1.3rem;
  @media screen and (max-width: 425px) {
    display: none;
  }
`;

export const SECTION3_BTN = styled(LBUTTON)`
  ${({ theme }) => theme.common.flexCenter};
  margin: ${({ theme }) => theme.margins.xxxl};
  width: 130px;
  @media screen and (max-width: 768px) {
    width: 73%;
  }
`;

export const SECTION4 = styled(SECTION1)<{ scrollY: number }>`
  grid-row: 30/39;
  animation: ${({ scrollY }) =>
    scrollY > 1890
      ? css`
          ${FADEIN} 1.5s linear forwards
        `
      : css`
          ${NONE} 3s forwards
        `};
`;

export const SECTION4SUB1 = styled.img`
  display: grid;
  grid-column: 1/2;
  grid-row: 1/7;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

SECTION4SUB1.defaultProps = {
  src: section4Sub1,
};

export const SECTION4_TITLE = styled.div`
  display: grid;
  grid-column: 1/8;
  grid-row: 1/2;
  font-size: 3.8rem;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1024px) {
    font-size: 3.5rem;
  }
  @media screen and (max-width: 768px) {
    grid-row: 2/3;
  }
  @media screen and (max-width: 375px) {
    margin-left: 9px;
    font-size: 2.6rem;
  }
`;

export const SECTION4_SUBTITLE = styled(SECTION1_SUBTITLE)`
  grid-column: 3/6;
  grid-row: 2/3;
  justify-content: center;
  align-items: center;
`;

export const SECTION4_BTN = styled(LBUTTON)`
  display: grid;
  grid-column: 4/5;
  grid-row: 3/4;
  @media screen and (max-width: 768px) {
    grid-column: 1/8;
    grid-row: 6/7;
  }
`;

export const SECTION4_MAIN = styled.img`
  display: grid;
  grid-column: 2/7;
  grid-row: 4/8;
  width: 100%;
  height: 100%;
  justify-content: center;
  @media screen and (max-width: 768px) {
    grid-row: 3/7;
  }
`;

SECTION4_MAIN.defaultProps = {
  src: section4Main,
};

export const SECTION4SUB2 = styled.img`
  display: grid;
  grid-column: 7/8;
  grid-row: 1/7;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

SECTION4SUB2.defaultProps = {
  src: section4Sub2,
};

export const FOOTER = styled.div`
  display: grid;
  grid-column: 1/9;
  grid-row: 42/45;
  position: relative;
  border-top: 0.5px solid #efefef;
`;

export const FOOTER_LOGO = styled.div`
  display: grid;
  grid-column: 2/3;
  grid-row: 1/2;
  color: ${({ theme }) => theme.colors.purple};
  font-size: 1.9rem;
  font-weight: 500;
  justify-content: center;
  align-items: center;
`;

export const ABOUTUS = styled.div`
  display: grid;
  grid-column: 6/7;
  grid-row: 1/2;
  font-size: 1.3rem;
  justify-content: center;
  align-items: center;
`;

export const CONTACT = styled(ABOUTUS)`
  grid-column: 7/8;
`;

export const LI_A = styled.div`
  grid-column: 6/7;
  grid-row: 2/3;
  font-size: 0.9rem;
  font-weight: 300;
`;

export const LI_B = styled(LI_A)`
  grid-column: 7/8;
`;

export const RIGHTSDIV = styled.div`
  display: grid;
  grid-column: 1/9;
  grid-row: 3/4;
  font-size: 0.9rem;
  justify-content: center;
  color: gray;
`;
