import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../_reducer';
import { UserState } from '../../../../_reducer/user';
import { openModal } from '../../../../_reducer/modal';
import { USERINFO, WRAPIMG, PROFILEIMG } from '../MyPageStyle';
import Withdrawal from '../../SigninPage/Withdrawal';

// 로그인방식에 따라 카카오이미지 같은거 붙이기
export default function UserInfo() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [modify, setModify] = useState<boolean>(false);
  const [nicknameCheck, setNicknameCheck] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (modify) {
      inputRef.current?.focus();
    }
  }, [modify]);

  const handleClickModify = () => {
    setModify(true);
  };

  const handleClickCheck = () => {
    if (inputRef.current && inputRef.current.value.length < 2) {
      dispatch(openModal({ type: 'error', text: '2글자 이상의 닉네임을 작성해주세요.' }));
      inputRef.current.focus();
    } else {
      // TODO: 서버에 중복체크 요청
      alert('중복체크되었습니다.');
      setNicknameCheck(true);
    }
  };

  const handleClickChangeNickname = () => {
    if (!nicknameCheck) {
      alert('닉네임 중복을 확인해주세요.');
    } else {
      // TODO:서버에 닉네임수정 요청
      alert('닉네임이 변경되었습니다.');
      setModify(false);
    }
  };

  return (
    <USERINFO>
      <WRAPIMG>
        <PROFILEIMG alt="prifileImage" src={userInfo?.image} />
      </WRAPIMG>
      <div>
        <div>
          <span>닉네임:</span>{' '}
          {modify ? (
            <span>
              <input type="text" ref={inputRef} />
              <button type="button" onClick={handleClickCheck}>
                중복확인
              </button>
              <button type="button" onClick={handleClickChangeNickname}>
                수정완료
              </button>
            </span>
          ) : (
            <span>
              {userInfo?.nickname}
              <button type="button" onClick={handleClickModify}>
                닉네임변경
              </button>
            </span>
          )}
        </div>
        <div>
          <span style={{ fontSize: '1rem' }}>email:</span>
          <span>
            <img
              alt="loginTypeImage"
              src={userInfo?.social === 'kakao' ? 'images/kakao_myinfo.png' : 'images/google_myinfo.png'}
              style={{ width: '1rem', marginRight: '4px' }}
            />
          </span>
          <span style={{ fontSize: '1rem' }}>{userInfo?.email}</span>
        </div>
        <div>
          <Withdrawal />
        </div>
      </div>
    </USERINFO>
  );
}
