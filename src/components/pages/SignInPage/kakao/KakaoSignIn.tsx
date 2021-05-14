import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import server from '../../../../api';
import SignUp from '../SignUp';
import { signIn, UserState } from '../../../../_reducer/users/user';

// const config = {
//   headers: {
//     authorization: `Bearer ${result.accessToken}`,
//   },
// };

// 필요정보
// 유저아이디, 닉네임, 이메일, 소셜종류, 이미지

function KakaoSignIn({ Kakao }: any): JSX.Element {
  const dispatch = useDispatch();

  const [kakaoAccessToken, setKakaoAccessToken] = useState<string | null>(null);
  const [isUser, setIsUser] = useState<boolean>(true);

  const handleKakaoSignIn = () => {
    // if (Kakao.Auth.getAccessToken()) {
    //   console.log('이미 로그인한 상태입니다.');
    //   return;
    // }
    Kakao.Auth.login({
      success: function (response: any) {
        setKakaoAccessToken(response.access_token);
        console.log(response.access_token);
        const data = {
          accessToken: response.access_token,
        };
        server
          .post('/users/kakao/signin', data)
          .then((response) => {
            console.log('respose.data:::', response.data);

            const {
              accessToken,
              nickname,
              socialData: { email, id, image, type: social },
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
            dispatch(signIn(payload));
            // history.push('/');
          })
          .catch((err) => {
            const { message } = err.response.data;
            console.log('message::::::', message);
            if (message === '회원정보가 없습니다.') {
              setIsUser(false);
            }
          });
      },
      fail: function (error: any) {
        console.log('카카오 로그인 실패!', error);
      },
    });
  };

  useEffect(() => {
    // 닉네임 창 띄우고, 닉네임과 토큰들을 준다.
    console.log('isUser바뀜');
  }, [isUser]);

  return (
    <>
      <button type="button" onClick={handleKakaoSignIn}>
        Kakao Login
      </button>
      {isUser || <SignUp kakaoAccessToken={kakaoAccessToken} setIsUser={setIsUser} />}
    </>
  );
}

export default KakaoSignIn;
