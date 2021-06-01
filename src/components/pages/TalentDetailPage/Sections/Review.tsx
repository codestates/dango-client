import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../_reducer';
import { REVIEW } from './ReviewStyle';
import ReviewList from './ReviewList';
import ReviewCreate from './ReviewCreate';

function Review(): JSX.Element {
  const { userRole } = useSelector((state: RootState) => state.talent, shallowEqual);

  return (
    <REVIEW>
      <ReviewList />
      {userRole === 'reviewer' && <ReviewCreate />}
    </REVIEW>
  );
}

export default Review;
