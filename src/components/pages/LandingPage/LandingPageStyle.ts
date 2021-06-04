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

// ::::::::::::: 반응형, 애니메이션 구현 될 예정입니다. :::::::::::::

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
    left: 1200px;
    max-width: 100%;
}
to {
    opacity: 1;
}
`;
// ::::::::::::::::::::: 인트로 DIV :::::::::::::::::::::

export const DIV = styled('div')`
  ${({ theme }) => theme.common.flexCenter};
  text-align: center;
  font-weight: 300;
  font-size: 65px;
  padding-top: 8vh;
  height: 70vh;
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
  font-size: 60px;
  padding-top: 20vh;
  height: 65vh;
  overflow: hidden;
  position: relative;
  animation: ${SHOWUP} 4s ease-in-out forwards;
`;

export const HELLO = styled('div')`
  display: inline-block;
  /* overflow: hidden; */
  white-space: nowrap;
  color: #83818c;
  animation: ${REVEAL} 4s ease-in-out forwards;
`;

export const TITLE = styled(HELLO)`
  color: ${({ theme }) => theme.colors.purple};
  margin-left: -355px;
  animation: ${SLIDEIN} 4s ease-in-out forwards;
`;

// ::::::::::::::::::::: 처음 랜딩 :::::::::::::::::::::

export const CIRCLECONTAINER = styled('div')`
  opacity: 0;
  animation: ${FADEIN} 1s linear forwards;
  animation-delay: 4s;
  height: 730px;
`;

export const CIRCLETITLE = styled('div')`
  color: ${({ theme }) => theme.colors.black};
  font-size: 3.2rem;
  position: absolute;
  left: 9%;
  top: 30%;
`;

export const CIRCLEDESCRIPTION = styled('div')`
  font-size: 1.4rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.black};
  position: absolute;
  left: 6%;
  top: 44%;
  z-index: 5;
`;

export const IMGCONTAINER = styled('div')`
  left: 55%;
  top: 38%;
  position: absolute;
  z-index: 6;
`;

export const MAINIMG = styled('img')`
  width: 400px;
  height: 300px;
`;

MAINIMG.defaultProps = {
  src: mainSVG,
};

export const CIRCLE = styled('div')`
  width: 400px;
  height: 400px;
  background: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.lightpurple};
  border-radius: 48%;
  position: absolute;
  right: 18%;
  top: 18%;
  transform-origin: 50% 48%;
  animation: ${DRIFT} 11s linear infinite;
  transition: opacity 3s 7s;
`;

export const CIRCLE_2 = styled(CIRCLE)`
  width: 300px;
  height: 300px;
  position: absolute;
  background: ${({ theme }) => theme.colors.purple};
  right: 7%;
  top: 35%;
  animation: ${DRIFT} 9s linear infinite reverse;
`;

export const CIRCLE_3 = styled(CIRCLE)`
  width: 200px;
  height: 200px;
  position: absolute;
  background: ${({ theme }) => theme.colors.purple};
  right: 40%;
  top: 49%;
  animation: ${DRIFT} 7s linear infinite reverse;
`;

export const CIRCLE_4 = styled(CIRCLE)`
  animation: ${DRIFT} 9s linear infinite;
  background-color: ${({ theme }) => theme.colors.lightpurple};
`;

export const CIRCLE_5 = styled(CIRCLE_2)`
  animation: ${DRIFT} 7s linear infinite;
  background-color: ${({ theme }) => theme.colors.lightpurple};
`;

export const CIRCLE_6 = styled(CIRCLE_3)`
  animation: ${DRIFT} 5s linear infinite;
  background-color: ${({ theme }) => theme.colors.lightpurple};
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
  top: 720px;
  left: 600px;
  animation: ${LINE} 2s linear infinite;
`;
export const TRIANGLE1 = styled('div')<{ scrollY: number }>`
  width: 0px;
  height: 0px;
  border-top: 300px solid transparent;
  border-right: 600px solid ${({ theme }) => theme.colors.lightpurple};
  border-bottom: 300px solid transparent;
  animation: ${({ scrollY }) =>
    scrollY > 97
      ? css`
          /* ${FADEIN} 1s forwards */
          ${ROTATE1} 4s forwards
        `
      : css`
          ${NONE} 6s forwards
        `};
  position: absolute;
  top: 750px;
  left: 20px;
`;
export const TRIANGLE2 = styled(TRIANGLE1)<{ scrollY: number }>`
  border-right: 600px solid ${({ theme }) => theme.colors.purple};
  border-bottom: 300px solid transparent;
  animation: ${({ scrollY }) =>
    scrollY > 97
      ? css`
          /* ${FADEIN} 1s forwards; */
          ${ROTATE2} 4s forwards;
        `
      : css`
          ${NONE} 6s forwards
        `};
  top: 750px;
  left: 20px;
