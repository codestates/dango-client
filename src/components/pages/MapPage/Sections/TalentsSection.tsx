import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import server from '../../../../api/index';

const CONTAINER = styled.div`
  display: grid;
  grid-column: 5/7;
  border: 1px solid black;
`;

const FILTERSECTION = styled.div`
  grid-row: 1/2;
  border: 1px solid black;
`;

const TALENTSLIST = styled.div`
  display: grid;
  grid-row: 2/4;
  border: 1px solid black;
`;

const TALENT = styled.div`
  border: 1px solid black;
`;

const CATEGORY = styled.div`
  border: 1px solid black;
`;

const NICKNAME = styled.div`
  border: 1px solid black;
`;

const RATINGS = styled.div`
  border: 1px solid black;
`;

const RATINGSCOUNT = styled.div`
  border: 1px solid black;
`;

const PRICE = styled.div`
  border: 1px solid black;
`;

const TITLE = styled.div`
  border: 1px solid black;
`;

/* TODO:
 [v] 1. 전체 리스트 렌더 
 [ ] 2. radiobox(sort) 렌더
 [ ] 3. checkbox(filter) 렌더
 [ ] 4. 지도 마커랑..
 [ ] 5. 카테고리 이모지, 별점 범위로 렌더
*/

/**
 * 1. 전체 리스트 렌더
 * 1-1. axios.get으로 서버에서 모든 데이터를 요청한다. (FIXME: 필터정보, 소트 정보는 어떻게 보내는거지?)
 * 1-2. 받아온 데이터를 렌더한다.
 */

/**
 * 2. radiobox(sort) 렌더
 * 유저가 가격순을 눌렀어. 그러면 누른 타겟을 토대로 그 value를 읽어서
 * body의 sort 키에 'price'  ||  'ratings'  ||  'review'를 넣어 보낸다.
 * FIXME: 전체 옵션을 넣어야하나?
 */

/* 3. checkbox(filter)
각 카테고리마다 id와 이름을 지정해놓는다. (데이터 파일에)
체크가 눌렸을 때 어떤 id인지 파악한다.
그 id의 카테고리들을 달라고 서버로 요청 보낸다!


*/

interface TalentsListInterface {
  category: string;
  title: string;
  price: number;
  nickname: string;
  ratings: number;
  ratingsCount: number;
  _id: string;
}

const sortData = [
  {
    id: 'price',
    name: '가격순',
  },
  {
    id: 'ratings',
    name: '별점순',
  },
  {
    id: 'review',
    name: '고용횟수순',
  },
];

function TalentsSection() {
  const [talentsList, setTalentsList] = useState<TalentsListInterface>();
  // radioValue는 sort 정보 보낼 때 쓴다.
  const [radioValue, setRadioValue] = useState<string>('');

  const handleSortChange = (event: any) => {
    console.log(event.target.value);
    setRadioValue(event.target.value);
  };

  const config = {
    data: {
      category: 'all',
      location: [100, 200],
      width: [10, 40],
    },
  };

  // 서버에 재능 리스트 요청
  useEffect(() => {
    server
      .get('/talents/map', config)
      .then((res) => {
        console.log('res:::', res);
        setTalentsList(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <CONTAINER>
      <FILTERSECTION>
        {sortData.map((ele) => (
          <div key={ele.id} onChange={handleSortChange}>
            <input type="radio" id={ele.id} name="sort" value={ele.id} />
            <label htmlFor={ele.id}>{ele.name}</label>
          </div>
        ))}
      </FILTERSECTION>
      <TALENTSLIST>
        <TALENT>
          <CATEGORY>카테고리{talentsList?.category}</CATEGORY>
          <TITLE>재능 글 제목{talentsList?.title}</TITLE>
          <PRICE>가격{talentsList?.price}</PRICE>
          <NICKNAME>닉네임{talentsList?.nickname}</NICKNAME>
          <RATINGS>별점 평균{talentsList?.ratings}</RATINGS>
          <RATINGSCOUNT>리뷰 개수{talentsList?.ratingsCount}</RATINGSCOUNT>
        </TALENT>
        <TALENT>TALENT</TALENT>
        <TALENT>TALENT</TALENT>
      </TALENTSLIST>
    </CONTAINER>
  );
}
export default TalentsSection;
