import styled, { css, keyframes } from 'styled-components';

import mainSVG from '../../../images/mainimg.svg';

import mapTest from '../../../images/maptest.jpg';
import mapSVG from '../../../images/mapsvg.svg';

import chatTest from '../../../images/chattest.jpg';
import chatSVG from '../../../images/chatsvg.svg';

import talentTest from '../../../images/talenttest.jpeg';
import talentSVG from '../../../images/talentsvg.svg';

import lastSVG from '../../../images/lastsvg.svg';
import { LBUTTON } from '../../../styles/Buttons';

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

const FADEOUT = keyframes`
${'0%'} {
    opacity: 1;
  }

  ${'20%'} {
    opacity: 0.7;
  }

  ${'80%'} {
    opacity: 0.4;
  }

  ${'100%'} {
    opacity: 0;
  }
`;

const SLIDEIN = keyframes`
  ${'0%'} {
    margin-left: -47vw;
    opacity: 0;
  }

  ${'20%'} {
    margin-left: -47vw;
    opacity: 0;
  }

  ${'40%'} {
    margin-left: 0vw;
    opacity: 0;
  }

  ${'80%'} {
    margin-left: 0vw;
    opacity: 1;
  }

  ${'100%'} {
    margin-left: 0vw;
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

const DRIFT = keyframes`
from {
    transform: rotate(0deg);
}
to {
    transform: rotate(360deg);
}

`;

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

const LINE = keyframes`
to{
    stroke-dashoffset: -120;
}
`;

const ROTATE1 = keyframes`
from {
  opacity: 0;
}
to {
    opacity: 1;
    transform: rotate(35deg);
}
`;
const ROTATE2 = keyframes`
from {
  opacity: 0;
}
to {
    opacity: 1;
    transform: rotate(38deg);
}
`;

const MAPFADEIN1 = keyframes`
from {
    opacity: 0;
    left: -300px;
    max-width: 100%;
}
to {
    opacity: 1;
    
}
`;

const MAPFADEIN2 = keyframes`
from {
    opacity: 0;
    left: -600px;
    max-width: 100%;
}
to {
    opacity: 1;
    
}
`;

const MAPFADEIN3 = keyframes`
from {
    opacity: 0;
    left: -600px;
    max-width: 100%;
}
to {
    opacity: 1;
    
}
`;

const CHATFADEIN1 = keyframes`
from {
    opacity: 0;
    bottom: -600px;
}
to {
    opacity: 1
}
`;

const CHATFADEIN2 = keyframes`
from {
    opacity: 0;
    bottom: -600px;
}
to {
    opacity: 1
}
`;

const TALENTFADEIN = keyframes`
from {
    opacity: 0;
    right: -300px;
    max-width: 100%;
}
to {
    opacity: 1;
}
`;

export const RELATIVE = styled('div')`
  position: relative;
  /* max-width: 100%;
  overflow-x: hidden; */
  /* overflow: hidden;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box; */
`;

// ::::::::::::::::::::: 인트로 DIV :::::::::::::::::::::

export const DIV = styled('div')`
  ${({ theme }) => theme.common.flexCenter};
  /* text-align: center; */
  font-weight: 300;
  font-size: 4rem;
  padding-top: 5vh;
  height: 100%;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: auto;
  }
`;

export const TITLECONTAINER = styled('div')`
  ${({ theme }) => theme.common.flexCenter};
  text-align: center;
  font-weight: 300;
  font-size: 4rem;
  padding-top: 15vh;
  height: 70vh;
  overflow: hidden;
  /* position: relative; */
  animation: ${SHOWUP} 4s ease-in-out forwards;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: auto;
  }
`;

export const HELLO = styled('div')`
  display: inline-block;
  white-space: nowrap;
  color: #83818c;
  animation: ${REVEAL} 4s ease-in-out forwards;
`;

export const TITLE = styled(HELLO)`
  color: ${({ theme }) => theme.colors.purple};
  margin-left: -1vw;
  animation: ${SLIDEIN} 4s ease-in-out forwards;
  @media screen and (max-width: 768px) {
    margin-top: 5vh;
  }
