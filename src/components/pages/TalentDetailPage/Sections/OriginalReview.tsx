import React, { useState } from 'react';
import { ReactComponent as StarSvg } from '../../../../images/star.svg';
import ReplyReview from './ReplyReview';
import { LIST, INFO, NICKNAME, DATE, REPLYBOX, REPLY, REPLYNAME, REPLYDATE } from './ReviewStyle';

interface OriginalReviewProps {
  review: {
    nickname: string;
    rating: number;
    text: string;
    date: string;
    reply?: {
      text: string;
      date: string;
    };
  };
  role: string;
}

export default function OriginalReview({ review, role }: OriginalReviewProps): JSX.Element {
  const [onReplyBox, setOnReplyBox] = useState<boolean>(false);
  const [more, setMore] = useState<boolean>(true);

  // useCallback으로 감싸기
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

  const handleClickReply = () => {
    setOnReplyBox(!onReplyBox);
  };

  // 더보기버튼 함수
  const setEllipsis = (str: string) => {
    const limit = 100;
    return {
      text: (
        <p style={{ wordBreak: 'break-all' }}>
          {str.slice(0, limit)}
          {more ? '...' : str.slice(limit, str.length)}
        </p>
      ),

      isShowMore: str.length > limit,
    };
  };

  const createMoreOrCutBtn = (str: string) => {
    return (
      <div
        style={{ color: '#8d6ec8', fontWeight: 'bold', textAlign: 'end', cursor: 'pointer' }}
        onClick={() => (str === '더보기' ? setMore(false) : setMore(true))}
      >
        {str}
      </div>
    );
  };

  return (
    <LIST>
      <INFO>
        <div>
          <NICKNAME>{review.nickname}</NICKNAME>
          <span>{getStar(review.rating)}</span>
          {role === 'seller' && !review.reply ? (
            <span>
              <button type="button" onClick={handleClickReply}>
                답글달기
              </button>
            </span>
          ) : (
            ''
          )}
        </div>
        <DATE>{review.date}</DATE>
      </INFO>
      <div>
        {setEllipsis(review.text).text}
        {setEllipsis(review.text).isShowMore && more && createMoreOrCutBtn('더보기')}
        {more || createMoreOrCutBtn('접기')}
      </div>
      {onReplyBox && <ReplyReview />}
      {review.reply ? (
        <REPLYBOX>
          <REPLY>
            <div>
              <REPLYNAME>고수</REPLYNAME>
              <REPLYDATE>{review.reply.date}</REPLYDATE>
            </div>
            <p>{review.reply.text}</p>
          </REPLY>
        </REPLYBOX>
      ) : (
        ''
      )}
    </LIST>
  );
}
