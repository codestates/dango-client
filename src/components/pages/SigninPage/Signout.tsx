import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
import { signout } from '../../../_reducer/user';
import { RootState } from '../../../_reducer';
import server from '../../../api';

function Signout(): JSX.Element {
  const dispatch = useDispatch();
  const { userInfo, accessToken } = useSelector((state: RootState) => state.user);
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_LOGIN_KEY as string;

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
    console.log('-----logout success!-----');
    alert('로그아웃되었습니다.');
  };

  // 구글과 카카오 signout 컴포넌트를 따로 만들고 social에 따라서 버튼 렌더를 분기한다..
  return (
    <div>
      {userInfo?.social === 'kakao' ? (
        <button type="button" onClick={handleKakaoSignout}>
          Logout
        </button>
      ) : (
        <GoogleLogout clientId={GOOGLE_CLIENT_ID} buttonText="Logout" onLogoutSuccess={handleGoogleSignout}>
          Logout
        </GoogleLogout>
      )}
    </div>
  );
}

export default Signout;
