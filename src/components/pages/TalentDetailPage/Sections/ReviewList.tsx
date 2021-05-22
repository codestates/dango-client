import React from 'react';
import { REVIEWLIST } from './ReviewStyle';
import { ReactComponent as StarSvg } from '../../../../images/star.svg';

const dummyReview = [
  { nickname: '유저1', rating: 5, text: '좋아요좋아요', date: '2021년 5월 22일' },
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
    text: '길게써보기',
    date: '2021년 5월 19일',
  },
  {
    nickname: '유저4',
    rating: 2,
    text: '아무말아무말',
    date: '2021년 5월 17일',
  },
];

const dummy2 = [];

// useCallback으로 감싸기
function ReviewList() {
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
    <REVIEWLIST>
      {dummyReview.length > 0 ? (
        dummyReview.map((review, idx) => {
          return (
            <li key={idx} style={{ marginBottom: '20px' }}>
              <div
                className="리뷰INFO"
                style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}
              >
                <div>
                  <span style={{ marginRight: '10px' }}>{review.nickname}</span>
                  <span>{getStar(review.rating)}</span>
                </div>
                <div>{review.date}</div>
              </div>
              <div className="리뷰내용">{review.text}</div>
            </li>
          );
        })
      ) : (
        <div>
          앗..! 아직 남겨진 리뷰가 없습니다.
          <span role="img" aria-label="emoji">
            😢
          </span>
        </div>
      )}
    </REVIEWLIST>
  );
}

export default ReviewList;