`;

// ::::::::::::::::::::: 처음 랜딩 :::::::::::::::::::::

export const CIRCLECONTAINER = styled(DIV)`
  opacity: 0;
  animation: ${FADEIN} 1s linear forwards;
  animation-delay: 4s;
  position: absolute;
  width: 90vw;
  left: 5.5vw;
  top: 15vh;
`;

export const CIRCLETITLE = styled('div')`
  color: ${({ theme }) => theme.colors.black};
  font-size: 3.2rem;
  position: absolute;
  left: 7%;
  top: 30%;
  z-index: 6;
  @media screen and (max-width: 768px) {
    left: 5%;
  }
`;

export const CIRCLEDESCRIPTION = styled('div')`
  font-size: 1.4rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.black};
  position: absolute;
  left: 3.5vw;
  top: 44%;
  z-index: 6;
  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const IMGCONTAINER = styled('div')`
  left: 51vw;
  top: 24vh;
  position: absolute;
  z-index: 5;
  @media screen and (max-width: 1240px) {
    left: 40vw;
    top: 26vh;
  }
  @media screen and (max-width: 850px) {
    left: 20vw;
  }
  @media screen and (max-width: 600px) {
    top: 35vh;
  }
  /* @media screen and (max-width: 730px) {
    left: 25vw;
  }
  @media screen and (max-width: 650px) {
    left: 20vw;
  }
  @media screen and (max-width: 580px) {
    left: 10vw;
  } */
`;

export const MAINIMG = styled('img')`
  width: 50vmin;
  height: 60vmin;
  /* @media screen and (max-width: 1080px) {
    width: 60vw;
    height: 50vh;
  } */
  /* @media screen and (max-width: 865px) {
    width: 400vw;
    height: 200px;
  } */
`;

MAINIMG.defaultProps = {
  src: mainSVG,
};

export const CIRCLE = styled('div')`
  width: 30%;
  height: 69%;
  background: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.lightpurple};
  border-radius: 48%;
  position: absolute;
  right: 14%;
  top: 18%;
  transform-origin: 50% 48%;
  animation: ${DRIFT} 11s linear infinite;
  transition: opacity 3s 7s;
  @media screen and (max-width: 1350px) {
    width: 380px;
    height: 380px;
  }
`;

export const CIRCLE_2 = styled(CIRCLE)`
  width: 20%;
  height: 46%;
  position: absolute;
  background: ${({ theme }) => theme.colors.purple};
  right: 2%;
  top: 40%;
  animation: ${DRIFT} 9s linear infinite reverse;
  @media screen and (max-width: 1350px) {
    animation: ${FADEOUT} 2s forwards;
  }
`;

export const CIRCLE_3 = styled(CIRCLE)`
  width: 15%;
  height: 35%;
  position: absolute;
  background: ${({ theme }) => theme.colors.purple};
  right: 37%;
  top: 51%;
  animation: ${DRIFT} 7s linear infinite reverse;
  @media screen and (max-width: 1350px) {
    animation: ${FADEOUT} 2s forwards;
  }
`;

export const CIRCLE_4 = styled(CIRCLE)`
  animation: ${DRIFT} 9s linear infinite;
  background-color: ${({ theme }) => theme.colors.lightpurple};
`;

export const CIRCLE_5 = styled(CIRCLE_2)`
  animation: ${DRIFT} 7s linear infinite;
  background-color: ${({ theme }) => theme.colors.lightpurple};
  @media screen and (max-width: 1350px) {
    animation: ${FADEOUT} 2s forwards;
  }
`;

export const CIRCLE_6 = styled(CIRCLE_3)`
  animation: ${DRIFT} 5s linear infinite;
  background-color: ${({ theme }) => theme.colors.lightpurple};
  @media screen and (max-width: 1350px) {
    animation: ${FADEOUT} 2s forwards;
  }
`;

