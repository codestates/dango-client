import React from 'react';
import { Link } from 'react-router-dom';
import { Type } from '../MyPage';
import { handleCategory } from '../../MapPage/Sections/functions';
import { SELLINGLIST, HEADER, LIST, ITEM, CATEGORY_IMG, SELLINFO } from './SellingListStyle';

interface Props {
  selling: Type[];
}

export default function SellingList({ selling }: Props): JSX.Element {
  return (
    <>
      <SELLINGLIST>
        <HEADER> Selling List </HEADER>
        <LIST>
          {selling.map((list: Type) => (
            <ITEM key={Math.random()}>
              <CATEGORY_IMG>{handleCategory(list.category)}</CATEGORY_IMG>
              <SELLINFO>
                <Link to={`/detail/${list._id}`}>제목: {list.title}</Link>
                <div>주소: {list.address}</div>
                <div>가격: {list.price} 원</div>
              </SELLINFO>
            </ITEM>
          ))}
        </LIST>
      </SELLINGLIST>
    </>
  );
}
