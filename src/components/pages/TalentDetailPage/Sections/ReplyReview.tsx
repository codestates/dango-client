import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../_reducer';
import { updateReply } from '../../../../_reducer/talent';
import getToday from '../../../../utils/getToday';
import server from '../../../../api';

interface ReplyReviewProps {
  reviewId: string;
}

export default function ReplyReview({ reviewId }: ReplyReviewProps) {
  const dispatch = useDispatch();
  const { talentId, userId } = useSelector((state: RootState) => state.talent);
  const [text, setText] = useState<string>('');

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const today = getToday();

    const data = {
      talentId,
      userId,
      reviewId,
      replyDescription: text,
      replyDate: today,
    };
    server.post('/talents/reply', data).then((response) => {
      console.log('리뷰답글등록response.data', response.data);
      dispatch(updateReply({ reviewId, replyDescription: text, replyDate: today }));
    });
  };

  return (
    <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
      <textarea style={{ resize: 'none', borderRadius: '5px' }} onChange={handleChangeText} />
      <button type="submit" onClick={handleSubmit}>
        답글등록
      </button>
    </form>
  );
}