// ::::::::::::::::::::: 지도 :::::::::::::::::::::
export const MAPCONTAINER = styled(CIRCLECONTAINER)<{ scrollY: number }>`
  animation: ${({ scrollY }) =>
    scrollY > 350
      ? css`
          ${FADEIN} 1s forwards;
        `
      : css`
          ${NONE} 2s forwards
        `};
`;
export const PATH = styled('svg')<{ scrollY: number }>`
  overflow: inherit;
  position: absolute;
  fill: none;
  stroke: ${({ theme }) => theme.colors.lightgray};
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: 20, 10;
  top: 35vh;
  right: 33vw;
  animation: ${LINE} 2s linear infinite;
  @media screen and (max-width: 1030px) {
    animation: ${FADEOUT} 1s forwards;
  }
`;

export const TRIANGLE_CONTAINER = styled('div')`
  @media screen and (max-width: 750px) {
    width: 20%;
    height: 30%;
    /* left: -10%; */
  }
`;

export const TRIANGLE1 = styled('div')<{ scrollY: number }>`
  position: absolute;
  border-top: 35vh solid transparent;
  border-right: 70vh solid ${({ theme }) => theme.colors.lightpurple};
  border-bottom: 35vh solid transparent;
  animation: ${({ scrollY }) =>
    scrollY > 97
      ? css`
          ${ROTATE1} 4s forwards
        `
      : css`
          ${NONE} 6s forwards
        `};
  position: absolute;
  top: 35vh;
  left: -1vw;
  @media screen and (max-width: 650px) {
    border-right: 70vh solid white;
    animation: ${FADEOUT} 0.1s forwards;
    display: none;
  }
`;
export const TRIANGLE2 = styled(TRIANGLE1)<{ scrollY: number }>`
  border-right: 70vh solid ${({ theme }) => theme.colors.purple};
  border-bottom: 35vh solid transparent;
  animation: ${({ scrollY }) =>
    scrollY > 97
      ? css`
          ${ROTATE2} 4s forwards;
        `
      : css`
          ${NONE} 6s forwards
        `};
  @media screen and (max-width: 650px) {
    border-right: 70vh solid white;
    animation: ${FADEOUT} 0.1s forwards;
    display: none;
  }
`;

export const MAPIMG1 = styled(MAINIMG)<{ scrollY: number }>`
  width: 40vh;
  height: 30vh;
  top: 70vh;
  left: 1%;
  position: absolute;
  animation: ${({ scrollY }) =>
    scrollY > 326
      ? css`
          ${MAPFADEIN1} 2.1s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
  @media screen and (max-width: 750px) {
    animation: ${FADEOUT} 0.3s forwards;
  }
`;

export const MAPIMG2 = styled(MAINIMG)<{ scrollY: number }>`
  width: 40vh;
  height: 30vh;
  top: 52vh;
  left: 15%;
  position: absolute;
  z-index: 5;
  animation: ${({ scrollY }) =>
    scrollY > 326
      ? css`
          ${MAPFADEIN2} 1.7s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
  @media screen and (max-width: 750px) {
    animation: ${FADEOUT} 0.3s forwards;
  }
`;

export const MAPIMG3 = styled(MAINIMG)<{ scrollY: number }>`
  width: 40vh;
  height: 30vh;
  top: 80vh;
  left: 23%;
  position: absolute;
  animation: ${({ scrollY }) =>
    scrollY > 326
      ? css`
          ${MAPFADEIN3} 1.5s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
  @media screen and (max-width: 750px) {
    animation: ${FADEOUT} 0.3s forwards;
  }
`;

MAPIMG1.defaultProps = {
  src: mapTest,
};

MAPIMG2.defaultProps = {
  src: mapTest,
};

MAPIMG3.defaultProps = {
  src: mapTest,
};

export const MAPDESCRIPTION = styled('div')`
  right: 4vmin;
  top: 38vh;
  font-size: 1.4rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.black};
  position: absolute;
  z-index: 6;
  @media screen and (max-width: 850px) {
    right: 2vmin;
  }
  @media screen and (max-width: 680px) {
    right: 5vmin;
  }
`;

export const MAPSVGCONTAINER = styled('div')`
  position: absolute;
  right: 15vh;
  top: 70vh;