`;

export const MAPIMG1 = styled(MAINIMG)<{ scrollY: number }>`
  width: 350px;
  height: 250px;
  top: 990px;
  left: 50px;
  position: absolute;
  animation: ${({ scrollY }) =>
    scrollY > 326
      ? css`
          ${MAPFADEIN1} 2.1s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;

export const MAPIMG2 = styled(MAINIMG)<{ scrollY: number }>`
  width: 320px;
  height: 220px;
  top: 930px;
  left: 320px;
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
`;

export const MAPIMG3 = styled(MAINIMG)<{ scrollY: number }>`
  width: 320px;
  height: 220px;
  top: 1130px;
  left: 365px;
  position: absolute;
  animation: ${({ scrollY }) =>
    scrollY > 326
      ? css`
          ${MAPFADEIN3} 1.5s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
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

export const MAPDESCRIPTION = styled(CIRCLEDESCRIPTION)`
  left: 920px;
  top: 1000px;
`;

export const MAPSVGCONTAINER = styled(IMGCONTAINER)`
  left: 1000px;
  top: 1150px;
`;

export const MAPSVG = styled('img')`
  width: 200px;
  height: 150px;
`;

MAPSVG.defaultProps = {
  src: mapSVG,
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

export const CHATDESCRIPTION = styled(CIRCLEDESCRIPTION)`
  top: 1780px;
`;

export const CHATIMG1 = styled(MAINIMG)<{ scrollY: number }>`
  width: 400px;
  height: 300px;
  top: 1700px;
  left: 950px;
  position: absolute;
  animation: ${({ scrollY }) =>
    scrollY > 1190
      ? css`
          ${CHATFADEIN1} 1.8s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;

export const CHATIMG2 = styled(MAINIMG)<{ scrollY: number }>`
  width: 200px;
  height: 300px;
  top: 1750px;
  left: 800px;
  position: absolute;
  animation: ${({ scrollY }) =>
    scrollY > 1190
      ? css`
          ${CHATFADEIN2} 1.8s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;

CHATIMG1.defaultProps = {
  src: chatTest,
};

CHATIMG2.defaultProps = {
  src: chatTest,
};

export const CHATSVGCONTAINER = styled(IMGCONTAINER)`
  left: 250px;
  top: 1880px;
`;

export const CHATSVG = styled('img')`
  width: 350px;
  height: 250px;
`;

CHATSVG.defaultProps = {
  src: chatSVG,
};

// ::::::::::::::::::::: 재능등록 :::::::::::::::::::::

export const TALENTCONTAINER = styled(CIRCLECONTAINER)<{ scrollY: number }>`
  animation: ${({ scrollY }) =>
    scrollY > 1860
      ? css`
          ${FADEIN} 1s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;

export const TALENTSVGCONTAINER = styled(IMGCONTAINER)`
  left: 940px;
  top: 2680px;
`;

export const TALENTSVG = styled('img')<{ scrollY: number }>`
  width: 300px;
  height: 200px;
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

export const TALENTDESCRIPTION1 = styled(CIRCLEDESCRIPTION)`
  font-size: 2rem;
  left: 920px;
  top: 2900px;
`;

export const TALENTDESCRIPTION2 = styled(CIRCLEDESCRIPTION)`
  left: 935px;
  top: 2950px;
`;

export const TALENTIMG1 = styled(MAINIMG)<{ scrollY: number }>`
  width: 400px;
  height: 300px;
  top: 2500px;
  left: 100px;
  position: absolute;
  animation: ${({ scrollY }) =>
    scrollY > 1860
      ? css`
          ${CHATFADEIN1} 1.8s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;

export const TALENTIMG2 = styled(MAINIMG)<{ scrollY: number }>`
  width: 400px;
  height: 300px;
  top: 2720px;
  left: 400px;
  position: absolute;
  animation: ${({ scrollY }) =>
    scrollY > 1860
      ? css`
          ${CHATFADEIN1} 1.8s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;

TALENTIMG1.defaultProps = {
  src: talentTest,
};

TALENTIMG2.defaultProps = {
  src: talentTest,
};

export const SQUARE1 = styled('div')<{ scrollY: number }>`
  width: 800px;
  height: 20px;
  position: absolute;
  background: ${({ theme }) => theme.colors.purple};
  top: 3070px;
  left: 620px;
  animation: ${({ scrollY }) =>
    scrollY > 1910
      ? css`
          ${MAPFADEIN1} 2.1s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;
export const SQUARE2 = styled(SQUARE1)<{ scrollY: number }>`
  width: 600px;
  height: 20px;
  background: ${({ theme }) => theme.colors.lightpurple};
  top: 3055px;
  left: 650px;
  animation: ${({ scrollY }) =>
    scrollY > 1950
      ? css`
          ${TALENTFADEIN} 2.1s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;
export const SQUARE3 = styled(SQUARE2)<{ scrollY: number }>`
  width: 500px;
  height: 20px;
  background: ${({ theme }) => theme.colors.lightgray};
  top: 2980px;
  left: 900px;
`;
export const SQUARE4 = styled(SQUARE1)<{ scrollY: number }>`
  width: 200px;
  height: 20px;
  top: 2975px;
  left: 60px;
  animation: ${({ scrollY }) =>
    scrollY > 2200
      ? css`
          ${MAPFADEIN1} 2s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;
export const SQUARE5 = styled(SQUARE2)<{ scrollY: number }>`
  width: 700px;
  height: 20px;
  top: 2990px;
  left: 30px;
  animation: ${({ scrollY }) =>
    scrollY > 2230
      ? css`
          ${MAPFADEIN1} 2.7s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;
export const SQUARE6 = styled(SQUARE3)<{ scrollY: number }>`
  width: 200px;
  height: 20px;
  top: 2530px;
  left: 900px;
  animation: ${({ scrollY }) =>
    scrollY > 1810
      ? css`
          ${TALENTFADEIN} 1.8s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;
export const SQUARE7 = styled(SQUARE1)<{ scrollY: number }>`
  width: 600px;
  height: 20px;
  top: 2580px;
  left: 100px;
  animation: ${({ scrollY }) =>
    scrollY > 1890
      ? css`
          ${MAPFADEIN1} 2.7s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;
export const SQUARE8 = styled(SQUARE2)<{ scrollY: number }>`
  width: 600px;
  height: 20px;
  top: 2550px;
  left: 800px;
  animation: ${({ scrollY }) =>
    scrollY > 1910
      ? css`
          ${TALENTFADEIN} 1.8s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;
export const SQUARE9 = styled(SQUARE3)<{ scrollY: number }>`
  width: 900px;
  height: 20px;
  top: 2500px;
  left: 20px;
  animation: ${({ scrollY }) =>
    scrollY > 1930
      ? css`
          ${MAPFADEIN1} 2.3s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;
export const SQUARE10 = styled(SQUARE1)<{ scrollY: number }>`
  width: 200px;
  height: 20px;
  top: 2542px;
  left: 1080px;
  animation: ${({ scrollY }) =>
    scrollY > 1970
      ? css`
          ${TALENTFADEIN} 2.1s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;
export const SQUARE11 = styled(SQUARE2)<{ scrollY: number }>`
  width: 400px;
  height: 20px;
  top: 3180px;
  left: 1000px;
  animation: ${({ scrollY }) =>
    scrollY > 2480
      ? css`
          ${TALENTFADEIN} 1.8s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;
export const SQUARE12 = styled(SQUARE3)<{ scrollY: number }>`
  width: 900px;
  height: 20px;
  top: 3120px;
  left: 50px;
  animation: ${({ scrollY }) =>
    scrollY > 2400
      ? css`
          ${MAPFADEIN1} 1.5s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;
// ::::::::::::::::::::: 마지막 :::::::::::::::::::::
export const LASTCONTAINER = styled(CIRCLECONTAINER)<{ scrollY: number }>`
  animation: ${({ scrollY }) =>
    scrollY > 2770
      ? css`
          ${CHATFADEIN1} 1.8s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;
export const LASTDESCRIPTION1 = styled(CIRCLEDESCRIPTION)`
  left: 520px;
  top: 3600px;
`;
export const LASTDESCRIPTION2 = styled(CIRCLEDESCRIPTION)`
  left: 630px;
  top: 3650px;
`;
export const LASTSVGCONTAINER = styled(IMGCONTAINER)`
  left: 600px;
  top: 3700px;
`;
export const LASTSVG = styled('img')<{ scrollY: number }>`
  width: 300px;
  height: 200px;
  animation: ${({ scrollY }) =>
    scrollY > 2770
      ? css`
          ${CHATFADEIN2} 1.8s forwards
        `
      : css`
          ${NONE} 2s forwards
        `};
`;
LASTSVG.defaultProps = {
  src: lastSVG,
};
export const STARTBTN = styled(LBUTTON)`
  position: absolute;
  left: 630px;
  top: 4050px;
  width: 200px;
`;
export const CIRCLE7 = styled(CIRCLE)`
  width: 370px;
  height: 370px;
  left: 450px;
  top: 3560px;
  background: ${({ theme }) => theme.colors.lightpurple};
`;
export const CIRCLE8 = styled(CIRCLE7)`
  left: 670px;
  top: 3580px;
`;
export const CIRCLE9 = styled(CIRCLE7)`
  width: 200px;
  height: 200px;
  left: 370px;
  top: 3720px;
`;
export const CIRCLE10 = styled(CIRCLE9)`
  width: 100px;
  height: 100px;
  left: 320px;
  top: 3720px;
`;
export const CIRCLE11 = styled(CIRCLE9)`
  left: 700px;
  top: 3450px;
`;
// ::::::::::::::::::::: FOOTER :::::::::::::::::::::
export const FOOTERCONTAINER = styled(CIRCLECONTAINER)`
  border-top: 0.5px solid #efefef;
  height: 120px;
  display: flex;
  font-size: 1.1rem;
  font-weight: 320;
  margin: 50px;
  padding-top: 40px;
  justify-content: center;
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
