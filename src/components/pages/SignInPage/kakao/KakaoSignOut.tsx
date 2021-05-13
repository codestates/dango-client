import React from 'react';

function KakaoSignOut(): JSX.Element {
  const { Kakao }: any = window;

  const handleKakaoSignout = () => {
    if (!Kakao.Auth.getAccessToken()) {
      console.log('로그인하지 않아서 토큰이 없습니당');
      return;
    }

    // 로그아웃 함수
    Kakao.Auth.logout(function () {
      console.log('kakao로그아웃! 토큰은?->', Kakao.Auth.getAccessToken());
      // 로컬스토리지와 전역상태에서 토큰 삭제해주기.
    });
  };

  return (
    <div>
      <button type="button" onClick={handleKakaoSignout}>
        Kakao Logout
      </button>
    </div>
  );
}

export default KakaoSignOut;
