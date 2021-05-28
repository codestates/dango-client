import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../../_reducer';
import { openModal } from '../../../_reducer/modal';

function Withdrawal(): JSX.Element {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user, shallowEqual);
  const [withdrawalURL, setWithdrawalURL] = useState('');
  const [config, setConfig] = useState<{ data: { nickname: string } }>();

  // 유저정보가 갱신될때마다 서버에 요청할 URL과 config를 갱신시킨다.
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

  // TODO:로그인토큰이 만료되면 회원탈퇴가 안된다. 갱신하려면 refreshToken 이필요하기때문. 로그인 할때 리덕스에 저장해서 재발급받는 방식으로 리팩토링하자.

  // 실제 실행함수는 utils/modal.tsx에서 확인
  const handleKakaoWithdrawal = () => {
    dispatch(
      openModal({
        type: 'danger',
        text: '정말 탈퇴하시겠습니까?',
        callbackName: 'kakaoWithdrawal',
        callbackData: { config, withdrawalURL },
      }),
    );
  };

  const handleGoogleWithdrawal = () => {
    dispatch(
      openModal({
        type: 'danger',
        text: '정말 탈퇴하시겠습니까?',
        callbackName: 'googleWithdrawal',
        callbackData: { config, withdrawalURL },
      }),
    );
  };

  return (
    <div>
      <button type="button" onClick={userInfo?.social === 'kakao' ? handleKakaoWithdrawal : handleGoogleWithdrawal}>
        회원탈퇴
      </button>
    </div>
  );
}

export default Withdrawal;
