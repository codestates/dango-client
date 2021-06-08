import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../../_reducer';
import { openModal } from '../../../_reducer/modal';

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

  const handleKakaoWithdrawal = () => {
    dispatch(
      openModal({
        type: 'danger',
        text: '정말 탈퇴하시겠습니까? 😢',
        callbackName: 'kakaoWithdrawal',
        callbackData: { config, withdrawalURL },
      }),
    );
  };

  const handleGoogleWithdrawal = () => {
    dispatch(
      openModal({
        type: 'danger',
        text: '정말 탈퇴하시겠습니까? 😢',
        callbackName: 'googleWithdrawal',
        callbackData: { config, withdrawalURL },
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
