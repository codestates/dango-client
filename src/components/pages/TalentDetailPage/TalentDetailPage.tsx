import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import server from '../../../api';
import { CONTAINER, SELLER, DETAIL, PHOTOS, REVIEW } from './TalentDetailPageStyle';

function TalentDetailPage(): JSX.Element {
  const [detailData, setDetailData] = useState<any>();
  const [editDetail, setEditDetail] = useState<any>();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const input = useRef<HTMLInputElement | null>(null);

  const { talentId } = useParams<{ talentId: string }>();
  const categoryList = ['홈/리빙', '비즈니스', '개발/디자인', '건강', '레슨', '반려동물', '기타'];

  useEffect(() => {
    server.get(`/talents/detail/${talentId}`).then((res) => {
      console.log(res.data);
      setDetailData(res.data);
      setEditDetail(res.data);
    });
  }, []);

  const handleClick = (): void => {
    setIsClicked(true);
  }

  const changeInput = (key: string) => (event: any) => {
    setEditDetail({
      ...editDetail,
      [key]: event.target.value 
      });
      input.current = event.target.value;
  }


  const submitEdit = (): void => {
    if(!editDetail.title || !editDetail.description) {
      alert('모든 내용을 입력해주세요!')
    } else {
      // body 넣을 예정
      server.post('/talents/edit')
      .then((response) => {
        setDetailData(response.data);
        setIsClicked(false);
      })
      .catch(()=> '');
    }
  }

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
      {isClicked ? 
         <> 
          <div>카테고리 : 
            <select onBlur={event => setEditDetail(event.target.value)}>
              {categoryList.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div> 
          가격 : <input type="number" ref={input} value={editDetail?.price} onChange={changeInput('price')} placeholder="입력값이 없으면 무료재능기부가 됩니다!"/>원
          <input ref={input} value={editDetail?.title} onChange={changeInput('title')} placeholder="제목을 입력해주세요."/> 
          <input ref={input} value={editDetail?.description} onChange={changeInput('description')} placeholder="내용을 입력해주세요."/> 
          <button type="button" onClick={submitEdit}> Complete </button> 
         </>
         : 
         <>
          <button type="button" onClick={handleClick}> Edit </button>
          <div>카테고리 : {editDetail?.category}</div>
          <div>가격 : {editDetail?.price}원</div>
          <div>{editDetail?.title}</div>
          <div>{editDetail?.description}</div>
         </>
        }
      </DETAIL>
      <PHOTOS>photos</PHOTOS>
      <REVIEW>review</REVIEW>
    </CONTAINER>
  );
}

export default TalentDetailPage;
