import React from 'react';
import { useHistory } from 'react-router-dom';

import { IoIosClose } from 'react-icons/io';
import GoogleSignin from './GoogleSignin';
import KakaoSignin from './KakaoSignin';
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
  GOOGLE,
  LOGO,
} from './SigninModalStyle';

function SigninModal(): JSX.Element {
  const history = useHistory();
  const closeBtn = (): void => {
    history.push('/');
  };

  return (
    <>
      <Modal />
      <BACKGROUND>
        <CONTAINER>
          <SIGNINCONTAINER>
            <XBTN onClick={closeBtn}>
              <IoIosClose size="200" color="#83818c" />
            </XBTN>
            <IMG />
            <WELCOME> WELCOME, DANGO! </WELCOME>
            <DESCRIPTION> 당신 근처의 고수들을 찾아보세요.</DESCRIPTION>
            <BTNCONTAINER>
              <BTNDIV>
                <GOOGLE>
                  <LOGO src="/images/google_myinfo.png" alt="G" />
                  <GoogleSignin />
                </GOOGLE>
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
