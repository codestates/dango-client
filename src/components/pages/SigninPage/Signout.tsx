import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
import { IoIosLogOut } from 'react-icons/io';
import { signout } from '../../../_reducer/user';
import { openModal } from '../../../_reducer/modalSlice';
import { RootState } from '../../../_reducer';
import server from '../../../api';

import { LINK } from '../LandingPage/Sections/NavBarStyle';

function Signout({ show }: { show: boolean }): JSX.Element {
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
        dispatch(openModal({ type: 'ok', text: '로그아웃되었습니다.', callbackName: 'renewPage' }));
      })
      .catch((err) => {
        if (err.response?.data.message === '유효하지 않은 토큰입니다.') {
          dispatch(signout());
          dispatch(openModal({ type: 'ok', text: '로그아웃되었습니다.', callbackName: 'renewPage' }));
        } else if (err.response) {
          dispatch(openModal({ type: 'error', text: err.response.data.message }));
        } else {
          err;
        }
      });
  };

  const handleGoogleSignout = () => {
    dispatch(signout());
    dispatch(openModal({ type: 'ok', text: '로그아웃되었습니다.', callbackName: 'renewPage' }));
  };

  return (
    <>
      {userInfo?.social === 'kakao' ? (
        <LINK to="/" current={false} show={show} onClick={handleKakaoSignout}>
          <IoIosLogOut type="div" size="20" />
        </LINK>
      ) : (
        <LINK to="/" current={false} show={show} onClick={handleGoogleSignout}>
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
                  padding: '0 0 0 7px',
                }}
              >
                <IoIosLogOut size="20" />
              </button>
            )}
          />
        </LINK>
      )}
    </>
  );
}

export default Signout;
