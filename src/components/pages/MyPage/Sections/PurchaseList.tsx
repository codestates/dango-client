import React from 'react';
import { Link } from 'react-router-dom';
import { PURCHASELIST } from './PurchaseListStyle';

import { Type } from '../MyPage';

export default function PurchaseList({ reviewed, unreviewed }: any): JSX.Element {
  return (
    <>
      <PURCHASELIST>
        PurchaseList
        <div>
          {' '}
          {unreviewed.map((list: Type) => (
            <div key={Math.random()}>
              <div>{list.title}</div>
              <div>{list.address}</div>
              <div>{list.category}</div>
              <div>{list.price}</div>
              <Link to={`/detail/${list._id}`}>리뷰쓰러가기</Link>
            </div>
          ))}
        </div>
        <div>
          {reviewed.map((list: Type) => (
            <div key={Math.random()}>
              <div>{list.title}</div>
              <div>{list.address}</div>
              <div>{list.category}</div>
              <div>{list.price}</div>
              <div>내 별점: {list?.reviews}</div>
            </div>
          ))}
        </div>
      </PURCHASELIST>
    </>
  );
}
