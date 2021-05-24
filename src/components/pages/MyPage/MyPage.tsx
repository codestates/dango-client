import React from 'react';
import UserInfo from './Sections/UserInfo';
import TalentList from './Sections/TalentList';
import { MYPAGE } from './MyPageStyle';

export default function MyPage() {
  return (
    <MYPAGE>
      <UserInfo />
      <TalentList />
    </MYPAGE>
  );
}
