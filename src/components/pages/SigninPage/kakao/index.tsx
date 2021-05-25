import React from 'react';
import { useSelector } from 'react-redux';
import KakaoSignin from './KakaoSignin';
import Signout from '../Signout';
import Withdrawal from '../Withdrawal';
import { RootState } from '../../../../_reducer';
import Modal from '../../../../utils/modal';

declare global {
  interface Window {
    Kakao: any;
  }
}

// 이컴포넌트는 테스트를위한 임시 컴포넌트.

// isSignin 체크는 홈페이지 랜더될때 바로하고, false면 로그인, true면 로그아웃과 마이페이지 버튼을 랜더한다.
// 로그인 버튼을 누르면 구글로그인,카카오로그인 버튼이 모달로 뜬다.
// 로그인버튼(TODO:KakaoSignin.tsx, GoogleSignin.tsx)을 누르면 거기서 isUser를 체크하고
// true면 로그인을 시켜주고, false면 닉네임입력창(TODO:Signup.tsx)을 띄운다.
// TODO:singout.tsx, withdrawal.tsx은 하나의버튼이므로 userInfo.social이 kakao인지 google인지에 따라 분기하여 함수를 실행시킨다.
function KakaoSign(): JSX.Element {
  const { isSignin } = useSelector((state: RootState) => state.user);

  return (
    <div>
      <Modal />
      {isSignin ? <Signout /> : <KakaoSignin />}
      <Withdrawal />
    </div>
  );
}

export default KakaoSign;
