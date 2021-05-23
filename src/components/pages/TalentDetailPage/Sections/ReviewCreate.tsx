import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../_reducer';
import { REVIEWCREATE } from './ReviewStyle';
import StarScore from './StarScore';
import getToday from '../../../../utils/getToday';

interface Props {
  role: string;
  setShow: (boolean: boolean) => void;
}
function ReviewCreate({ role, setShow }: Props): JSX.Element {
  const { userInfo } = useSelector((state: RootState) => state.user);
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
    // 서버에 리뷰 데이터 업데이트하고, then으로 talents reducer에 값 갱신하기.
    console.log('서버에 요청할 닉네임', userInfo?.nickname);
    console.log('서버에 요청할 별점', rating);
    console.log('서버에 요청할 리뷰내용', reviewText);
    const today = getToday();
    console.log('서버에 요청할 작성날짜', today);

    // TODO: 어차피 리뷰작성하면 이 컴포넌트는 안보이니까 아래는 지운다.
    // api완성되면, 해당글에 내가 리뷰를 남겼다는 흔적을 줘야함. 그걸 기준으로 부모에서 이 컴포넌트를 랜더한다.
    setRating(0);
    setShow(false);
    if (textRef.current) {
      textRef.current.value = '';
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
