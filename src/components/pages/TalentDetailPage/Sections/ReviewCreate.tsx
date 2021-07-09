import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../_reducer';
import { updateReview } from '../../../../_reducer/user';
import { openModal } from '../../../../_reducer/modalSlice';
import { REVIEWCREATE, STARDIV, TEXTAREA, BUTTONDIV } from './ReviewStyle';
import StarScore from './StarScore';
import getToday from '../../../../utils/getToday';
import server from '../../../../api';
import { SSBUTTON } from '../../../../styles/Buttons';

function ReviewCreate(): JSX.Element {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user, shallowEqual);
  const { talentId, userId } = useSelector((state: RootState) => state.talent, shallowEqual);

  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);

  const onMouseEnter = (index: number) => setHoverRating(index);
  const onMouseLeave = () => setHoverRating(0);
  const onSaveRating = (index: number) => setRating(index);
  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => setReviewText(event.target.value);

  const handleSubmit = () => {
    const today = getToday();
    const data = {
      talentId,
      userId,
      review: reviewText,
      rating,
      nickname: userInfo?.nickname,
      date: today,
    };
    if (!reviewText || reviewText === '') {
      dispatch(openModal({ type: 'error', text: '리뷰를 입력해주세요.' }));
    } else {
      server
        .post('talents/review', data)
        .then(() => {
          dispatch(updateReview({ talentId }));
          dispatch(openModal({ type: 'ok', text: '리뷰가 등록되었습니다.' }));
        })
        .catch((err) => {
          if (!err.response) {
            return;
          }
          const { message } = err.response.data;
          dispatch(openModal({ type: 'error', text: message }));
        });
      setRating(0);
      setReviewText('');
      if (textRef.current) {
        textRef.current.value = '';
      }
    }
  };
  return (
    <REVIEWCREATE>
      <STARDIV>
        {[1, 2, 3, 4, 5].map((idx) => {
          return (
            <StarScore
              key={idx}
              index={idx}
              rating={rating}
              hoverRating={hoverRating}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onSaveRating={onSaveRating}
            />
          );
        })}
      </STARDIV>
      <TEXTAREA
        style={{ resize: 'none' }}
        placeholder="솔직한 리뷰를 작성해주세요."
        onChange={handleChangeText}
        ref={textRef}
        rows={3}
        cols={20}
      />

      <BUTTONDIV>
        <SSBUTTON type="submit" onClick={handleSubmit}>
          리뷰 등록
        </SSBUTTON>
      </BUTTONDIV>
    </REVIEWCREATE>
  );
}

export default ReviewCreate;
