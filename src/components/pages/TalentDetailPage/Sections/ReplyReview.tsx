import React, { useState } from 'react';
import getToday from '../../../../utils/getToday';

export default function ReplyReview() {
  const [text, setText] = useState<string>('');

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const today = getToday();
    console.log('서버에보낼 reply 요청', { text, date: today });
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