`;

export const MAPSVG = styled('img')`
  width: 45vh;
  height: 35vh;
  @media screen and (max-width: 1030px) {
    animation: ${FADEOUT} 1s forwards;
  }
`;

MAPSVG.defaultProps = {
  src: mapSVG,
};

export const SLIDE_CONTAINER = styled('div')`
  display: none;
  width: 60vh;
  height: 50vh;
  margin-top: 2vh;
  top: 65vh;
  left: 4vmin;
  position: absolute;
  overflow: hidden;
  @media screen and (max-width: 700px) {
    display: flex;
    animation: ${MAPFADEIN1} 2.1s forwards;
  }
`;

export const SLIDE_BTN_LEFT = styled('button')`
  opacity: 0.7;
  top: 25vh;
  left: 0;
  border: none;
  background-color: white;
  color: ${({ theme }) => theme.colors.purple};
  border-radius: 10px;
  position: absolute;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: ${({ theme }) => theme.colors.purple};
    color: #fff;
  }
`;
export const SLIDE_BTN_RIGHT = styled('button')`
  opacity: 0.7;
  top: 25vh;
  right: 0;
  border: none;
  background-color: white;
  color: ${({ theme }) => theme.colors.purple};
  border-radius: 10px;
  position: absolute;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: ${({ theme }) => theme.colors.purple};
    color: #fff;
  }
`;

export const IMG_CONTAINER = styled('div')`
  width: 100%;
  display: flex;
  position: absolute;
`;

export const SLIDE_MAPIMG1 = styled('img')`
  width: 60vh;
  height: 50vh;
`;

export const SLIDE_MAPIMG2 = styled('img')`
  width: 60vh;
  height: 50vh;
`;

export const SLIDE_MAPIMG3 = styled('img')`
  width: 60vh;
  height: 50vh;
`;

SLIDE_MAPIMG1.defaultProps = {
  src: mapTest,
};

SLIDE_MAPIMG2.defaultProps = {
  src: chatTest,
};

SLIDE_MAPIMG3.defaultProps = {
  src: talentTest,
};

// ::::::::::::::::::::: 채팅 :::::::::::::::::::::

export const CHATCONTAINER = styled(CIRCLECONTAINER)<{ scrollY: number }>`
  animation: ${({ scrollY }) =>
    scrollY > 1190
      ? css`
          ${FADEIN} 1s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;

export const CHATDESCRIPTION = styled('div')`
  left: 3.5vw;
  top: 153vh;
  font-size: 1.4rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.black};
  position: absolute;
  z-index: 6;
