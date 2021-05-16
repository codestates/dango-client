import React from 'react';
import GoogleSignin from './google/GoogleSignin';
import KakaoSignin from './kakao/KakaoSignin';

function SigninModal() {
  return (
    <div>
      <GoogleSignin />
      <KakaoSignin />
    </div>
  );
}

export default SigninModal;
