import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {
  CONTAINER,
  SECTION1,
  SECTION1SVG,
  SECTION1_TITLE,
  SECTION1_SUBTITLE,
  SECTION1_BTN,
  SECTION1IMG,
  SECTION2,
  SECTION2MAIN,
  SECTION2SUB,
  SECTION2_TITLE,
  SECTION2MARKER,
  SECTION2_SUBTITLE,
  SECTION2_BTN,
  SECTION3,
  DIV,
  SECTION3_TITLE,
  SECTION3_SUBTITLE,
  SECTION3_BTN,
  SECTION4,
  SECTION4SUB1,
  SECTION4_TITLE,
  SECTION4_SUBTITLE,
  SECTION4_BTN,
  SECTION4_MAIN,
  SECTION4SUB2,
  FOOTER,
  FOOTER_LOGO,
  ABOUTUS,
  CONTACT,
  LI_A,
  LI_B,
  RIGHTSDIV,
} from './NewLandingPageStyle';

interface FooterData {
  name: string;
  link: string;
}

function NewLandingPage(): JSX.Element {
  const [scrollY, setScrollY] = useState<number>(0);
  const history = useHistory();
  const footerDatas = {
    aboutUs: [
      { name: 'DANGO Wiki', link: 'https://github.com/codestates/dango-client/wiki' },
      { name: 'Client Repository', link: 'https://github.com/codestates/dango-client' },
      { name: 'Server Repository', link: 'https://github.com/codestates/dango-server' },
    ],
    contact: [
      { name: 'Juhyeon Ji', link: 'https://github.com/Jebbit-koi' },
      { name: 'Soonki Kwon', link: 'https://github.com/soon327' },
      { name: 'Youngho Shin', link: 'https://github.com/ShinYoungHO' },
      { name: 'Yuwon Ahn', link: 'https://github.com/Yu-Won' },
    ],
  };

  const listener = () => {
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);

  const startBtn = () => {
    history.push('/map');
  };

  const registerBtn = () => {
    history.push('/register');
  };

  return (
    <>
      <CONTAINER>
        <SECTION1>
          <SECTION1SVG />
          <SECTION1_TITLE>
            누구나
            <br /> 재능은 있다!
          </SECTION1_TITLE>
          <SECTION1_SUBTITLE>
            DANGO는 누구나
            <br />
            자신만의 재능을 가지고 있다는 <br />
            생각에서 출발했습니다.
            <br />
            <br />
            나만의 재능을 <br />
            당신 근처의 이웃과 나눠보세요!
          </SECTION1_SUBTITLE>
          <SECTION1_BTN onClick={startBtn}>시작하기</SECTION1_BTN>
          <SECTION1IMG />{' '}
        </SECTION1>

        <SECTION2 scrollY={scrollY}>
          <SECTION2MAIN />
          <SECTION2SUB />
          <SECTION2_TITLE>
            우리 동네
            <br /> 고수들과
            <br />
            만나보세요!
          </SECTION2_TITLE>
          <SECTION2MARKER />
          <SECTION2_SUBTITLE>
            DANGO는 위치 기반으로
            <br />
            우리 동네 고수들의
            <br />
            재능을 볼 수 있습니다.
            <br />
            <br />
            실시간으로 해당 고수와 연락해
            <br />
            이웃과 재능 공유를 할 수 있습니다.
          </SECTION2_SUBTITLE>
          <SECTION2_BTN onClick={startBtn}>시작하기</SECTION2_BTN>
        </SECTION2>

        <SECTION3 scrollY={scrollY}>
          <DIV>
            <SECTION3_TITLE>누구나 고수가 될 수 있습니다.</SECTION3_TITLE>
            <SECTION3_SUBTITLE>이웃과 함께 할 수 있는 재능이라면 훌륭한 재능입니다.</SECTION3_SUBTITLE>
            <SECTION3_BTN onClick={registerBtn}>등록하기</SECTION3_BTN>
          </DIV>
        </SECTION3>

        <SECTION4 scrollY={scrollY}>
          <SECTION4SUB1 />
          <SECTION4_TITLE>이웃과 함께하실 준비가 되셨나요?</SECTION4_TITLE>
          <SECTION4_SUBTITLE>지금 바로 시작해보세요!</SECTION4_SUBTITLE>
          <SECTION4_BTN onClick={startBtn}>시작하기</SECTION4_BTN>
          <SECTION4_MAIN />
          <SECTION4SUB2 />
        </SECTION4>

        <FOOTER>
          <FOOTER_LOGO>DANGO</FOOTER_LOGO>
          <ABOUTUS>About Us </ABOUTUS>
          <LI_A>
            <DIV>
              {footerDatas.aboutUs.map((footer: FooterData) => (
                <a href={footer.link} key={Math.random()} target="_blank" rel="noreferrer">
                  {footer.name}
                </a>
              ))}
            </DIV>
          </LI_A>

          <CONTACT>Contact</CONTACT>
          <LI_B>
            <DIV>
              {footerDatas.contact.map((footer: FooterData) => (
                <a href={footer.link} key={Math.random()} target="_blank" rel="noreferrer">
                  {footer.name}
                </a>
              ))}
            </DIV>
          </LI_B>
          <RIGHTSDIV>ⓒ 2021 Team JAWS All Rights Reserved</RIGHTSDIV>
        </FOOTER>
      </CONTAINER>
    </>
  );
}

export default NewLandingPage;
