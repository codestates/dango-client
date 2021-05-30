import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { IoIosMenu, IoIosClose } from 'react-icons/io';
import { RootState } from '../../../../_reducer';
import SignOut from '../../SigninPage/Signout';

import { LINK, CONTAINER, LOGOCONTAINER, LOGO, NAV, MENUBARS } from './NavBarStyle';

function Navbar(): JSX.Element {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [disPlay, setDisPlay] = useState<boolean>(false);
  const location = useLocation();

  const list = ['지도', '채팅', '재능 등록', `${userInfo ? '마이페이지' : '로그인'}`];
  const link = ['/map', '/chatting', '/register', `${userInfo ? '/mypage' : '/signin'}`];

  const navList = list.map((li, index) => <li key={index}>{li}</li>);
  const linkList: any = link.map((li, index) => (
    <LINK
      to={li}
      key={index}
      current={location.pathname === `${li}`}
      disPlay={disPlay}
      onClick={() => setDisPlay(false)}
    >
      {navList[index]}{' '}
    </LINK>
  ));

  return (
    <CONTAINER>
      <LOGOCONTAINER>
        <Link to="/">
          <LOGO onClick={() => setDisPlay(false)}>DANGO</LOGO>
        </Link>
      </LOGOCONTAINER>
      <NAV>
        {userInfo ? (
          <>
            {linkList}
            <LINK current={false} to="signout" disPlay={disPlay}>
              <li onClick={() => setDisPlay(false)}>
                <SignOut />
              </li>
            </LINK>
          </>
        ) : (
          <>{linkList}</>
        )}
      </NAV>
      <MENUBARS onClick={() => setDisPlay(!disPlay)}>
        {disPlay ? <IoIosClose size="40" /> : <IoIosMenu size="30" />}
      </MENUBARS>
    </CONTAINER>
  );
}

export default Navbar;
