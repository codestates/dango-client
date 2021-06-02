import React from 'react';
import { Link } from 'react-router-dom';
import { PURCHASELIST } from './PurchaseListStyle';
import { ReactComponent as StarSvg } from '../../../../images/star.svg';
import { handleCategory } from '../../MapPage/Sections/functions';
import { HEADER, LIST, ITEM, CATEGORY_IMG, SELLINFO as PURCHASE_INFO } from './SellingListStyle';

import { Type } from '../MyPage';

interface Props {
  reviewed: Type[];
  unreviewed: Type[];
}

export default function PurchaseList({ reviewed, unreviewed }: Props): JSX.Element {
  const getStar = (rating: number) => {
    const Stars = [];
    const YELLOW = '#ffdb58';
    const GREY = '#dcdcdc';
    let fillColor;

    // 5개의 별이미지를 만든다. rating 이하의 별들은 노란색으로, rating보다 큰 별들은 회색으로 만든다.
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        fillColor = YELLOW;
      } else {
        fillColor = GREY;
      }
      Stars.push(<StarSvg key={i} style={{ marginRight: '3px' }} fill={fillColor} />);
    }
    return Stars;
  };
  return (
    <>
      <PURCHASELIST>
        <HEADER>Purchase List</HEADER>
        <LIST>
          {unreviewed.map((list: Type) => (
            <ITEM key={Math.random()}>
              <CATEGORY_IMG>{handleCategory(list.category)}</CATEGORY_IMG>
              <PURCHASE_INFO>
                <div>제목: {list.title}</div>
                <div>주소: {list.address}</div>
                <div>가격: {list.price} 원</div>
                <Link to={`/detail/${list._id}`}>리뷰쓰러가기</Link>
              </PURCHASE_INFO>
            </ITEM>
          ))}

          {reviewed.map((list: Type) => (
            <ITEM key={Math.random()}>
              <CATEGORY_IMG>{handleCategory(list.category)}</CATEGORY_IMG>
              <PURCHASE_INFO>
                <div>제목: {list.title}</div>
                <div>주소: {list.address}</div>
                <div>가격: {list.price} 원</div>
                <div>내 별점: {getStar(list?.reviews)}</div>
              </PURCHASE_INFO>
            </ITEM>
          ))}
        </LIST>
      </PURCHASELIST>
    </>
  );
}
