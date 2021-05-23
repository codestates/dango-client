import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../_reducer';
import { UserState } from '../../../../_reducer/user';
import { USERINFO, WRAPIMG, PROFILEIMG } from '../MyPageStyle';
import Withdrawal from '../../SigninPage/Withdrawal';

/* userInfo:
email: "jhk327@nate.com"
id: "60a3c5c62a6f2bc75b421b79"
image: "https://placeimg.com/120/120/people/grayscale"
nickname: "가나다라마"
social: "kakao" */

// 로그인방식에 따라 카카오이미지 같은거 붙이기
export default function UserInfo() {
  const { userInfo } = useSelector((state: RootState) => state.user);
  console.log('user:::', userInfo);

  // if (userInfo) {
  //   const { email, image, nickname, social } = userInfo;
  // }

  // const handleClickWithdrawal = () => {

  // }

  return (
    <USERINFO>
      <WRAPIMG>
        <PROFILEIMG alt="prifileImage" src={userInfo?.image} />
      </WRAPIMG>
      <div>
        <div>닉네임: {userInfo?.nickname}</div>
        <div>email: {userInfo?.email}</div>
        <div>
          <Withdrawal />
        </div>
      </div>
    </USERINFO>
  );
}
