import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { RootState } from '../_reducer';
import { OpenPayload, ModalState, openModal, closeModal } from '../_reducer/modal';
import { ReactComponent as CrossSvg } from '../images/cross.svg';
import { ReactComponent as CheckSvg } from '../images/check.svg';
import { ReactComponent as DangerSvg } from '../images/danger.svg';

interface ModalProps {
  okFunction: () => any;
  cancleFunction: any;
}
export default function Modal({ okFunction, cancleFunction = undefined }: ModalProps): JSX.Element {
  const dispatch = useDispatch();
  const { open, type, text } = useSelector((state: RootState) => state.modal, shallowEqual);

  const handleOpenClick = () => {
    const payload: OpenPayload = {
      type: 'danger',
      text: '닉네임은 두글자 이상 작성해주세요.',
    };
    console.log('클릭전 open?', open);
    dispatch(openModal(payload));
  };
  const handleCloseClick = () => {
    console.log('클릭전 open?', open);

    dispatch(closeModal());
  };

  return (
    <>
      <MODALBACKGROUND open={open} />

      <MODAL open={open}>
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
                <OKBUTTON
                  onClick={() => {
                    okFunction();
                    dispatch(closeModal());
                  }}
                >
                  확인
                </OKBUTTON>
                <CANCLEBUTTON
                  onClick={() => {
                    cancleFunction();
                    dispatch(closeModal());
                  }}
                >
                  취소
                </CANCLEBUTTON>
              </>
            ) : (
              <OKBUTTON
                onClick={() => {
                  okFunction();
                  dispatch(closeModal());
                }}
              >
                확인
              </OKBUTTON>
            )}
          </BUTTONBOX>
        </BODY>
      </MODAL>

      <button type="button" onClick={handleOpenClick} style={{ zIndex: 1 }}>
        open
      </button>
      <button type="button" onClick={handleCloseClick} style={{ zIndex: 1 }}>
        close
      </button>
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
`;

const MODAL = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  animation: ${showModal} 0.5s forwards;
  width: 25vw;
  min-width: 200px;
  height: 30vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #ab8ce4;
  border-radius: 5%;
  background-color: white;
  z-index: 2;
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

const BODY = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0px 10px;
`;
const TEXT = styled.div`
  color: grey;
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
  width: 30%;
  color: whitesmoke;
`;
const CANCLEBUTTON = styled(OKBUTTON)`
  background-color: #b1c3c8;
  border: 1px solid #b1c3c8;
`;

const CHECKSVG = styled(CheckSvg)`
  width: 50%;
  height: 50%;
`;
const CROSSSVG = styled(CrossSvg)`
  width: 50%;
  height: 50%;
`;
const DANGERSVG = styled(DangerSvg)`
  width: 50%;
  height: 50%;
`;
