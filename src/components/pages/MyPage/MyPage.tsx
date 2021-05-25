import React from 'react';
import UserInfo from './Sections/UserInfo';
import TalentList from './Sections/TalentList';
import { MYPAGE } from './MyPageStyle';
import Modal from '../../../utils/modal';

export default function MyPage() {
  return (
    <>
      <Modal />
      <MYPAGE>
        <UserInfo />
        <TalentList />
      </MYPAGE>
    </>
  );
}
