import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../_reducer';
import { handleSort, handleFilter, MapState, setMarkerLatLng } from '../../../../_reducer/map';
import { filterData, sortData } from './data';
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
 [ ] 5. 카테고리 이모지, 별점 범위로 렌더
 [ ] 6. sort 기본옵션? 거리순?
*/

/**
 * 5. 카테고리 이모지
 
 *
 * 별점 범위 설정
 * 받아온 별점 평균을 반올림처리한다.
 * 4.75 <= x <= 5.0 ==> 5.0 ==> ⭐️⭐️⭐️⭐️⭐️
 * 4.25 <= x < 4.75 ==> 4.5
 * 3.75 <= x < 4.25 ==> 4.0 ==> ⭐️⭐️⭐️⭐️
 * State 하나 새로 만들어서 바꿔줘야하나? 별 이모지 자체는 여기서만 쓴다
 */

interface MapSectionProps {
  map: any;
  setMap: (map: any) => void;
  infoWindowGroup: any[];
  setInfoWindowGroup: (infoWindowGroup: any) => void;
}

function TalentsSection({ map, setMap, infoWindowGroup, setInfoWindowGroup }: MapSectionProps): JSX.Element {
  const dispatch = useDispatch();
  const { filter, talentData } = useSelector((state: RootState) => state.map);

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

  const handleInfoWindow = (talent: any) => {
    const markerImage = new window.kakao.maps.MarkerImage(
      `/images/markerPurple.png`,
      new window.kakao.maps.Size(30, 38),
      {
        offset: new window.kakao.maps.Point(14, 38),
      },
    );

    const clickImage = new window.kakao.maps.MarkerImage(
      `/images/markerClick.png`,
      new window.kakao.maps.Size(38, 45),
      {
        offset: new window.kakao.maps.Point(19, 45),
      },
    );

    if (infoWindowGroup.length > 0) {
      // 모든 인포윈도우를 닫고, 모든 마커를 기본마커이미지로바꾼다.
      infoWindowGroup.forEach((infowindow) => {
        infowindow[1].close();
        infowindow[2].setImage(markerImage);
      });
      // 클릭한 마커의 인포윈도우를 열고,마커를 클릭이미지로 바꾼다.
      talent[1].open(map, talent[2]);
      talent[2].setImage(clickImage);

      const [lng, lat] = talent[0].location;
      dispatch(setMarkerLatLng({ clickedMarkerLatLng: [lat, lng] }));
      const moveLatLon = new window.kakao.maps.LatLng(lat, lng);
      map.panTo(moveLatLon);
    }
  };

  const handleCategory = (category: string) => {
    switch (category) {
      case '홈/리빙':
        console.log('home');
        return '🏠';
      case '비즈니스':
        return '📄';
      case '개발/디자인':
        return '💻';
      case '건강':
        return '💊';
      case '레슨':
        return '🧑🏻‍🏫';
      case '반려동물':
        return '🐶';
      case '기타':
        return '🤔';
      default:
        return '🍡';
    }
  };

  return (
    <CONTAINER>
      <FILTERSECTION>
        {filterData.map((ele) => (
          <div key={ele.id} onChange={() => handleCheckBox(ele.name)}>
            <input
              type="checkbox"
              id={ele.value}
              name={ele.value}
              value={ele.value}
              checked={filter.indexOf(ele.name) !== -1}
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
        {infoWindowGroup.map((talent) => (
          <TALENT onClick={() => handleInfoWindow(talent)} key={talent[0].id}>
            <CATEGORY>카테고리: {handleCategory(talent[0].category)}</CATEGORY>
            <TITLE>제목: {talent[0].title}</TITLE>
            <PRICE>가격: {talent[0].price}</PRICE>
            <NICKNAME>닉네임: {talent[0].nickname}</NICKNAME>
            <RATINGS>별점 평균: {talent[0].ratings[0] ?? '별점 없음'}</RATINGS>
            <RATINGSCOUNT>리뷰 개수: {talent[0].ratings[1] ?? '리뷰 없음'}</RATINGSCOUNT>
          </TALENT>
        ))}
      </TALENTSLIST>
    </CONTAINER>
  );
}
export default TalentsSection;
