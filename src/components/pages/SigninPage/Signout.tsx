import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../../../_reducer/users/user';
import { RootState } from '../../../_reducer';
import server from '../../../api';

function Signout(): JSX.Element {
  const dispatch = useDispatch();
  const { userInfo, accessToken } = useSelector((state: RootState) => state.user);

  let signoutURL = '';
  if (userInfo?.social === 'kakao') {
    signoutURL = '/users/kakao/signout';
  } else {
    signoutURL = '/users/google/signout';
  }

  const handleKakaoSignout = () => {
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    server
      .post('/users/kakao/signout', null, config)
      .then(() => {
        dispatch(signout());
        alert('로그아웃되었습니다.');
      })
      .catch((err) => {
        // 토큰이 유효하지 않을 때에도 로그아웃시켜준다. 어차피 다시 로그인 해야하기 때문!
        if (err.response?.data.message === '유효하지 않은 토큰입니다.') {
          dispatch(signout());
          alert('로그아웃되었습니다.');
        } else if (err.response) {
          alert(err.response.data.message);
        } else {
          console.log(err);
        }
      });
  };

  const handleGoogleSignout = () => {
    ('');
  };

  return (
    <div>
      <button type="button" onClick={userInfo?.social === 'kakao' ? handleKakaoSignout : handleGoogleSignout}>
        Logout
      </button>
    </div>
  );
}

export default Signout;
