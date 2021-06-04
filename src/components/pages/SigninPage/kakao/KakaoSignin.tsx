import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { openModal } from '../../../../_reducer/modal';
import server from '../../../../api';
import Signup from '../Signup';
import { signin, UserState } from '../../../../_reducer/user';

import kakaoLoginBtn from '../../../../images/kakaoLoginBtn.png';

function KakaoSignin(): JSX.Element {
  const { Kakao } = window;
  const dispatch = useDispatch();
  const history = useHistory();
  const [kakaoAccessToken, setKakaoAccessToken] = useState<string | null>(null);
  const [isUser, setIsUser] = useState<boolean>(true);

  const handleKakaoSignin = () => {
    Kakao.Auth.login({
      success: function (response: any) {
        setKakaoAccessToken(response.access_token);
        console.log(response.access_token);
        const config = {
          headers: {
            authorization: `Bearer ${response.access_token}`,
          },
        };
        server
          .post('/users/kakao/signin', null, config)
          .then((response) => {
            console.log('kakao respose.data:::', response.data);

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
            console.log(response.data);

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
            console.log(payload);
            dispatch(openModal({ type: 'ok', text: '로그인되었습니다.', callbackName: 'renewPage' }));
            history.push('/');
          })
          .catch((err) => {
            if (!err.response) {
              console.log(err);
              return;
            }
            const { message } = err.response.data;
            if (message === '회원정보가 없습니다.') {
              dispatch(
                openModal({
                  type: 'error',
                  text: '회원정보가 없습니다. \n닉네임을 입력하여 회원가입을 진행해주세요.',
                }),
              );
              setIsUser(false);
            }
          });
      },
      fail: function (error: any) {
        console.log('카카오 로그인 실패!', error);
      },
    });
  };

  // 카카오,구글 로그인 컴포넌트에서 SignUp컴포넌트를 각각 리턴합니다.(social 종류와, 토큰과 setIsUser을 props로 담아서)
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button
        type="button"
        onClick={handleKakaoSignin}
        style={{
          border: 'none',
          borderRadius: '2px',
          backgroundColor: '#FEE500',
          boxShadow: 'rgb(0 0 0 / 24%) 0px 2px 2px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px',
        }}
      >
        <img alt="" src={kakaoLoginBtn} style={{ width: 180, height: 39, cursor: 'pointer' }} />
      </button>
      {isUser || <Signup social="kakao" accessToken={kakaoAccessToken} setIsUser={setIsUser} />}
    </div>
  );
}

export default KakaoSignin;
