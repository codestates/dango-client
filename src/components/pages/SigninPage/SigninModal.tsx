import React from 'react';
import styled from 'styled-components';
import GoogleSignin from './google/GoogleSignin';
import KakaoSignin from './kakao/KakaoSignin';
import Modal from '../../../utils/modal';

const DIV = styled.div`
  padding-top: 70px;
`;

function SigninModal(): JSX.Element {
  return (
    <DIV>
      <Modal />
      <GoogleSignin />
      <KakaoSignin />
    </DIV>
  );
}

export default SigninModal;
