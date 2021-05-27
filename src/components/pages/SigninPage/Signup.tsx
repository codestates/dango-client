import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import server from '../../../api';
import { signin, UserState } from '../../../_reducer/user';
import { openModal } from '../../../_reducer/modal';

interface SignupProps {
  social: string;
  accessToken: string | null;
  setIsUser: (bool: boolean) => void;
}

// 카카오와 구글의 signin 컴포넌트에서, 각각 props를 내려받습니다.

function Signup({ social, accessToken, setIsUser }: SignupProps): JSX.Element {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState<string | null>(null);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleNicknameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nickname || nickname.length < 2) {
      dispatch(openModal({ type: 'error', text: '닉네임은 두글자 이상 적어주세요.' }));
      return;
    }

    const data = {
      nickname,
    };
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    // 구글,카카오에 따라 서버랑 통신하는게 다를듯해서, 여기부터 분기하겠습니당.
    if (social === 'kakao') {
      server
        .post('/users/kakao/signup', data, config)
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
            talks,
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
              talks,
            },
            accessToken,
          };
          dispatch(signin(payload)); // 유저정보 저장
          setIsUser(true); // 닉네임창 없앤다.
          dispatch(
            openModal({
              type: 'ok',
              text: '회원가입이 완료되었습니다.',
            }),
          );
        })
        .catch((err) => {
          const { message } = err?.response?.data;
          alert(message);
        });
    }

    // 구글 회원가입인 경우 서버랑 통신코드
    else {
      const data = {
        nickname,
      };
      const config = {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      };
      server
        .post('/users/google/signup', data, config)
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
            talks,
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
              talks,
            },
            accessToken,
          };
          dispatch(signin(payload)); // 유저정보 저장
          setIsUser(true); // 닉네임창 없앤다.
          alert('회원가입완료');
        })
        .catch((err) => {
          if (!err.response) {
            console.log(err);
            return;
          }
          const { message } = err.response.data;
          alert(message);
        });
    }
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

export default Signup;
