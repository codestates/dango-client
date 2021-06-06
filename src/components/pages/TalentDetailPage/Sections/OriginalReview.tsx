import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../_reducer';
import { ReactComponent as StarSvg } from '../../../../images/star.svg';
import ReplyReview from './ReplyReview';
import {
  LIST,
  INFO,
  NICKNAME,
  DATE,
  REPLYBOX,
  REPLY,
  REPLYNAME,
  REPLYDATE,
  USERSTAR,
  STAR,
  REVIEWCONTENT,
  REPLYTOP,
  REPLYCONTENT,
  REPLYBUTTON,
} from './ReviewStyle';
import { SSBUTTON } from '../../../../styles/Buttons';

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
  const { userRole, sellerNickname } = useSelector((state: RootState) => state.talent);

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
        <USERSTAR>
          <NICKNAME>{review.nickname}</NICKNAME>
          <STAR>{getStar(review.rating)}</STAR>
        </USERSTAR>
        <DATE>{review.date}</DATE>
      </INFO>
      <REVIEWCONTENT>
        {setEllipsis(review.review).text}
        {setEllipsis(review.review).isShowMore && more && createMoreOrCutBtn('더보기')}
        {more || createMoreOrCutBtn('접기')}
      </REVIEWCONTENT>
      {userRole === 'seller' && !replyBox && !postReplyBox && (
        <REPLYBUTTON>
          <SSBUTTON type="button" onClick={handleClickReply} style={{ marginLeft: 'auto' }}>
            답글 달기
          </SSBUTTON>
        </REPLYBUTTON>
      )}
      {postReplyBox && <ReplyReview reviewId={review.reviewId} setPostReplyBox={setPostReplyBox} />}
      {replyBox && review.reply && (
        <REPLYBOX>
          <REPLY>
            <REPLYTOP>
              <REPLYNAME>{sellerNickname}</REPLYNAME>
              <REPLYDATE>{review.reply.replyDate}</REPLYDATE>
            </REPLYTOP>
            <REPLYCONTENT>{review.reply.replyDescription}</REPLYCONTENT>
          </REPLY>
        </REPLYBOX>
      )}
    </LIST>
  );
}
