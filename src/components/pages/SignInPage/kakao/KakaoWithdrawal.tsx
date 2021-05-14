import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../../../_reducer/users/user';
import { RootState } from '../../../../_reducer';

interface WithdrawalProps {
  Kakao: any;
}

function KakaoWithdrawal({ Kakao }: WithdrawalProps): JSX.Element {
  const dispatch = useDispatch();
  const handleKakaoWithdrawal = () => {
    Kakao.API.request({
      url: '/v1/user/unlink',
      success: function () {
        dispatch(signOut());

        alert('회원탈퇴가 완료되었습니다.');
      },
      fail: function (err: any) {
        console.log(err);
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
