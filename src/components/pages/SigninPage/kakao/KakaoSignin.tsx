import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import server from '../../../../api';
import Signup from '../Signup';
import { signin, UserState } from '../../../../_reducer/user';

function KakaoSignin({ Kakao }: any): JSX.Element {
  const dispatch = useDispatch();

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
            console.log('respose.data:::', response.data);

            const {
              _id: id,
              accessToken,
              nickname,
              socialData: { email, image, social },
              selling,
              buying,
              bought,
              chatRooms
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
                bought,
                chatRooms
              },
              accessToken,
            };
            dispatch(signin(payload));
            alert('로그인되었습니다.');
          })
          .catch((err) => {
            const { message } = err.response.data;
            if (message === '회원정보가 없습니다.') {
              alert('회원정보가 없습니다. 닉네임을 입력하여 회원가입을 진행해주세요.');
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
    <>
      <button type="button" onClick={handleKakaoSignin}>
        Kakao Login
      </button>
      {isUser || <Signup social="kakao" accessToken={kakaoAccessToken} setIsUser={setIsUser} />}
    </>
  );
}

export default KakaoSignin;
