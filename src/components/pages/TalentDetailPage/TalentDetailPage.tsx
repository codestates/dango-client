// talent detail
import React from 'react';
import styled from 'styled-components';
import Review from './Sections/Review';
import TalentContent from './Sections/TalentContent';

const PAGECONTAINER = styled.div`
  display: flex;
  height: 100vh;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

// 여기서 해당 글의 정보를 서버에서 받고, 리덕스에 저장한다.
// 서버요청의 useEffect의 deps배열안에는 변할수 있는 상태를 넣어준다.
// 어떤걸 넣어줄까. 유저닉네임, 리뷰목록,거래완료?
// FIXME:
/*  talent Reducer = {talentId:'', seller: id, buyer:[id,id,id], 
 랜더에필요한내용들, review: {[ id,닉네임,별점,날짜,내용,reply:{ 닉네임, 내용, 날짜 } ], [...], [...]} 
 } */
// user reducer에 role추가. normal, seller, buyer

// TODO: 구매자인경우 userReducer에서 구매내역의 talentId의 수와
//       talet의 review를 작성한 내userId의 개수를 비교해야함
//       내구매내역의 talentId의 갯수(또는 talent의 buyer안의 내 userId 갯수) > 리뷰작성한 내 userId의 갯수이면 리뷰작성창 나와야한다.

function TalentDetailPage(): JSX.Element {
  return (
    <PAGECONTAINER>
      <TalentContent />
      <Review />
    </PAGECONTAINER>
  );
}

export default TalentDetailPage;
