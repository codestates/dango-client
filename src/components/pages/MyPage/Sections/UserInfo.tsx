import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../_reducer';
import { modifyNickname } from '../../../../_reducer/user';
import { openModal } from '../../../../_reducer/modal';
import Withdrawal from '../../SigninPage/Withdrawal';
import server from '../../../../api';
import validateNickname from '../../../../utils/validateNickname';
import getToday from '../../../../utils/getToday';
import {
  HELLO,
  HELLO_TEXT,
  PURPLE,
  PROFILE_BOX,
  USERINFO,
  WRAPIMG,
  PROFILEIMG,
  INFO,
  NICKNAME_BOX,
  EMAIL,
  NICKNAME,
  NICKNAME_INPUT,
  NICKNAME_MODIFYBOX,
  MODIFY_BUTTON,
  MODIFYCHECK_BUTTON,
  MODIFY_ESC_BUTTON,
  WITHDRAWAL_BOX,
  MOBILE_BUTTON,
  OPEN_SELL_BUTTON,
  OPEN_PURCHASE_BUTTON,
} from './UserInfoStyle';

interface Props {
  setShowSell: (show: boolean) => void;
  setShowPurchase: (show: boolean) => void;
}
export default function UserInfo({ setShowSell, setShowPurchase }: Props): JSX.Element {
  const dispatch = useDispatch();
  const { userInfo, accessToken } = useSelector((state: RootState) => state.user, shallowEqual);
  const [modifyMode, setModifyMode] = useState<boolean>(false);
  const [nicknameCheck, setNicknameCheck] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (modifyMode) {
      inputRef.current?.focus();
    }
  }, [modifyMode]);

  const handleClickModify = () => {
    const data = {
      social: userInfo?.social,
    };
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    // 본인이 맞는지 확인
    server
      .post('/users/validate', data, config)
      .then(() => setModifyMode(true))
      .catch((err) => {
        if (!err.response) {
          console.log(err);
        }
        dispatch(openModal({ type: 'error', text: err.response.data.message }));
      });
  };

  const handleClickEscape = () => {
    setModifyMode(false);
    if (inputRef.current && userInfo) {
      inputRef.current.value = userInfo.nickname;
    }
  };

  const handleNicknameCheck = () => {
    if (inputRef.current) {
      if (validateNickname(inputRef.current.value) !== '통과') {
        dispatch(openModal({ type: 'error', text: validateNickname(inputRef.current.value) }));
        setNicknameCheck(false);
        inputRef.current.focus();
      } else {
        // 서버에 닉네임 중복체크 요청
        const data = { nickname: inputRef.current?.value };
        server
          .post('/users/doublecheck', data)
          .then((response) => {
            dispatch(openModal({ type: 'ok', text: response.data.message }));
            setNicknameCheck(true);
          })
          .catch((err) => {
            setNicknameCheck(false);
            if (!err.response) {
              console.log(err);
              return;
            }
            dispatch(openModal({ type: 'error', text: err.response.data.message }));
          });
      }
    }
  };

  const handleClickChangeNickname = () => {
    if (!nicknameCheck) {
      dispatch(openModal({ type: 'error', text: '유효한 닉네임을 입력해주세요.' }));
    } else {
      // 서버에 닉네임수정 요청
      const data = { userId: userInfo?.id, nickname: inputRef.current?.value };
      server
        .post('/users/edit', data)
        .then((response) => {
          const { nickname } = response.data;
          dispatch(modifyNickname({ nickname }));
          dispatch(openModal({ type: 'ok', text: '닉네임이 변경되었습니다.' }));
          setModifyMode(false);
        })
        .catch((err) => {
          setNicknameCheck(false);
          if (!err.response) {
            console.log(err);
            return;
          }
          dispatch(openModal({ type: 'error', text: err.response.data.message }));
        });
    }
  };

  return (
    <USERINFO>
      <HELLO>
        <HELLO_TEXT>
          반갑습니다 <PURPLE>{userInfo?.nickname}</PURPLE>님,
        </HELLO_TEXT>
        <HELLO_TEXT>
          {getToday('weekend')}도 <PURPLE>DANGO</PURPLE>와 함께!
        </HELLO_TEXT>
      </HELLO>
      <PROFILE_BOX>
        <WRAPIMG>
          <PROFILEIMG alt="prifileImage" src={userInfo?.image} />
        </WRAPIMG>{' '}
        <NICKNAME_BOX>
          <NICKNAME modify={modifyMode}>
            <NICKNAME_INPUT
              type="text"
              maxLength={8}
              ref={inputRef}
              disabled={!modifyMode}
              defaultValue={userInfo?.nickname}
            />
            {!modifyMode ? (
              <MODIFY_BUTTON onClick={handleClickModify} />
            ) : (
              <MODIFY_ESC_BUTTON onClick={handleClickEscape}>✕</MODIFY_ESC_BUTTON>
            )}
            {modifyMode && (
              <NICKNAME_MODIFYBOX>
                <MODIFYCHECK_BUTTON type="button" onClick={handleNicknameCheck}>
                  중복확인
                </MODIFYCHECK_BUTTON>
                <MODIFYCHECK_BUTTON type="button" onClick={handleClickChangeNickname}>
                  수정완료
                </MODIFYCHECK_BUTTON>
              </NICKNAME_MODIFYBOX>
            )}
          </NICKNAME>
        </NICKNAME_BOX>
      </PROFILE_BOX>
      <INFO>
        <EMAIL>
          <span>
            <img
              alt="loginTypeImage"
              src={userInfo?.social === 'kakao' ? 'images/kakao_myinfo.png' : 'images/google_myinfo.png'}
              style={{ width: '1rem', marginRight: '4px' }}
            />
          </span>
          <span>{userInfo?.email}</span>
        </EMAIL>
        <WITHDRAWAL_BOX>
          <Withdrawal />
        </WITHDRAWAL_BOX>
      </INFO>
      <MOBILE_BUTTON>
        <OPEN_SELL_BUTTON onClick={() => setShowSell(true)}>판매 목록</OPEN_SELL_BUTTON>
        <OPEN_PURCHASE_BUTTON onClick={() => setShowPurchase(true)}>구매 목록</OPEN_PURCHASE_BUTTON>
      </MOBILE_BUTTON>
    </USERINFO>
  );
}
