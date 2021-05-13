import React from 'react';

interface WithdrawalProps {
  Kakao: any;
}

function KakaoWithdrawal({ Kakao }: WithdrawalProps): JSX.Element {
  const handleKakaoWithdrawal = () => {
    if (!Kakao.Auth.getAccessToken()) {
      console.log('로그인하지 않아서 토큰이 없습니당');
      return;
    }

    // 서버에 요청해서 먼저 유저정보를 삭제하고, 아래는 then으로 연결끊으면 될듯?

    Kakao.API.request({
      url: '/v1/user/unlink',
      success: function (response: any) {
        console.log(response);
        alert('회원탈퇴가 완료되었습니다.');
        console.log('kakao로그아웃! 토큰은?->', Kakao.Auth.getAccessToken());
      },
      fail: function (error: any) {
        console.log(error);
      },
    });
  };

  return (
    <div>
      <button type="button" onClick={handleKakaoWithdrawal}>
        회원탈퇴
      </button>
    </div>
  );
}

export default KakaoWithdrawal;
