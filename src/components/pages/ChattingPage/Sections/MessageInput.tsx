import React, { useState, useRef, Dispatch, SetStateAction } from 'react';


interface Props {
    setsendChats: Dispatch<SetStateAction<string>>
};

function MessageInput({ setsendChats }: Props): JSX.Element {
    const [message, setMessage] = useState<string>('');
    const messageInputTag = useRef<HTMLFormElement>(null);

    const handleSubmit = (event:React.MouseEvent):void => {
        event.preventDefault();
        setsendChats(message);
        setMessage('');
        messageInputTag?.current?.reset();
    };

    return (
        <form ref={messageInputTag} className="messageInputForm">
            <input className="messageInput" type="text" placeholder="메세지를 입력해주세요" onChange={event => setMessage(event.target.value)} />
            <button className="submitButton" type="submit" onClick={handleSubmit} disabled={message === ''}>
                Submit
            </button>
        </form>
    );
};

export default MessageInput;