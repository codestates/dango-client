import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../_reducer';
import { handleSort, handleFilter, MapState } from '../../../../_reducer/map';
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
 [ ] 1. 리덕스에서 데이터 꺼내서 렌더 - useSelector
 [v] 2. radiobox(sort) 렌더
 [v] 3. checkbox(filter) 렌더
 [x] 4. 재능 리스트 클릭 시 프리뷰 모달 띄우기
 [ ] 5. 카테고리 이모지, 별점 범위로 렌더
 [v] 6. reducer 만들기
 [v] 7. filter 체크리스트 숫자를 카테고리 스트링으로 바꿔줘야 함.
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
 * sort 안 하면 기본적으로 거리순으로 정렬된 데이터.
 * FIXME: radiobox는 해제가 안되니까 전체옵션 필요할듯
 */

/**
 * 4. 재능 리스트 클릭 시 프리뷰 모달 띄우기
 * 프리뷰 모달 infowindow은 마커를 클릭 했을 때 뜨는데..
 * TODO: 재능 리스트 클릭 시 infowindow.open
 */

/**
 * 5. 별점 범위 설정
 * 받아온 별점 평균을 반올림처리한다.
 * 4.75 <= x <= 5.0 ==> 5.0 ==> ⭐️⭐️⭐️⭐️⭐️
 * 4.25 <= x < 4.75 ==> 4.5
 * 3.75 <= x < 4.25 ==> 4.0 ==> ⭐️⭐️⭐️⭐️
 * State 하나 새로 만들어서 바꿔줘야하나? 별 이모지 자체는 여기서만 쓴다
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
    value: 'business',
    name: '비즈니스',
  },
  {
    id: 2,
    value: 'coding',
    name: '개발/디자인',
  },
  {
    id: 3,
    value: 'health',
    name: '건강',
  },
  {
    id: 4,
    value: 'lesson',
    name: '레슨',
  },
  {
    id: 5,
    value: 'living',
    name: '홈/리빙',
  },
  {
    id: 6,
    value: 'pet',
    name: '반려동물',
  },
  {
    id: 7,
    value: 'etc',
    name: '기타',
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
interface MapSectionProps {
  map: any;
  setMap: (map: any) => void;
  infoWindowGroup: any[];
  setInfoWindowGroup: (infoWindowGroup: any) => void;
}

function TalentsSection({ map, setMap, infoWindowGroup, setInfoWindowGroup }: MapSectionProps): JSX.Element {
  const dispatch = useDispatch();
  const { filter, talentData } = useSelector((state: RootState) => state.map);
  const [talentsList, setTalentsList] = useState<TalentsListInterface>();

  // const [open, setOpen] = useState<boolean>(false);

  // checkbox(filter)
  const handleCheckBox = (currentValue: any) => {
    // null의 indexOf 못하므로 기본 설정.
    if (filter === null) {
      const payload: MapState = {
        filter: [],
      };
      dispatch(handleFilter(payload));
    }
    // 이전의 배열(체크리스트)을 불러온다. 그 배열에서 현재 체크된 것의 인덱스를 알아낸다.
    console.log('filter', filter);
    const currentIndex = filter.indexOf(currentValue);
    // 배열 복사.
    const newCheckBoxList = [...filter];
    // 기존 배열에 없는 값이면 새로 값을 푸쉬, 있는 값이면 삭제.
    if (currentIndex === -1) {
      newCheckBoxList.push(currentValue);
    } else {
      newCheckBoxList.splice(currentIndex, 1);
    }
    // 변화된 배열을 저장한다! 이걸로 filter에 담아서 서버에 요청 보내야 함.
    const payload: MapState = {
      filter: newCheckBoxList,
    };
    dispatch(handleFilter(payload));

    console.log(newCheckBoxList);
  };

  // radiobox(sort)
  const handleRadioBox = (event: any) => {
    console.log(event.target.value);
    const payload: MapState = {
      sort: event.target.value,
    };
    dispatch(handleSort(payload));
  };

  // useEffect(() => {
  //   if (infoWindowGroup.length > 0) {
  //     setOpen(true);
  //   }
  // }, [infoWindowGroup]);

  return (
    <CONTAINER>
      <FILTERSECTION>
        {filterData.map((ele) => (
          <div key={ele.id} onChange={() => handleCheckBox(ele.value)}>
            <input
              type="checkbox"
              id={ele.value}
              name={ele.value}
              value={ele.value}
              checked={filter.indexOf(ele.value) !== -1}
            />
            <label htmlFor={ele.value}>{ele.name}</label>
          </div>
        ))}
        {sortData.map((ele) => (
          <div key={ele.id} onChange={handleRadioBox}>
            <input type="radio" id={ele.id} name="sort" value={ele.id} />
            <label htmlFor={ele.id}>{ele.name}</label>
          </div>
        ))}
      </FILTERSECTION>
      <TALENTSLIST>
        <TALENT>
          {/* {open && (
            <div style={{ position: 'absolute', zIndex: 99, top: '100px' }}>{infoWindowGroup[0][0].title}찍히나??</div>
          )} */}
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
