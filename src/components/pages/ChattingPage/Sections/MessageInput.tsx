import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as SendSvg } from '../../../../images/chatSend.svg';
import { openModal } from '../../../../_reducer/modal';

const INPUTDIV = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background-color: white;
`;
const TEXT = styled.input`
  height: 100%;
  flex: 8;
  outline: unset;
  border: none;
  padding-left: 1vw;
`;
const SUBMIT = styled(SendSvg)`
  flex: 1;
  height: 2vw;
  cursor: pointer;
  min-width: 1.2rem;
  min-height: 1.2rem;
  fill: ${({ theme }) => theme.colors.purple};

  &:hover {
    fill: #fa697c;
  }
  &:active {
    fill: ${({ theme }) => theme.colors.lightpurple};
  }
`;

interface Props {
  callback: (string: string) => void;
}

function MessageInput({ callback }: Props): JSX.Element {
  const [message, setMessage] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleSubmit = (): void => {
    if (message === '') {
      dispatch(openModal({ type: 'error', text: '메시지를 입력해주세요!' }));
    } else {
      callback(message);
      if (inputRef.current) {
        inputRef.current.value = '';
        setMessage('');
      }
    }
  };

  const handleEnterKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
      event.preventDefault();
    }
  };

  return (
    <INPUTDIV className="messageInputForm">
      <TEXT
        ref={inputRef}
        className="messageInput"
        placeholder="메시지를 입력해주세요"
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={handleEnterKey}
      />
      <SUBMIT onClick={handleSubmit} />
    </INPUTDIV>
  );
}

export default MessageInput;
