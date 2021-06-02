import React from 'react';
import { Link } from 'react-router-dom';
import { Type } from '../MyPage';
import { handleCategory } from '../../MapPage/Sections/functions';
import { SELLINGLIST, HEADER, LIST, ITEM, CATEGORY_IMG, SELLINFO, TITLE, PRICE } from './SellingListStyle';

interface Props {
  selling: Type[];
  show: boolean;
  setShow: (show: boolean) => void;
}

export default function SellingList({ selling, show, setShow }: Props): JSX.Element {
  const limitTitle = (title: string): string => {
    if (title.length > 10) {
      return `${title.slice(0, 20)}...`;
    }
    return title;
  };

  return (
    <>
      <SELLINGLIST>
        <HEADER> 판매 내역 </HEADER>
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
    </>
  );
}
