import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as SendSvg } from '../../../../images/chatSend.svg';
import { openModal } from '../../../../_reducer/modal';

const INPUTFORM = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background-color: white;
`;
const TEXT = styled.input`
  height: 100%;
  flex: 8;
  border: none;
  padding-left: 1vw;
`;
const SUBMIT = styled(SendSvg)`
  flex: 1;
  /* border: none; */
  height: 2vw;
  cursor: pointer;
  /* border-radius: 3px; */
`;

interface Props {
  callback: (string: string) => void;
}

function MessageInput({ callback }: Props): JSX.Element {
  const [message, setMessage] = useState<string>('');
  const messageInputTag = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();

  const handleSubmit = (event: React.MouseEvent): void => {
    if (message === '') {
      dispatch(openModal({ type: 'ok', text: '메시지를 입력해주세요!' }));
    } else {
      event.preventDefault();
      callback(message);
      messageInputTag.current?.reset();
    }
  };

  return (
    <INPUTFORM ref={messageInputTag} className="messageInputForm">
      <TEXT
        className="messageInput"
        placeholder="메세지를 입력해주세요"
        onChange={(event) => setMessage(event.target.value)}
      />
      <SUBMIT className="submitButton" type="submit" onClick={handleSubmit} fill="#DEDCEE" />
    </INPUTFORM>
  );
}

export default MessageInput;
