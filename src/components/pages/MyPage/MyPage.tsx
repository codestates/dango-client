import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { RootState } from '../../../_reducer';
import server from '../../../api';
import UserInfo from './Sections/UserInfo';
import PurchaseList from './Sections/PurchaseList';
import SellingList from './Sections/SellingList';

import MYPAGE from './MyPageStyle';
import Modal from '../../../utils/modal';

export interface Type {
  reviews: number;
  title: string;
  address: string;
  category: string;
  price: number;
  _id: string;
}

export default function MyPage(): JSX.Element {
  const { userInfo } = useSelector((state: RootState) => state.user, shallowEqual);
  const [reviewed, setReviewed] = useState<Type[]>([]);
  const [unreviewed, setUnreviewed] = useState<Type[]>([]);
  const [selling, setSelling] = useState<Type[]>([]);
  const [showSell, setShowSell] = useState<boolean>(false);
  const [showPurchase, setShowPurchase] = useState<boolean>(false);

  useEffect(() => {
    server
      .get(`/users/mypage/${userInfo?.id}`)
      .then((response) => {
        const { reviewed, unreviewed, selling } = response.data.data;
        setReviewed(reviewed);
        setUnreviewed(unreviewed);
        setSelling(selling);
      })
      .catch(() => '');
  }, [userInfo]);

  return (
    <>
      <Modal />
      <MYPAGE>
        <UserInfo setShowSell={setShowSell} setShowPurchase={setShowPurchase} />
        <SellingList selling={selling} showSell={showSell} setShowSell={setShowSell} />
        <PurchaseList
          reviewed={reviewed}
          unreviewed={unreviewed}
          showPurchase={showPurchase}
          setShowPurchase={setShowPurchase}
        />
      </MYPAGE>
    </>
  );
}
