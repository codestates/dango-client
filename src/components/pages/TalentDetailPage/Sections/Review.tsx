import React, { useState } from 'react';
import { REVIEW } from './ReviewStyle';
import ReviewList from './ReviewList';
import ReviewCreate from './ReviewCreate';

// CONTAINER
//  ㄴ UL 리뷰리스트
//    ㄴ LI 리뷰 하나하나
//      ㄴ DIV 리뷰INFO
//        ㄴ SPAN 리뷰 작성자 이름
//        ㄴ UL 별점 공간
//          ㄴLI 별점 이미지 하나하나
//        ㄴ SPAN 리뷰 작성 날짜
//      ㄴ DIV리뷰내용
//        ㄴ DIV 작성된 글 공간
//          ㄴ P 리뷰 작성 내용 (몇글자 / 몇줄 이상시 끊기)
//        ㄴ DIV 더보기/접기 공간
//          ㄴ SPAN 더보기/접기 (더보기 누르면 접기로 변함)
//  ㄴ DIV 리뷰입력창 (구매완료한 구매자만 뜬다. 어디서? 유저정보? 재능글 정보?)
//    ㄴ DIV 별선택
//    ㄴ INPUT TEXTAREA 리뷰입력
//    ㄴ BTN 리뷰등록

// 1. 글에 들어간다. (/detail/123456 (talentId = 123456))
// 1.2 판매자인 경우 (작성자의 id와 내 id가 같은경우)
// 1.2.1 리뷰마다 대댓글이 달려있는지 확인하는 데이터가 있다. 예를들어 ddg:{이름:순기, 내용:'구매감사합니다',날짜:2021.05.21}
// 1.2.2 ddg가 없으면 댓글과함께 답글달기 버튼을 랜더해주고, 있으면 답글내용을 랜더해준다.

// 1.3 구매자인경우 (내 유저정보 구매리스트에 있는 talentId인 경우)
// 1.3.1 글의 댓글내역에 내 유저id가있는지 확인한다?? -> 여러번 구매했을때도 딱한번밖에 댓글못달음. (거래가완료돼도 글은 삭제되지 않기때문에 똑같은 글에 여러번 구매할수있으므로)
// 1.3.2 내 댓글이없고 구매완료 상태라면, 리뷰입력창을 랜더해준다.
// 1.3.3 리뷰를 등록하면 리뷰입력창을 랜더하지않는다.
function Review(): JSX.Element {
  // TODO: 구매자인경우 userReducer에서 구매내역의 talentId의 수와
  //       talet의 review를 작성한 내userId의 개수를 비교해야함
  //       내구매내역의 talentId의 갯수 > 리뷰작성한 내 userId의 갯수이면 리뷰작성창 나와야한다.
  const [role, setRole] = useState<string>('normal');
  const [show, setShow] = useState<boolean>(true);

  return (
    <REVIEW>
      {/* 테스트버튼 */}
      <button
        type="button"
        onClick={() => {
          if (role === 'normal') setRole('seller');
          else if (role === 'seller') setRole('buyer');
          else setRole('normal');
        }}
        style={{ position: 'absolute', bottom: 20, right: 20 }}
      >
        현재role:{role}
      </button>
      <ReviewList role={role} />
      {role === 'buyer' && show && <ReviewCreate role={role} setShow={setShow} />}
    </REVIEW>
  );
}

export default Review;
