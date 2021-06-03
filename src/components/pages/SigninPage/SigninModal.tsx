import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { IoIosClose } from 'react-icons/io';
import GoogleSignin from './google/GoogleSignin';
import KakaoSignin from './kakao/KakaoSignin';
import Modal from '../../../utils/modal';

import {
  BACKGROUND,
  CONTAINER,
  SIGNINCONTAINER,
  XBTN,
  IMG,
  WELCOME,
  DESCRIPTION,
  BTNCONTAINER,
  BTNDIV,
} from './SigninModalStyle';

function SigninModal(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<any>();
  const history = useHistory();
  const closeBtn = (): void => {
    history.push('/');
  };

  const handleClickOutside = ({ target }: any): void => {
    if (open && !ref.current.contains(target)) {
      setOpen(false);
      closeBtn();
    }

    useEffect(() => {
      window.addEventListener('click', handleClickOutside);
      return () => {
        window.removeEventListener('click', handleClickOutside);
      };
    }, []);
  };

  return (
    <>
      <Modal />
      <BACKGROUND>
        <CONTAINER ref={ref}>
          <SIGNINCONTAINER>
            <XBTN onClick={closeBtn}>
              <IoIosClose size="200" color="#83818c" />
            </XBTN>
            <IMG />
            <WELCOME> WELCOME! DANGO </WELCOME>
            <DESCRIPTION> 당신 근처의 고수들을 찾아보세요</DESCRIPTION>
            <BTNCONTAINER>
              <BTNDIV>
                <GoogleSignin />
              </BTNDIV>
              <BTNDIV>
                <KakaoSignin />
              </BTNDIV>
            </BTNCONTAINER>
          </SIGNINCONTAINER>
        </CONTAINER>
      </BACKGROUND>
    </>
  );
}

export default SigninModal;
