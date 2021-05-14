import React, { useState } from 'react';
import server from '../../../api';

interface SignupProps {
  kakaoAccessToken: string | null;
  setIsUser: (bool: boolean) => void;
}

function SignUp({ kakaoAccessToken, setIsUser }: SignupProps): JSX.Element {
  const [nickname, setNickname] = useState<string | null>(null);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    console.log('kakaoToken::::::::::', kakaoAccessToken);
  };

  const handleNicknameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nickname || nickname.length < 2) {
      alert('닉네임은 두글자 이상 적어주세요.');
      return;
    }

    const data = {
      accessToken: kakaoAccessToken,
      nickname,
    };

    server
      .post('/users/kakao/signup', data)
      .then(() => {
        alert('회원가입완료');
        setIsUser(true);
      })
      .catch(() => alert('회원가입실패'));

    // 닉네임 중복체크는? api따로만들거면 버튼만들기. signup에 한꺼번에 할꺼면 버튼x
    // 받아온 데이터 리덕스에 저장하고 로컬스토리지에 저장.
  };

  return (
    <div>
      <form onSubmit={handleNicknameSubmit}>
        <span>닉네임: </span>
        <input name="닉네임" onChange={handleInput} />
        <button type="submit">닉네임등록</button>
      </form>
    </div>
  );
}

export default SignUp;
