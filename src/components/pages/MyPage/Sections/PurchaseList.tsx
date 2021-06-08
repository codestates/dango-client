import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as StarSvg } from '../../../../images/star.svg';
import { handleCategory } from '../../MapPage/Sections/functions';
import { HEADER, LIST, ITEM, CATEGORY_IMG, SELLINFO as PURCHASE_INFO, TITLE, PRICE } from './SellingListStyle';
import { PURCHASELIST, GO_TO_REVIEW, STAR, MOBILE_ESC } from './PurchaseListStyle';

import { Type } from '../MyPage';

interface Props {
  reviewed: Type[];
  unreviewed: Type[];
  showPurchase: boolean;
  setShowPurchase: (show: boolean) => void;
}

export default function PurchaseList({ reviewed, unreviewed, showPurchase, setShowPurchase }: Props): JSX.Element {
  const limitTitle = (title: string): string => {
    if (title.length > 10) {
      return `${title.slice(0, 20)}...`;
    }
    return title;
  };

  const getStar = (rating: number) => {
    const Stars = [];
    const YELLOW = '#ffdb58';
    const GREY = '#dcdcdc';
    let fillColor;

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
      <PURCHASELIST showPurchase={showPurchase}>
        <HEADER>
          {' '}
          <span>구매 내역</span>
          <MOBILE_ESC showPurchase={showPurchase} onClick={() => setShowPurchase(false)}>
            ✕
          </MOBILE_ESC>
        </HEADER>
        <LIST>
          {unreviewed.map((list: Type) => (
            <ITEM to={`/detail/${list._id}`} key={Math.random()}>
              <CATEGORY_IMG>{handleCategory(list.category)}</CATEGORY_IMG>
              <PURCHASE_INFO>
                <TITLE>{limitTitle(list.title)}</TITLE>
                <PRICE>구매 가격: {list.price} 원</PRICE>
                <GO_TO_REVIEW>리뷰쓰러가기</GO_TO_REVIEW>
              </PURCHASE_INFO>
            </ITEM>
          ))}

          {reviewed.map((list: Type) => (
            <ITEM to={`/detail/${list._id}`} key={Math.random()}>
              <CATEGORY_IMG>{handleCategory(list.category)}</CATEGORY_IMG>
              <PURCHASE_INFO>
                <TITLE>{list.title}</TITLE>
                <PRICE>구매 가격: {list.price} 원</PRICE>
                <STAR>내 별점: {getStar(list?.reviews)}</STAR>
              </PURCHASE_INFO>
            </ITEM>
          ))}
        </LIST>
      </PURCHASELIST>
    </>
  );
}
