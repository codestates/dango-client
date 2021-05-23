import React, { useState } from 'react';
import { REVIEWLIST } from './ReviewStyle';
import OriginalReview from './OriginalReview';
import { ReactComponent as StarSvg } from '../../../../images/star.svg';

const dummyReview = [
  { nickname: '유저1', rating: 5, text: '좋아요좋아요좋아요좋아요좋아요좋아요좋아요좋아요', date: '2021년 5월 22일' },
  {
    nickname: '유저2',
    rating: 4,
    text: '그냥그랬어요',
    date: '2021년 5월 21일',
    reply: { text: '앞으로는 좀더 준비해서 만족시켜드리겠습니다.', date: '2021년 5월 23일' },
  },
  {
    nickname: '유저3',
    rating: 0,
    text: '길게써보기길게써보기길게 써보기 안녕하세요? 길게 써보기 오늘오늘 토요일. 길게 써보기....길게...!써보기ㅇㅇ길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기@@@@',
    date: '2021년 5월 19일',
  },
  {
    nickname: '유저4',
    rating: 2,
    text: '아무말아무말',
    date: '2021년 5월 17일',
  },
];

interface Props {
  role: string;
}

// useCallback으로 감싸기
function ReviewList({ role }: Props): JSX.Element {
  return (
    <REVIEWLIST>
      {dummyReview.length > 0 ? (
        dummyReview.map((review, idx) => {
          return <OriginalReview key={idx} review={review} role={role} />;
        })
      ) : (
        <div>앗..! 아직 남겨진 리뷰가 없습니다.😢</div>
      )}
    </REVIEWLIST>
  );
}

export default ReviewList;
