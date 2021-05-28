import React from 'react';
import UserInfo from './Sections/UserInfo';
import PurchaseList from './Sections/PurchaseList';
import SellingList from './Sections/SellingList';

import MYPAGE from './MyPageStyle';
import Modal from '../../../utils/modal';

export default function MyPage() {
  return (
    <>
      <Modal />
      <MYPAGE>
        <UserInfo />
        <PurchaseList />
        <SellingList />
      </MYPAGE>
    </>
  );
}
