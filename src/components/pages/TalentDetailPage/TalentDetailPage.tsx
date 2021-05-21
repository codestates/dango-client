import React, { useState, useEffect } from 'react';
import server from '../../../api';
import { CONTAINER, SELLER, DETAIL, PHOTOS, REVIEW } from './TalentDetailPageStyle';

function TalentDetailPage() {
  const [detailData, setDetailData] = useState<any>();

  useEffect(() => {
    server.get('/talents/detail/60a5c5ea35cfa506fbb9bebc').then((res) => {
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
      </SELLER>
      <DETAIL>
        <div>카테고리 : {detailData?.category}</div>
        <div>가격 : {detailData?.price}원</div>
        <div>{detailData?.title}</div>
        <div>{detailData?.description}</div>
      </DETAIL>
      <PHOTOS>photos</PHOTOS>
      <REVIEW>review</REVIEW>
    </CONTAINER>
  );
}

export default TalentDetailPage;
