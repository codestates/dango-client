import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import server from '../../../api';
import { RootState } from '../../../_reducer';
import { signout } from '../../../_reducer/user';
import { openModal } from '../../../_reducer/modalSlice';

const WITHDRAWAL_BUTTON = styled.button`
  all: unset;
  color: grey;
  cursor: pointer;
  font-size: 0.7rem;
  &:hover {
    font-weight: bold;
  }
  @media screen and (max-width: 540px) {
    font-size: 0.5rem;
  }
`;

function Withdrawal(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user, shallowEqual);
  const [withdrawalURL, setWithdrawalURL] = useState('');
  const [config, setConfig] = useState<{ data: { nickname: string } }>();

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    setConfig({ data: { nickname: userInfo.nickname } });
    if (userInfo.social === 'kakao') {
      setWithdrawalURL('/users/kakao/withdrawal');
    } else {
      setWithdrawalURL('/users/google/withdrawal');
    }
  }, [userInfo]);

  const withdrawal = () => {
    const goToRoot = () => {
      history.push('/');
    };
    server
      .delete(withdrawalURL, config)
      .then(() => {
        dispatch(signout());
        dispatch(openModal({ type: 'ok', text: '회원탈퇴가 완료되었습니다.', onConfirm: goToRoot }));
      })
      .catch((err) => {
        if (!err.response) {
          console.log(err);
          return;
        }
        dispatch(openModal({ type: 'error', text: err.response.data.message }));
      });
  };

  const handleKakaoWithdrawal = () => {
    const confirmCallback = () => {
      const { Kakao } = window;
      Kakao.API.request({
        url: '/v1/user/unlink',
        success: withdrawal,
        fail: function (err: any) {
          console.log(err);
        },
      });
    };
    dispatch(
      openModal({
        type: 'danger',
        text: '정말 탈퇴하시겠습니까? 😢',
        onConfirm: confirmCallback,
      }),
    );
  };

  const handleGoogleWithdrawal = () => {
    dispatch(
      openModal({
        type: 'danger',
        text: '정말 탈퇴하시겠습니까? 😢',
        onConfirm: withdrawal,
      }),
    );
  };

  return (
    <WITHDRAWAL_BUTTON
      type="button"
      onClick={userInfo?.social === 'kakao' ? handleKakaoWithdrawal : handleGoogleWithdrawal}
    >
      회원탈퇴
    </WITHDRAWAL_BUTTON>
  );
}

export default Withdrawal;
