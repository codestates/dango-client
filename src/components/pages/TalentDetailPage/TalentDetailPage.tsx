import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Review from './Sections/Review';
import server from '../../../api';
import { CONTAINER, SELLER, DETAIL, PHOTOS } from './TalentDetailPageStyle';

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
  const [detailData, setDetailData] = useState<any>();

  const { talentId } = useParams<{ talentId: string }>();

  useEffect(() => {
    server.get(`/talents/detail/${talentId}`).then((res) => {
      console.log(res.data);
      setDetailData(res.data);
    });
  }, []);

  return (
    <CONTAINER>
      <SELLER>
        <img src={detailData?.userInfo.socialData.image} alt="프로필사진" />
        <div>{detailData?.userInfo.nickname}</div>
        <div>{detailData?.address}</div>
        <div>별점 평균 : {detailData?.ratings[0] ?? '별점 없음'}</div>
        <div>고용 횟수 : {detailData?.ratings[1] ?? '0'}회</div>
        <button type="button">채팅으로 거래하기</button>
      </SELLER>
      <DETAIL>
        <div>카테고리 : {detailData?.category}</div>
        <div>가격 : {detailData?.price}원</div>
        <div>{detailData?.title}</div>
        <div>{detailData?.description}</div>
      </DETAIL>
      <PHOTOS>photos</PHOTOS>
      <Review />
    </CONTAINER>
  );
}

export default TalentDetailPage;
