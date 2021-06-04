import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
import { IoIosLogOut } from 'react-icons/io';
import { signout } from '../../../_reducer/user';
import { openModal } from '../../../_reducer/modal';
import { RootState } from '../../../_reducer';
import server from '../../../api';

function Signout(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userInfo, accessToken } = useSelector((state: RootState) => state.user);
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_LOGIN_KEY as string;

  const handleKakaoSignout = () => {
    console.log('카카오 로그아웃~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    server
      .post('/users/kakao/signout', null, config)
      .then(() => {
        dispatch(signout());
        dispatch(openModal({ type: 'ok', text: '로그아웃되었습니다.', callbackName: 'renewPage' }));
      })
      .catch((err) => {
        // 토큰이 유효하지 않을 때에도 로그아웃시켜준다. 어차피 다시 로그인 해야하기 때문!
        if (err.response?.data.message === '유효하지 않은 토큰입니다.') {
          dispatch(signout());
          dispatch(openModal({ type: 'ok', text: '로그아웃되었습니다.', callbackName: 'renewPage' }));
        } else if (err.response) {
          dispatch(openModal({ type: 'error', text: err.response.data.message }));
        } else {
          console.log(err);
        }
      });
  };

  const handleGoogleSignout = () => {
    console.log('-----logout success!-----');
    dispatch(signout());
    dispatch(openModal({ type: 'ok', text: '로그아웃되었습니다.', callbackName: 'renewPage' }));
  };

  // 구글과 카카오 signout 컴포넌트를 따로 만들고 social에 따라서 버튼 렌더를 분기한다..
  return (
    <div>
      {userInfo?.social === 'kakao' ? (
        <IoIosLogOut type="button" size="20" onClick={handleKakaoSignout} />
      ) : (
        <GoogleLogout
          clientId={GOOGLE_CLIENT_ID}
          onLogoutSuccess={handleGoogleSignout}
          render={(renderProps) => (
            <button
              type="button"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              style={{
                border: 'none',
                backgroundColor: '#fff',
                zIndex: 0,
                color: '#83818c',
                position: 'relative',
                cursor: 'pointer',
                marginRight: 'auto',
                justifyContent: 'center',
                padding: '0 25px 0 0',
              }}
            >
              <IoIosLogOut size="20" />
            </button>
          )}
        />
      )}
    </div>
  );
}

export default Signout;
