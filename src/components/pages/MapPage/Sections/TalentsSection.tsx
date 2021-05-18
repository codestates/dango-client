import React, { useState, useEffect } from 'react';
import server from '../../../../api/index';
import {
  CONTAINER,
  FILTERSECTION,
  TALENTSLIST,
  TALENT,
  CATEGORY,
  NICKNAME,
  RATINGS,
  RATINGSCOUNT,
  PRICE,
  TITLE,
} from './TalentsSectionStyle';

/* TODO:
 [ ] 1. 전체 리스트 렌더 
 [v] 2. radiobox(sort) 렌더
 [v] 3. checkbox(filter) 렌더
 [ ] 4. 지도 마커랑..
 [ ] 5. 카테고리 이모지, 별점 범위로 렌더
*/

/**
 * 1. 전체 리스트 렌더
 * 1-1. 부모(MapPage)가 서버로부터 받아온 데이터를 props로 내려 받아 렌더한다.
 * 1-2. map으로 돌린다.
 */

/**
 * 2. radiobox(sort) 렌더
 * 유저가 가격순을 눌렀어. 그러면 누른 타겟을 토대로 그 value를 읽어서
 * body의 sort 키에 'price'  ||  'ratings'  ||  'review'를 넣어 보낸다.
 * FIXME: 전체 옵션을 넣어야하나?
 */

/*
 * 3. checkbox(filter) 렌더 (FIXME: 서버가 어떻게 달라고 하는지에 따라..)
 * 처음 체크박스를 눌렀으면 배열에 푸쉬한다.
 * 한 번 더 누르면 그 값은 받지 않는다. - 눌려있는지를 파악하고 한 번 더 누르면 배열에서 뺀다.
 * 하나 눌러진 상태에서 다른 거 또 체크하면 기존 배열에 추가한다.
 */

/**
 * 4. 재능 리스트 클릭 시 프리뷰 모달 띄우기
 * 프리뷰 모달은 마커를 클릭 했을 때 뜨는데..
 * TODO: 재능 리스트 클릭 ==> 마커 클릭 인식하게.. 해야하나.. how..?
 */

/**
 * 5. 별점 범위 설정
 * 받아온 별점 평균을 반올림처리한다.
 * 4.75 <= x <= 5.0 ==> 5.0 ==> ⭐️⭐️⭐️⭐️⭐️
 * 4.25 <= x < 4.75 ==> 4.5
 * 3.75 <= x < 4.25 ==> 4.0 ==> ⭐️⭐️⭐️⭐️
 * State 하나 새로 만들어서 바꿔줘야하나? 별 이모지 자체는 여기서만 쓴다? (모달에서도 쓸 수 있긴 함..)
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

const filterData = [
  {
    id: 1,
    value: 'pet',
    name: '반려동물',
  },
  {
    id: 2,
    value: 'lesson',
    name: '레슨',
  },
];

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
  const [checkBoxList, setCheckBoxList] = useState<number[]>([]);
  // radioValue는 sort 정보 보낼 때 쓴다.
  const [radioValue, setRadioValue] = useState<string>('');

  const handleFilterChange = (currentValue: any) => {
    const currentIndex = checkBoxList.indexOf(currentValue);

    const newCheckBoxList = [...checkBoxList];

    if (currentIndex === -1) {
      newCheckBoxList.push(currentValue);
    } else {
      newCheckBoxList.splice(currentIndex, 1);
    }

    setCheckBoxList(newCheckBoxList);
    console.log(newCheckBoxList);
  };

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
        {filterData.map((ele) => (
          <div key={ele.id} onChange={() => handleFilterChange(ele.id)}>
            <input
              type="checkbox"
              id={ele.value}
              name={ele.value}
              value={ele.value}
              checked={checkBoxList.indexOf(ele.id) !== -1}
            />
            <label htmlFor={ele.value}>{ele.name}</label>
          </div>
        ))}
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
