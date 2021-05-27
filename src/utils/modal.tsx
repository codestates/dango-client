import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { RootState } from '../_reducer';
import { closeModal } from '../_reducer/modal';
import { ReactComponent as CrossSvg } from '../images/cross.svg';
import { ReactComponent as CheckSvg } from '../images/check.svg';
import { ReactComponent as DangerSvg } from '../images/danger.svg';

// 사용법
// 페이지별 루트컴포넌트에 <Modal />을 불러오면 된다.
// ok버튼이나 모달창을 닫을때 따로 실행시키고싶은 함수가있다면 dispatch 시, 콜백네임을 추가해줘야한다.
// dispatch(openModal({type,text,callbackName})) 처럼 callbackName에 스트링으로 이름을 넣어준다음에
// 아래의 okCallback이나 cancleCallback에
// callbackName === '어쩌구' 일때를 조건으로 실행시키고싶은 함수를 작성해준다.

export default function Modal(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const { open, type, text, callbackName } = useSelector((state: RootState) => state.modal, shallowEqual);

  const okCallback = () => {
    dispatch(closeModal());
    if (callbackName) {
      // OK클릭시 실행할 콜백들 작성
      if (callbackName === 'withdrawal') {
        history.push('/');
      }
    }
  };
  const cancleCallback = () => {
    dispatch(closeModal());
    if (callbackName) {
      // 취소 또는 모달창 끌때 실행할 콜백들 작성
      if (callbackName === 'withdrawal') {
        history.push('/');
      }
    }
  };
  return (
    <>
      <MODALBACKGROUND open={open} onClick={cancleCallback} />

      <MODAL open={open}>
        <ESCAPE onClick={cancleCallback}>✕</ESCAPE>
        <HEADER>
          {type === 'ok' ? (
            <CHECKSVG fill="white" />
          ) : type === 'error' ? (
            <CROSSSVG fill="white" />
          ) : (
            <DANGERSVG fill="white" />
          )}
        </HEADER>
        <BODY>
          <TEXT>{text}</TEXT>
          <BUTTONBOX>
            {type === 'danger' ? (
              <>
                <OKBUTTON onClick={okCallback}>확인</OKBUTTON>
                <CANCLEBUTTON onClick={cancleCallback}>취소</CANCLEBUTTON>
              </>
            ) : (
              <OKBUTTON onClick={okCallback}>확인</OKBUTTON>
            )}
          </BUTTONBOX>
        </BODY>
      </MODAL>
    </>
  );
}

const showModal = keyframes`
  from {
    opacity: 0.5;
    transform: translate(-50%, -40%);
  }
  to{
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

const MODALBACKGROUND = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? 'block' : 'none')};
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
`;

const MODAL = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  animation: ${showModal} 0.5s forwards;
  width: 25vw;
  min-width: 30vh;
  height: 30vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #ab8ce4;
  border-radius: 5%;
  background-color: white;
  z-index: 10;
  box-shadow: 4px 4px 2px 1px rgba(0, 0, 255, 0.2);
  overflow: hidden;
`;

const HEADER = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ab8ce4;
  border: 1px solid #ab8ce4;
  overflow: hidden;
  width: 100%;
  flex: 1;
`;

const ESCAPE = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: whitesmoke;
  font-size: 1.2rem;
  cursor: pointer;
`;

const BODY = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0px 10px;
`;
const TEXT = styled.p`
  color: grey;
  white-space: pre-wrap;
  text-align: center;
`;

const BUTTONBOX = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const OKBUTTON = styled.button`
  cursor: pointer;
  background-color: #ab8ce4;
  border: 1px solid #ab8ce4;
  border-radius: 7px;
  width: 35%;
  color: whitesmoke;
`;
const CANCLEBUTTON = styled(OKBUTTON)`
  background-color: #b1c3c8;
  border: 1px solid #b1c3c8;
`;

const CHECKSVG = styled(CheckSvg)`
  width: 60%;
  height: 60%;
`;
const CROSSSVG = styled(CrossSvg)`
  width: 60%;
  height: 60%;
`;
const DANGERSVG = styled(DangerSvg)`
  width: 60%;
  height: 60%;
`;
