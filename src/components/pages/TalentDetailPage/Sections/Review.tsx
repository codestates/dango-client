import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../../_reducer';
import { updateUnreviewed } from '../../../../_reducer/user';
import { REVIEW } from './ReviewStyle';
import ReviewList from './ReviewList';
import ReviewCreate from './ReviewCreate';

function Review(): JSX.Element {
  const { userRole } = useSelector((state: RootState) => state.talent, shallowEqual);

  // for test
  const dispatch = useDispatch();
  const { talentId } = useParams<{ talentId: string }>();
  const handleTest = () => dispatch(updateUnreviewed({ talentId }));

  return (
    <REVIEW>
      {/* 테스트버튼 */}
      <div style={{ position: 'absolute', bottom: 20, right: 20 }}>현재role:{userRole}</div>
      <div style={{ position: 'absolute', bottom: 20, right: 300 }} onClick={handleTest}>
        클릭하면 unreviewd로
      </div>

      <ReviewList />
      {userRole === 'reviewer' && <ReviewCreate />}
    </REVIEW>
  );
}

export default Review;
