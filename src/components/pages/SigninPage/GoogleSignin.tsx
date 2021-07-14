import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { openModal } from '../../../_reducer/modalSlice';
import server from '../../../api/index';
import Signup from './Signup';
import { signin, UserState } from '../../../_reducer/user';

function GoogleSignin(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const [googleIdToken, setGoogleIdToken] = useState<string | null>(null);
  const [isUser, setIsUser] = useState<boolean>(true);

  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_LOGIN_KEY as string;

  const responseGoogle = (response: any) => {
    setGoogleIdToken(response.tokenObj.id_token);
  };

  useEffect(() => {
    if (googleIdToken !== null) {
      const config = { headers: { authorization: `Bearer ${googleIdToken}` } };
      server
        .post('/users/google/signin', null, config)
        .then((response) => {
          const {
            _id: id,
            accessToken,
            nickname,
            socialData: { email, image, social },
            selling,
            buying,
            unreviewed,
            reviewed,
            chatRooms,
          } = response.data;

          const payload: UserState = {
            userInfo: {
              id,
              social,
              nickname,
              image,
              email,
              selling,
              buying,
              unreviewed,
              reviewed,
              chatRooms,
            },
            accessToken,
          };
          dispatch(signin(payload));
          dispatch(openModal({ type: 'ok', text: '로그인되었습니다.' }));
          history.push('/');
        })
        .catch((err) => {
          if (!err.response) {
            return;
          }
          const { message } = err.response.data;
          if (message === '등록된 회원이 아닙니다.') {
            dispatch(
              openModal({
                type: 'error',
                text: '회원정보가 없습니다. \n닉네임을 입력하여 회원가입을 진행해주세요.',
              }),
            );
            setIsUser(false);
          }
        });
    }
  }, [googleIdToken]);

  return (
    <div>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        render={(renderProps: any) => (
          <button
            type="button"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{
              backgroundColor: 'white',
              color: '#1a1700c7',
              border: 'none',
              width: '120px',
              height: '40px',
              cursor: 'pointer',
            }}
          >
            구글 로그인
          </button>
        )}
        buttonText="Login"
        onSuccess={(result) => responseGoogle(result)}
        onFailure={(result) => result}
        cookiePolicy="single_host_origin"
      />

      {isUser || <Signup social="google" accessToken={googleIdToken} setIsUser={setIsUser} />}
    </div>
  );
}

export default GoogleSignin;
