import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Modal from '../../../utils/modal';

import {
  RELATIVE,
  DIV,
  TITLECONTAINER,
  HELLO,
  TITLE,
  IMGCONTAINER,
  MAINIMG,
  CIRCLECONTAINER,
  CIRCLETITLE,
  CIRCLEDESCRIPTION,
  CIRCLE,
  CIRCLE_2,
  CIRCLE_3,
  CIRCLE_4,
  CIRCLE_5,
  CIRCLE_6,
  MAPCONTAINER,
  PATH,
  TRIANGLE_CONTAINER,
  TRIANGLE1,
  TRIANGLE2,
  MAPIMG2,
  MAPDESCRIPTION,
  MAPSVGCONTAINER,
  MAPSVG,
  SLIDE_CONTAINER,
  SLIDE_BTN_LEFT,
  SLIDE_BTN_RIGHT,
  IMG_CONTAINER,
  SLIDE_MAPIMG1,
  SLIDE_MAPIMG2,
  CHATCONTAINER,
  CHATDESCRIPTION,
  CHATIMG1,
  CHATIMG2,
  CHATSVGCONTAINER,
  CHATSVG,
  TALK_BUBBLE1,
  TALK_BUBBLE2,
  TALENTCONTAINER,
  TALENTSVGCONTAINER,
  TALENTSVG,
  TALENTDESCRIPTION1,
  TALENTDESCRIPTION2,
  TALENTIMG1,
  SQUARE_CONTAINER,
  SQUARE1,
  SQUARE2,
  SQUARE3,
  SQUARE4,
  SQUARE5,
  SQUARE6,
  SQUARE7,
  SQUARE8,
  SQUARE9,
  SQUARE10,
  SQUARE11,
  LASTCONTAINER,
  LASTDESCRIPTION1,
  LASTDESCRIPTION2,
  LASTSVGCONTAINER,
  LASTSVG,
  STARTBTN,
  CIRCLE7,
  CIRCLE8,
  CIRCLE9,
  CIRCLE10,
  CIRCLE11,
  FOOTERCONTAINER,
  TEAMNAME,
  CONTACT_LABEL,
  CONTACT,
  OURS,
  FOOTER,
  RIGHTS,
} from './LandingPageStyle';

interface Footer {
  name: string;
  link: string;
}

