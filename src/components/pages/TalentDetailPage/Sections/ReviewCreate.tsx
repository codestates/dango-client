import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../_reducer';
import { updateReview } from '../../../../_reducer/user';
import { openModal } from '../../../../_reducer/modal';
import { REVIEWCREATE } from './ReviewStyle';
import StarScore from './StarScore';
import getToday from '../../../../utils/getToday';
import server from '../../../../api';

function ReviewCreate(): JSX.Element {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user, shallowEqual);
  const { talentId, userId } = useSelector((state: RootState) => state.talent, shallowEqual);

  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);

  // 마우스가 별 위에 올라가면 스테이트를 변경.
  const onMouseEnter = (index: number) => setHoverRating(index);
  // 마우스가 별 밖으로 나가면 스테이트를 0으로 변경.
  const onMouseLeave = () => setHoverRating(0);
  // 클릭시, 별 인덱스를 스테이트에 저장.
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
            console.log(err);
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
      <div>
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
      </div>
      <textarea
        style={{ resize: 'none' }}
        placeholder="솔직한 리뷰를 작성해주세요."
        onChange={handleChangeText}
        ref={textRef}
        rows={3}
        cols={20}
      />

      <div>
        <button type="submit" onClick={handleSubmit}>
          리뷰등록
        </button>
      </div>
    </REVIEWCREATE>
  );
}

export default ReviewCreate;
