import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../_reducer';
import { REVIEWLIST } from './ReviewStyle';
import OriginalReview from './OriginalReview';

function ReviewList(): JSX.Element {
  const reviews = useSelector((state: RootState) => state.talent.reviews, shallowEqual);

  return (
    <REVIEWLIST>
      {reviews.length > 0 ? (
        reviews.map((review) => {
          return <OriginalReview key={review._id} review={review} />;
        })
      ) : (
        <div>🍡 아직 남겨진 리뷰가 없습니다.</div>
      )}
    </REVIEWLIST>
  );
}

export default ReviewList;
