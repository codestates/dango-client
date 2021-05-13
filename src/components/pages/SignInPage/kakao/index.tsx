import React, { useState, useEffect } from 'react';
import KakaoSignIn from './KakaoSignIn';
import KakaoSignOut from './KakaoSignOut';
import KakaoWithdrawal from './KakaoWithdrawal';

const { Kakao }: any = window;

// signUp
// 닉네임 입력

// signIn

// signOut

// withdrawal
function KakaoSign(): JSX.Element {
  // const kakaoLoginHandler = () => {
  //   // 카카오의답변 /oauth/authorize는 비동기로 못한다 HTML / 자바스크립트로 해야한다.. 그럼 REST API는 왜만들어놓은거지..?
  //   const kakaoApi = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
  //   window.location.assign(kakaoApi);
  // };

  // 회원탈퇴할때 연결끊기 함수
  // Kakao.API.request({
  //   url: '/v1/user/unlink',
  //   success: function(response) {
  //     console.log(response);
  //   },
  //   fail: function(error) {
  //     console.log(error);
  //   },
  // });
  // };

  // useEffect(() => {
  //   const url = new URL(window.location.href);

  //   setKakaoCode(url.searchParams.get('code'));
  //   if (kakaoCode) {
  //     console.log('code;:::::::::::', kakaoCode);
  //     // const data = { kakaoCode };
  //     // server.post('/signin', data).t;
  //   }

  // 서버에서는 아래 주소로 post요청을해서 토큰을 받는다
  // https://kauth.kakao.com/oauth/token?토큰값&client_id=레스트API키&redirect_uri=리다이렉트URL&grant_type=authorization_code
  // }, [kakaoCode]);

  return (
    <div>
      <KakaoSignIn Kakao={Kakao} />
      <KakaoSignOut />
      <KakaoWithdrawal Kakao={Kakao} />
    </div>
  );
}

export default KakaoSign;
