import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../../_reducer';
import { signout } from '../../../_reducer/user';
import { openModal } from '../../../_reducer/modal';
import server from '../../../api';

function Withdrawal(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo } = useSelector((state: RootState) => state.user);
  let withdrawalURL = '';
  if (userInfo?.social === 'kakao') {
    withdrawalURL = '/users/kakao/withdrawal';
  } else {
    withdrawalURL = '/users/google/withdrawal';
  }

  // delete는 data를 넣지않기때문에 config로 한번 감싸서 보내면 서버에서 req.body로 받을 수 있다.
  // TODO:로그인토큰이 만료되면 회원탈퇴가 안된다. 갱신하려면 refreshToken 이필요하기때문. 로그인 할때 리덕스에 저장해서 사용하는 방법밖에 없을듯.
  const config = { data: { nickname: userInfo?.nickname } };

  const handleKakaoWithdrawal = () => {
    const { Kakao } = window;

    Kakao.API.request({
      url: '/v1/user/unlink',
      success: function () {
        handleGoogleWitherawal();
      },
      fail: function (err: any) {
        console.log(err);
      },
    });
  };

  const handleGoogleWitherawal = () => {
    server
      .delete(withdrawalURL, config)
      .then(() => {
        dispatch(signout());
        dispatch(openModal({ type: 'ok', text: '회원탈퇴가 완료되었습니다.', callbackName: 'withdrawal' }));
      })
      .catch((err) => {
        if (!err.response) {
          console.log(err);
          return;
        }
        dispatch(openModal({ type: 'error', text: err.response.data.message }));
      });
  };

  return (
    <div>
      <button type="button" onClick={userInfo?.social === 'kakao' ? handleKakaoWithdrawal : handleGoogleWitherawal}>
        회원탈퇴
      </button>
    </div>
  );
}

export default Withdrawal;
