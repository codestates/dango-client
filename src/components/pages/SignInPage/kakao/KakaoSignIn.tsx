import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import server from '../../../../api';

interface DummyLoginResponse {
  true: {
    isUser: boolean;
    accessToken: string;
    refreshToken: string;
    userInfo: {
      email: string;
      nickname: string;
    };
  };
  false: {
    isUser: boolean;
  };
}

const dummyLoginResponse: DummyLoginResponse = {
  true: {
    isUser: true,
    accessToken: 'testAccessToken',
    refreshToken: 'testRefreshToken',
    userInfo: {
      email: 'test@test.com',
      nickname: '순기',
    },
  },
  false: {
    isUser: false,
  },
};

interface SignInProps {
  Kakao: any;
}

function KakaoSignIn({ Kakao }: SignInProps): JSX.Element {
  const history = useHistory();

  const [kakaoAccessToken, setKakaoAccessToken] = useState<string | null>(null);
  const [nickName, setNickName] = useState<string | null>(null);
  // const [accessToken, setAccessToken] = useState<string | null>(null);
  // const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isUser, setIsUser] = useState<boolean>(true);

  // 카카오 로그인시 주는 데이터
  //   access_token: "IyoL7Y9pazcTxk5d7fLogM5_5EQcxDxYnzU6CwopcFEAAAF5ZSCUvg"
  // expires_in: 7199
  // refresh_token: "VhVqWIfKqMCr5P_By6QzVfdWtxUnmFxMrZPNDAopcFEAAAF5ZSCUvA"
  // refresh_token_expires_in: 5183999
  // scope: "account_email profile"
  // token_type: "bearer"

  const handleKakaoSignIn = () => {
    // if (Kakao.Auth.getAccessToken()) {
    //   console.log('이미 로그인한 상태입니다.');
    //   return;
    // }
    Kakao.Auth.login({
      success: function (response: any) {
        console.log(response);
        setKakaoAccessToken(response.access_token);
        // 바디에? 헤더에?
        // const data = {
        //   accessToken: response.access_token
        // }
        // server.post('/users/kakao/signin',data)
        // .then()

        const userResponse = dummyLoginResponse.false;
        if (userResponse.isUser) {
          // 전역상태와 로컬에 저장해야한다.
          // FIXME: 리덕스에 저장하면 persist가 로컬에 저장해주나??
          // 아니면 따로 저장?
          // localStorage.setItem('accessToken', userResponse.accessToken);
          // localStorage.setItem('refreshToken', userResponse.refreshToken);
          // history.push('/');
        } else {
          setIsUser(false);
        }
      },
      fail: function (error: any) {
        console.log('카카오 로그인 실패!', error);
      },
    });
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nickName || nickName.length < 2) {
      console.log('닉네임은 두글자 이상 적어주세요.');
      return;
    }
    console.log('nickname submit:::::', nickName);
    // 서버에 users/kakao/signup 보낼 것들
    console.log('서버야 회원가입 들어간다~~', { kakaoAccessToken, nickName });

    // 닉네임 중복체크는? api따로만들거면 버튼만들기. signup에 한꺼번에 할꺼면 버튼x
    // 받아온 데이터 리덕스에 저장하고 로컬스토리지에 저장.
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
      <button type="button" onClick={() => setIsUser(!isUser)}>
        change isUser
      </button>
      <form onSubmit={handleSubmit} style={{ display: isUser ? 'none' : 'inline-block' }}>
        <span>닉네임: </span>
        <input name="닉네임" onChange={handleInput} />
        <button type="submit">닉네임등록</button>
      </form>
    </>
  );
}

export default KakaoSignIn;
