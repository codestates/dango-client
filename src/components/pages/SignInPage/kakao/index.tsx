import React from 'react';
import { useSelector } from 'react-redux';
import KakaoSignIn from './KakaoSignIn';
import KakaoSignOut from './KakaoSignOut';
import KakaoWithdrawal from './KakaoWithdrawal';
import { RootState } from '../../../../_reducer';

const { Kakao }: any = window;

function KakaoSign(): JSX.Element {
  const { isSignIn } = useSelector((state: RootState) => state.user);

  return (
    <div>
      {isSignIn ? <KakaoSignOut /> : <KakaoSignIn Kakao={Kakao} />}
      <KakaoWithdrawal Kakao={Kakao} />
    </div>
  );
}

export default KakaoSign;
