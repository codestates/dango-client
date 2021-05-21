import React from 'react';
import { REVIEWLIST } from './ReviewStyle';

const dummy = [
  { nickname: '유저1', rating: '5', text: '좋아요좋아요', date: '2021년 5월 19일' },
  { nickname: '유저2', rating: '4', text: '그냥그랬어요', date: '2021년 5월 21일' },
  {
    nickname: '유저3',
    rating: '0',
    text: '길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기길게써보기',
    date: '2021년 5월 22일',
  },
];

const dummy2 = [];

function ReviewList() {
  return (
    <REVIEWLIST>
      {dummy.length > 0 ? (
        dummy.map((review, idx) => {
          return (
            <li key={idx} style={{ border: '1px solid black' }}>
              <div>
                <span>이름: {review.nickname}</span>
                <ul>dddddd</ul>
              </div>
              <div>
                <div>
                  <p
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',

                      width: '90%',
                      height: '80%',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {review.text}
                  </p>
                </div>
                <div>
                  <span>더보기</span>
                </div>
              </div>
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