`;

export const CHATIMG1 = styled(MAINIMG)<{ scrollY: number }>`
  width: 55vh;
  height: 40vh;
  top: 165vh;
  right: 5%;
  position: absolute;
  animation: ${({ scrollY }) =>
    scrollY > 1190
      ? css`
          ${CHATFADEIN1} 1.8s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
  @media screen and (max-width: 1130px) {
    animation: ${FADEOUT} 1s forwards;
  }
`;

export const CHATIMG2 = styled(MAINIMG)<{ scrollY: number }>`
  width: 25vh;
  height: 40vh;
  top: 175vh;
  right: 30%;
  position: absolute;
  animation: ${({ scrollY }) =>
    scrollY > 1190
      ? css`
          ${CHATFADEIN2} 1.8s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
  @media screen and (max-width: 1130px) {
    animation: ${FADEOUT} 1s forwards;
  }
`;

CHATIMG1.defaultProps = {
  src: chatTest,
};

CHATIMG2.defaultProps = {
  src: chatTest,
};

export const CHATSVGCONTAINER = styled(IMGCONTAINER)`
  left: 12%;
  top: 170vh;
`;

export const CHATSVG = styled('img')`
  width: 45vh;
  height: 50vh;
`;

CHATSVG.defaultProps = {
  src: chatSVG,
};

export const TALK_BUBBLE1 = styled('div')`
  left: 30vh;
  width: 15vh;
  height: 10vh;
  background: ${({ theme }) => theme.colors.purple};
  position: absolute;
  font-size: 1.5rem;
  text-align: center;
  font-weight: 300;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  animation: ${SHOWUP} 2s infinite;
  animation-delay: 0.5s;
  &:before {
    content: '';
    position: absolute;
    right: 2vh;
    top: 9vh;
    width: 0;
    height: 0;
    border-top: 13px solid transparent;
    border-right: 26px solid ${({ theme }) => theme.colors.purple};
    border-bottom: 13px solid transparent;
    transform: rotate(260deg);
  }
`;

export const TALK_BUBBLE2 = styled('div')`
  left: 4vh;
  top: -5vh;
  width: 15vh;
  height: 10vh;
  background: ${({ theme }) => theme.colors.lightpurple};
  position: absolute;
  font-size: 1.5rem;
  text-align: center;
  font-weight: 300;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  animation: ${SHOWUP} 2s infinite;
  &:before {
    content: '';
    position: absolute;
    left: 2vh;
    top: 9vh;
    width: 0;
    height: 0;
    border-top: 13px solid transparent;
    border-right: 26px solid ${({ theme }) => theme.colors.lightpurple};
    border-bottom: 13px solid transparent;
    transform: rotate(280deg);
  }
`;

// ::::::::::::::::::::: 재능등록 :::::::::::::::::::::

export const TALENTCONTAINER = styled(CIRCLECONTAINER)<{ scrollY: number }>`
  /* overflow: hidden;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box; */
  animation: ${({ scrollY }) =>
    scrollY > 1860
      ? css`
          ${FADEIN} 1s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;

export const TALENTSVGCONTAINER = styled('div')`
  position: absolute;
  right: 56vmin;
  top: 275vh;
  @media screen and (max-width: 784px) {
    right: 74vmin;
  }
`;

export const TALENTSVG = styled('img')<{ scrollY: number }>`
  position: absolute;
  width: 50vh;
  height: 40vh;
  animation: ${({ scrollY }) =>
    scrollY > 1860
      ? css`
          ${CHATFADEIN2} 1.8s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;

TALENTSVG.defaultProps = {
  src: talentSVG,
};

export const TALENTDESCRIPTION1 = styled(MAPDESCRIPTION)`
  position: absolute;
  font-size: 2rem;
  right: 6vh;
  top: 315vh;
`;

export const TALENTDESCRIPTION2 = styled(MAPDESCRIPTION)`
  position: absolute;
  right: 4vh;
  top: 322vh;
`;

export const TALENTIMG1 = styled(MAINIMG)<{ scrollY: number }>`
  width: 55vh;
  height: 40vh;
  top: 255vh;
  left: 2vh;
  position: absolute;
  animation: ${({ scrollY }) =>
    scrollY > 1860
      ? css`
          ${CHATFADEIN1} 1.8s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
  @media screen and (max-width: 1330px) {
    animation: ${FADEOUT} 1s forwards;
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

export const TALENTIMG2 = styled(MAINIMG)<{ scrollY: number }>`
  width: 55vh;
  height: 40vh;
  top: 290vh;
  left: 45vh;
  position: absolute;
  animation: ${({ scrollY }) =>
    scrollY > 1860
      ? css`
          ${CHATFADEIN1} 1.8s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
  @media screen and (max-width: 1330px) {
    animation: ${FADEOUT} 1s forwards;
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

TALENTIMG1.defaultProps = {
  src: talentTest,
};

TALENTIMG2.defaultProps = {
  src: talentTest,
};

export const SQUARE_CONTAINER = styled('div')`
  overflow: hidden;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`;

export const SQUARE1 = styled('div')<{ scrollY: number }>`
  width: 90vh;
  height: 2.5vh;
  position: absolute;
  background: ${({ theme }) => theme.colors.purple};
  top: 270vh;
  left: 2vh;
  animation: ${({ scrollY }) =>
    scrollY > 2000
      ? css`
          ${MAPFADEIN1} 2.1s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
  @media screen and (max-width: 1330px) {
    animation: ${FADEOUT} 1s forwards;
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
`;
export const SQUARE2 = styled('div')<{ scrollY: number }>`
  width: 60vh;
  height: 2.5vh;
  position: absolute;
  background: ${({ theme }) => theme.colors.lightpurple};
  top: 265vh;
  right: 0;
  animation: ${({ scrollY }) =>
    scrollY > 2000
      ? css`
          ${TALENTFADEIN} 2.1s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
  /* @media screen and (max-width: 823px) {
    width: 30vh;
  } */
`;
export const SQUARE3 = styled('div')<{ scrollY: number }>`
  width: 50vh;
  height: 2.5vh;
  position: absolute;
  background: ${({ theme }) => theme.colors.lightgray};
  top: 250vh;
  left: 11vh;
  animation: ${({ scrollY }) =>
    scrollY > 2000
      ? css`
          ${TALENTFADEIN} 2.1s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
  /* @media screen and (max-width: 823px) {
    width: 30vh;
  } */
`;
export const SQUARE4 = styled('div')<{ scrollY: number }>`
  width: 20vh;
  height: 2.5vh;
  top: 294vh;
  left: 3vh;
  position: absolute;
  background: ${({ theme }) => theme.colors.purple};
  animation: ${({ scrollY }) =>
    scrollY > 2400
      ? css`
          ${MAPFADEIN1} 2s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;
export const SQUARE5 = styled('div')<{ scrollY: number }>`
  width: 70vh;
  height: 2.5vh;
  top: 320vh;
  left: 0;
  position: absolute;
  background: ${({ theme }) => theme.colors.lightpurple};
  animation: ${({ scrollY }) =>
    scrollY > 2400
      ? css`
          ${MAPFADEIN1} 2.7s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
  @media screen and (max-width: 1330px) {
    animation: ${FADEOUT} 1s forwards;
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
`;
export const SQUARE6 = styled('div')<{ scrollY: number }>`
  width: 20vh;
  height: 2.5vh;
  top: 263vh;
  right: 4vh;
  position: absolute;
  background: ${({ theme }) => theme.colors.lightgray};
  animation: ${({ scrollY }) =>
    scrollY > 2400
      ? css`
          ${TALENTFADEIN} 1.8s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
  /* @media screen and (max-width: 1330px) {
    right: 0;
  } */
`;
export const SQUARE7 = styled('div')<{ scrollY: number }>`
  width: 60vh;
  height: 2.5vh;
  top: 332vh;
  left: 0.3vh;
  position: absolute;
  background: ${({ theme }) => theme.colors.purple};
  animation: ${({ scrollY }) =>
    scrollY > 2000
      ? css`
          ${MAPFADEIN1} 2.7s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
  /* @media screen and (max-width: 823px) {
    width: 30vh;
  } */
`;
export const SQUARE8 = styled('div')<{ scrollY: number }>`
  width: 60vh;
  height: 2.5vh;
  top: 334vh;
  right: 0.2vh;
  position: absolute;
  background: ${({ theme }) => theme.colors.lightpurple};
  animation: ${({ scrollY }) =>
    scrollY > 2400
      ? css`
          ${TALENTFADEIN} 1.8s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
  /* @media screen and (max-width: 823px) {
    width: 30vh;
  } */
`;
export const SQUARE9 = styled('div')<{ scrollY: number }>`
  width: 90vh;
  height: 2.5vh;
  top: 329vh;
  left: -2vh;
  position: absolute;
  background: ${({ theme }) => theme.colors.lightgray};
  animation: ${({ scrollY }) =>
    scrollY > 2000
      ? css`
          ${MAPFADEIN1} 2.3s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
  @media screen and (max-width: 1330px) {
    animation: ${FADEOUT} 1s forwards;
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
`;
export const SQUARE10 = styled('div')<{ scrollY: number }>`
  width: 20vh;
  height: 2.5vh;
  top: 340vh;
  right: 5vh;
  position: absolute;
  background: ${({ theme }) => theme.colors.purple};
  animation: ${({ scrollY }) =>
    scrollY > 2400
      ? css`
          ${TALENTFADEIN} 2.1s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
  /* @media screen and (max-width: 1330px) {
    right: 0;
  } */
`;
export const SQUARE11 = styled('div')<{ scrollY: number }>`
  width: 40vh;
  height: 2.5vh;
  top: 335vh;
  right: -2vh;
  position: absolute;
  background: ${({ theme }) => theme.colors.lightgray};
  animation: ${({ scrollY }) =>
    scrollY > 2600
      ? css`
          ${TALENTFADEIN} 1.8s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
  @media screen and (max-width: 1330px) {
    right: 0;
  }
`;

// ::::::::::::::::::::: 마지막 :::::::::::::::::::::
export const LASTCONTAINER = styled(CIRCLECONTAINER)<{ scrollY: number }>`
  animation: ${({ scrollY }) =>
    scrollY > 2800
      ? css`
          ${CHATFADEIN1} 1.8s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;
export const LASTDESCRIPTION1 = styled(CHATDESCRIPTION)`
  left: 35%;
  top: 390vh;
  @media screen and (max-width: 1110px) {
    left: 5%;
  }
`;
export const LASTDESCRIPTION2 = styled(CHATDESCRIPTION)`
  left: 42%;
  top: 395vh;
  @media screen and (max-width: 1110px) {
    left: 5%;
  }
`;
export const LASTSVGCONTAINER = styled(IMGCONTAINER)`
  left: 34vw;
  top: 410vh;
  z-index: 6;
  @media screen and (max-width: 850px) {
    left: 10vw;
  }
`;
export const LASTSVG = styled('img')<{ scrollY: number }>`
  width: 50vh;
  height: 40vh;
  /* animation: ${({ scrollY }) =>
    scrollY > 2770
      ? css`
          ${CHATFADEIN2} 1.8s forwards
        `
      : css`
          ${NONE} 2s forwards
        `}; */
  @media screen and (max-width: 850px) {
    width: 40vh;
    height: 30vh;
  }
`;
LASTSVG.defaultProps = {
  src: lastSVG,
};
export const STARTBTN = styled(LBUTTON)`
  position: absolute;
  left: 46%;
  top: 460vh;
  width: 20vh;
  @media screen and (max-width: 1110px) {
    left: 35%;
  }
`;
export const CIRCLE7 = styled(CIRCLE)`
  width: 60vh;
  height: 60vh;
  left: 25%;
  top: 395vh;
  background: ${({ theme }) => theme.colors.lightpurple};
  /* @media screen and (max-width: 1110px) {
    left: 5%;
    max-width: 100%;
    overflow-x: hidden;
  } */
  @media screen and (max-width: 850px) {
    left: 5%;
    width: 50vh;
    height: 50vh;
  }
`;
export const CIRCLE8 = styled(CIRCLE7)`
  left: 55%;
  top: 402vh;
  @media screen and (max-width: 950px) {
    display: none;
  }
`;
export const CIRCLE9 = styled(CIRCLE7)`
  width: 40vh;
  height: 40vh;
  left: 14%;
  top: 425vh;
  @media screen and (max-width: 950px) {
    display: none;
  }
`;
export const CIRCLE10 = styled(CIRCLE9)`
  width: 20vh;
  height: 20vh;
  left: 20%;
  top: 400vh;
  @media screen and (max-width: 950px) {
    display: none;
  }
`;
export const CIRCLE11 = styled(CIRCLE9)`
  left: 85vh;
  top: 380vh;
  @media screen and (max-width: 950px) {
    display: none;
  }
`;
// ::::::::::::::::::::: FOOTER :::::::::::::::::::::
export const FOOTERCONTAINER = styled(CIRCLECONTAINER)`
  position: absolute;
  border-top: 0.5px solid #efefef;
  height: 13vh;
  /* display: flex; */
  font-size: 1.1rem;
  font-weight: 320;
  margin: 1rem;
  padding-bottom: 2rem;
  justify-content: center;
  top: 500vh;
  @media screen and (max-width: 730px) {
    font-size: 0.9rem;
    height: 32vh;
  }
`;
export const TEAMNAME = styled('div')`
  font-weight: 320;
  padding: 15px 20px;
`;
export const CONTRIBUTERS = styled('div')`
  padding: 15px 20px;
`;
export const OURS = styled('a')`
  padding: 15px 20px;
`;
