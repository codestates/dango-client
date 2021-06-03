import React from 'react';
import { Link } from 'react-router-dom';
import { Type } from '../MyPage';
import { handleCategory } from '../../MapPage/Sections/functions';
import { SELLINGLIST, HEADER, LIST, ITEM, CATEGORY_IMG, SELLINFO, TITLE, PRICE, MOBILE_ESC } from './SellingListStyle';

interface Props {
  selling: Type[];
  showSell: boolean;
  setShowSell: (show: boolean) => void;
}

export default function SellingList({ selling, showSell, setShowSell }: Props): JSX.Element {
  const limitTitle = (title: string): string => {
    if (title.length > 10) {
      return `${title.slice(0, 20)}...`;
    }
    return title;
  };

  return (
    <SELLINGLIST showSell={showSell}>
      <HEADER>
        <span>판매 내역</span>
        <MOBILE_ESC showSell={showSell} onClick={() => setShowSell(false)}>
          ✕
        </MOBILE_ESC>
      </HEADER>
      <LIST>
        {selling.map((list: Type) => (
          <ITEM to={`/detail/${list._id}`} key={Math.random()}>
            <CATEGORY_IMG>{handleCategory(list.category)}</CATEGORY_IMG>
            <SELLINFO>
              <TITLE>{limitTitle(list.title)}</TITLE>
              <PRICE>판매 가격: {list.price} 원</PRICE>
            </SELLINFO>
          </ITEM>
        ))}
      </LIST>
    </SELLINGLIST>
  );
}
