import React from 'react';
import { SELLINGLIST } from './SellingListStyle';

import { Type } from '../MyPage';

export default function SellingList({ selling }: any): JSX.Element {
  return (
    <>
      <SELLINGLIST>
        SellingList
        {selling.map((list: Type) => (
          <div key={Math.random()}>
            <div>{list.title}</div>
            <div>{list.address}</div>
            <div>{list.category}</div>
            <div>{list.price}</div>
          </div>
        ))}
      </SELLINGLIST>
    </>
  );
}