function LandingPage(): JSX.Element {
  const [scrollY, setScrollY] = useState<number>(0);
  const totalSlide = 1;
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const footerData = [
    { name: 'DANGO Wiki', link: 'https://github.com/codestates/dango-client/wiki' },
    { name: 'Client Repository', link: 'https://github.com/codestates/dango-client' },
    { name: 'Server Repository', link: 'https://github.com/codestates/dango-server' },
  ];

  const footerContact = [
    { name: 'Juhyeon Ji', link: 'https://github.com/Jebbit-koi' },
    { name: 'Soonki Kwon', link: 'https://github.com/soon327' },
    { name: 'Youngho Shin', link: 'https://github.com/ShinYoungHO' },
    { name: 'Yuwon Ahn', link: 'https://github.com/Yu-Won' },
  ];
  const history = useHistory();

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

  const prevSlide = (): void => {
    if (currentSlide === 0) {
      setCurrentSlide(totalSlide);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const nextSlide = (): void => {
    if (currentSlide >= totalSlide) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
    }
  }, [currentSlide]);

  return (
    <div>
      <Modal />
      <RELATIVE>
        <DIV>
          <TITLECONTAINER>
            <HELLO>Say Hello to</HELLO>
            <TITLE>DANGO!</TITLE>
          </TITLECONTAINER>
        </DIV>

        <CIRCLECONTAINER>
          <CIRCLETITLE>누구나 재능은 있다!</CIRCLETITLE>
          <CIRCLEDESCRIPTION>
            {' '}
            DANGO는 누구나 자신만의 재능을 가지고 있다는 생각에서 출발했습니다. <br /> <br /> 나만의 재능을 당신의 근처
            이웃들과 서로 나눠보세요!
          </CIRCLEDESCRIPTION>
          <IMGCONTAINER>
            <MAINIMG />
          </IMGCONTAINER>
          <CIRCLE_4 />
          <CIRCLE_5 />
          <CIRCLE_6 />
          <CIRCLE />
          <CIRCLE_2 />
          <CIRCLE_3 />
        </CIRCLECONTAINER>
      </RELATIVE>

      <RELATIVE>
        <MAPCONTAINER scrollY={scrollY}>
          <PATH scrollY={scrollY}>
            <path d="M 135 300 Q 50 470 100 500 Q 270 500 250 450 Q 250 200 550 150 C 600 150 750 150 750 350 A 50 50 0 1 1 450 450" />
          </PATH>
          <TRIANGLE_CONTAINER>
            <TRIANGLE1 scrollY={scrollY} />
            <TRIANGLE2 scrollY={scrollY} />
          </TRIANGLE_CONTAINER>

          <>
            <MAPIMG2 scrollY={scrollY} />
          </>
          <MAPDESCRIPTION>
            DANGO는 내가 있는 위치를 기반으로 <br />
            <br /> 우리 동네 고수들의 재능을 볼 수 있습니다.
          </MAPDESCRIPTION>
          <MAPSVGCONTAINER>
            <MAPSVG />
          </MAPSVGCONTAINER>
        </MAPCONTAINER>
        <SLIDE_CONTAINER>
          <IMG_CONTAINER ref={slideRef}>
            <SLIDE_MAPIMG1 />
            <SLIDE_MAPIMG2 />
          </IMG_CONTAINER>
          <SLIDE_BTN_LEFT onClick={prevSlide}>
            <IoIosArrowBack size="20" />
          </SLIDE_BTN_LEFT>
          <SLIDE_BTN_RIGHT onClick={nextSlide}>
            <IoIosArrowForward size="20" />{' '}
          </SLIDE_BTN_RIGHT>
        </SLIDE_CONTAINER>
      </RELATIVE>

      <RELATIVE>
        <CHATCONTAINER scrollY={scrollY}>
          <CHATDESCRIPTION>
            실시간으로 해당 고수와 연락해 <br /> <br /> 이웃과 재능 공유를 할 수 있습니다.
          </CHATDESCRIPTION>
          <>
            <CHATIMG1 scrollY={scrollY} />
            <CHATIMG2 scrollY={scrollY} />
          </>
          <CHATSVGCONTAINER>
            <TALK_BUBBLE2>
              {' '}
              <br />
              Hi!😄
            </TALK_BUBBLE2>
            <TALK_BUBBLE1>
              {' '}
              <br />
              Hello!😇
            </TALK_BUBBLE1>
            <CHATSVG />
          </CHATSVGCONTAINER>
        </CHATCONTAINER>
      </RELATIVE>

      <RELATIVE>
        <TALENTCONTAINER scrollY={scrollY}>
          <TALENTSVGCONTAINER>
            <TALENTSVG scrollY={scrollY} />
          </TALENTSVGCONTAINER>
          <SQUARE_CONTAINER>
            <SQUARE1 scrollY={scrollY} />
            <SQUARE2 scrollY={scrollY} />
            <SQUARE3 scrollY={scrollY} />
            <SQUARE5 scrollY={scrollY} />
            <SQUARE4 scrollY={scrollY} />
            <SQUARE5 scrollY={scrollY} />
            <SQUARE6 scrollY={scrollY} />
            <SQUARE7 scrollY={scrollY} />
            <SQUARE8 scrollY={scrollY} />
            <SQUARE9 scrollY={scrollY} />
            <SQUARE10 scrollY={scrollY} />
            <SQUARE11 scrollY={scrollY} />
          </SQUARE_CONTAINER>

          <TALENTDESCRIPTION1>사소한 재능이라도 좋습니다.</TALENTDESCRIPTION1>
          <TALENTDESCRIPTION2>
            이웃과 함께 할 수 있는 재능이라면 <br /> 그 재능은 이미 훌륭한 재능입니다.
          </TALENTDESCRIPTION2>
          <>
            <TALENTIMG1 scrollY={scrollY} />
          </>
        </TALENTCONTAINER>
      </RELATIVE>

      <RELATIVE>
        <LASTCONTAINER scrollY={scrollY}>
          <LASTDESCRIPTION1>당신의 근처를 따뜻하게 만들 준비가 되셨나요?</LASTDESCRIPTION1>{' '}
          <LASTDESCRIPTION2>지금 바로 시작해보세요!</LASTDESCRIPTION2>
          <LASTSVGCONTAINER>
            <LASTSVG scrollY={scrollY} />
          </LASTSVGCONTAINER>
          <STARTBTN type="button" onClick={startBtn}>
            시작하기
          </STARTBTN>
          <CIRCLE7 />
          <CIRCLE8 />
          <CIRCLE9 />
          <CIRCLE10 />
          <CIRCLE11 />
        </LASTCONTAINER>
      </RELATIVE>

      <RELATIVE>
        <FOOTERCONTAINER>
          <FOOTER>
            <TEAMNAME>DANGO</TEAMNAME>
            <CONTACT>
              <CONTACT_LABEL>ABOUT AS</CONTACT_LABEL>
              {footerData.map((footer: Footer, index: number) => (
                <>
                  <OURS href={footer.link} key={index} target="_blank">
                    {footer.name}
                  </OURS>
                </>
              ))}
            </CONTACT>
            <CONTACT>
              <CONTACT_LABEL>CONTACT</CONTACT_LABEL>
              {footerContact.map((footer: Footer, index: number) => (
                <>
                  <OURS href={footer.link} key={index} target="_blank">
                    {footer.name}
                  </OURS>
                </>
              ))}
            </CONTACT>
          </FOOTER>
          <RIGHTS>ⓒ 2021 Team JAWS All Rights Reserved</RIGHTS>
        </FOOTERCONTAINER>
      </RELATIVE>
    </div>
  );
}

export default LandingPage;
