import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';
import server from '../../../api';
import { signin, UserState } from '../../../_reducer/user';
import { openModal } from '../../../_reducer/modalSlice';
import validateNickname from '../../../utils/validateNickname';

import {
  SIGNUP_BACKGROUND,
  SIGNUP_CONTAINER,
  CLOSEBTN,
  SIGNUP_DIV,
  SIGNUP_FORM,
  SIGNUP_SPAN,
  SIGNUP_INPUT,
  SIGNUP_BTN,
} from './SignupStyle';

interface SignupProps {
  social: string;
  accessToken: string | null;
  setIsUser: (bool: boolean) => void;
}

function Signup({ social, accessToken, setIsUser }: SignupProps): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const [nickname, setNickname] = useState<string>('');
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleNicknameSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (validateNickname(nickname) !== '통과') {
      dispatch(openModal({ type: 'error', text: validateNickname(nickname) }));
    } else {
      const data = {
        nickname,
      };
      const config = {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      };

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
            setIsUser(true);
            dispatch(
              openModal({
                type: 'ok',
                text: '회원가입이 완료되었습니다.',
                callbackName: 'renewPage',
              }),
            );
          })
          .catch((err) => {
            if (!err.response) {
              return;
            }
            const { message } = err.response.data;

            dispatch(
              openModal({
                type: 'error',
                text: message,
              }),
            );
          });
      } else {
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
            setIsUser(true);
            history.push('/');
            dispatch(
              openModal({
                type: 'ok',
                text: '회원가입이 완료되었습니다.',
                callbackName: 'renewPage',
              }),
            );
          })
          .catch((err) => {
            if (!err.response) {
              return;
            }
            const { message } = err.response.data;

            dispatch(
              openModal({
                type: 'error',
                text: message,
              }),
            );
          });
      }
    }
  };
  const closeBtn = (): void => {
    history.push('/');
  };

  return (
    <SIGNUP_BACKGROUND>
      <SIGNUP_CONTAINER>
        <SIGNUP_DIV>
          <CLOSEBTN onClick={closeBtn}>
            {' '}
            <IoIosClose size="35" color="#83818c" />{' '}
          </CLOSEBTN>
          <SIGNUP_FORM>
            <SIGNUP_SPAN>사용하실 닉네임을 적어주세요. </SIGNUP_SPAN>
            <SIGNUP_INPUT name="닉네임" onChange={handleInput} />
            <SIGNUP_BTN type="submit" onClick={handleNicknameSubmit}>
              닉네임 등록
            </SIGNUP_BTN>
          </SIGNUP_FORM>
        </SIGNUP_DIV>
      </SIGNUP_CONTAINER>
    </SIGNUP_BACKGROUND>
  );
}

export default Signup;
