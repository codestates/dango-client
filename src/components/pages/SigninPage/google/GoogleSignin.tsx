import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import server from '../../../../api/index';
import Signup from '../Signup';
import { signin, UserState } from '../../../../_reducer/users/user';

function GoogleSignin() {
  const dispatch = useDispatch();
  const [googleIdToken, setGoogleIdToken] = useState<string | null>(null);
  const [isUser, setIsUser] = useState<boolean>(true);

  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_LOGIN_KEY as string;

  // 요청 성공 시
  const responseGoogle = (response: any) => {
    setGoogleIdToken(response.tokenObj.id_token);
    console.log('GoogleLogin response: ', response);
  };

  // google id token 값을 받았을 때만 실행
  useEffect(() => {
    if (googleIdToken !== null) {
      console.log('googleIdToken:::', googleIdToken);
      const config = { headers: { authorization: `Bearer ${googleIdToken}` } };
      server
        .post('/users/google/signin', null, config)
        .then((response) => {
          console.log('respose.data:::', response.data);

          const {
            _id: id,
            accessToken,
            nickname,
            socialData: { email, image, social },
          } = response.data;

          const payload: UserState = {
            userInfo: {
              id,
              social,
              nickname,
              image,
              email,
            },
            accessToken,
          };
          dispatch(signin(payload));
          alert('로그인되었습니다.');
        })
        .catch((err) => {
          const { message } = err.response.data;
          if (message === '등록된 회원이 아닙니다.') {
            alert('회원정보가 없습니다. 닉네임을 입력하여 회원가입을 진행해주세요.');
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
            style={{ backgroundColor: '#DB4437', color: 'white', border: 'none' }}
          >
            Google Login
          </button>
        )}
        buttonText="Login"
        onSuccess={(result) => responseGoogle(result)}
        onFailure={(result) => console.log('failure', result)}
        cookiePolicy="single_host_origin"
      />

      {isUser || <Signup social="google" accessToken={googleIdToken} setIsUser={setIsUser} />}
    </div>
  );
}

export default GoogleSignin;
