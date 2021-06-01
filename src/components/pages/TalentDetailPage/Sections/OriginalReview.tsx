import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../_reducer';
import { ReactComponent as StarSvg } from '../../../../images/star.svg';
import ReplyReview from './ReplyReview';
import { LIST, INFO, NICKNAME, DATE, REPLYBOX, REPLY, REPLYNAME, REPLYDATE } from './ReviewStyle';

interface OriginalReviewProps {
  review: {
    _id: string;
    reviewId: string;
    nickname: string;
    rating: number;
    review: string;
    date: string;
    reply?: {
      replyDescription: string;
      replyDate: string;
    };
  };
}

// 한개의 리뷰
export default function OriginalReview({ review }: OriginalReviewProps): JSX.Element {
  const userRole = useSelector((state: RootState) => state.talent.userRole);

  const [postReplyBox, setPostReplyBox] = useState<boolean>(false);
  const [replyBox, setReplyBox] = useState<boolean>(false);
  const [more, setMore] = useState<boolean>(true);

  useEffect(() => {
    if (review.reply) {
      setReplyBox(true);
    }
  }, [review]);

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
    setPostReplyBox(true);
  };

  // 더보기버튼 함수
  const setEllipsis = (str: string) => {
    const limit = 100;
    return {
      text: (
        <p style={{ wordBreak: 'break-all' }}>
          {str.slice(0, limit)}
          {more && str.length > limit ? '...' : str.slice(limit, str.length)}
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
          {userRole === 'seller' && !replyBox && (
            <span>
              <button type="button" onClick={handleClickReply}>
                답글달기
              </button>
            </span>
          )}
        </div>
        <DATE>{review.date}</DATE>
      </INFO>
      <div style={{ whiteSpace: 'pre-wrap' }}>
        {setEllipsis(review.review).text}
        {setEllipsis(review.review).isShowMore && more && createMoreOrCutBtn('더보기')}
        {more || createMoreOrCutBtn('접기')}
      </div>
      {postReplyBox && <ReplyReview reviewId={review.reviewId} setPostReplyBox={setPostReplyBox} />}
      {replyBox && review.reply && (
        <REPLYBOX>
          <REPLY>
            <div>
              <REPLYNAME>고수</REPLYNAME>
              <REPLYDATE>{review.reply.replyDate}</REPLYDATE>
            </div>
            <p style={{ whiteSpace: 'pre-wrap' }}>{review.reply.replyDescription}</p>
          </REPLY>
        </REPLYBOX>
      )}
    </LIST>
  );
}
