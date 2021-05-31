import React from 'react';
import Modal from '../../../utils/modal';

import { STRUCTURE, TITLECONTAINER, HELLO, TITLE } from './LandingPageStyle';

// 대략적인 생각
// Say Hello to  /  DANGO(동그라미 3개 또로롱)
// 누구나 재능은 있다.
// DANGO는 누구나 자신만의 재능을 가지고 있다는 생각에서 출발했습니다.
// 나만의 재능을 당신의 근처 이웃들과 서로 나눠보세요!

// DANGO는 내가 있는 위치를 기반으로 우리 동네 고수들의 재능을 볼 수 있습니다.(지도페이지)

// 실시간으로 해당 고수와 연락해 이웃과 재능 공유를 할 수 있습니다.(채팅페이지)

// 사소한 재능이라도 좋습니다. 이웃과 함께 할 수 있는 재능이라면 그 재능은 이미 훌륭한 재능입니다.(재능 등록, 상세)

// 당신의 근처를 따뜻하게 만들 준비가 되셨나요? 지금 바로 시작해보세요!(로그인)

function LandingPage(): JSX.Element {
  return (
    <>
      <Modal />
      {/* <STRUCTURE>🚧 🚧 🚧 랜딩페이지 공사 중 🚧 🚧 🚧</STRUCTURE> */}
      <TITLECONTAINER>
        <HELLO>Say Hello to</HELLO>
        <TITLE>DANGO!</TITLE>
      </TITLECONTAINER>
    </>
  );
}

export default LandingPage;
