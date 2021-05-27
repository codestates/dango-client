import React, { useState, useRef } from 'react';

interface Props {
  callback: (string: string) => void;
}

function MessageInput({ callback }: Props): JSX.Element {
  const [message, setMessage] = useState<string>('');
  const messageInputTag = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.MouseEvent): void => {
    event.preventDefault();
    callback(message);
    messageInputTag?.current?.reset();
  };

  return (
    <form ref={messageInputTag} className="messageInputForm">
      <input
        className="messageInput"
        type="text"
        placeholder="메세지를 입력해주세요"
        onChange={(event) => setMessage(event.target.value)}
      />
      <button className="submitButton" type="submit" onClick={handleSubmit} disabled={message === ''}>
        Submit
      </button>
    </form>
  );
}

export default MessageInput;
