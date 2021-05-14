import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../../../_reducer/users/user';
import { RootState } from '../../../../_reducer';
import server from '../../../../api';

function KakaoSignOut(): JSX.Element {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: RootState) => state.user);
  const handleKakaoSignout = () => {
    const data = {
      accessToken,
    };
    server
      .post('/users/kakao/signout', data)
      .then(() => {
        dispatch(signOut());
        alert('로그아웃되었습니다.');
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.message);
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div>
      <button type="button" onClick={handleKakaoSignout}>
        Kakao Logout
      </button>
    </div>
  );
}

export default KakaoSignOut;
