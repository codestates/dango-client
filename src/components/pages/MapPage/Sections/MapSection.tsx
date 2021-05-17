import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import styled from 'styled-components';
import server from '../../../../api/index';

declare global {
  interface Window {
    kakao: any;
  }
}

const CONTAINER = styled.div`
  grid-column: 1/5;
  border: 1px solid black;
`;

const markerDummy = [
  { id: '1', lat: 37.485076030661446, lng: 126.72999597387181 },
  { id: '2', lat: 37.489457, lng: 126.7223953 },
  { id: '3', lat: 37.49523575818197, lng: 126.72842148515839 },
];

// -------------------------------LOGIC ------------------------------------------
// 1. 처음 default 좌표 영역(bounds)안의 전체카테고리 재능판매리스트를 서버에서 받는다.
//   -  서버에서는 재능컬렉션에 위도, 경도값이 있을테니 위도 몇 이상 몇이하 && 경도 몇이상 몇이하 && 카테고리 = 뭐 요렇게 쿼리가능할듯
// 1.1 받은 위도경도로 마커를 만든다.
// 1.2 지도가 움직여서 범위가 변하거나, 카테고리를 골랐을 때 서버에 이 두가지를 만족하는 재능판매리스트를 다시 받는다.
//
// 2. 마커에 클릭이벤트를 넣는다.
//    - 클릭이벤트 함수에서 모달on 시킨다.
//    - 모달컴포넌트에서는 useSelector로 상태 불러와서 렌더한다.
// 3. 오른쪽아래 리스트는 그냥 서버에서 받아온 데이터로 렌더한다.
//    - 클릭이벤트 함수에서 모달on 시킨다.
//
// --------------------------- OPTIONAL ---------------------------------------------------
//
// *. 리스트중 하나를 클릭했을 때 마커 색깔 바꾸는 건 어떻게하는거지
//   이건 마커클릭할때 바꾸기   https://apis.map.kakao.com/web/sample/multipleMarkerEvent2/
//   1. 마커생성할 때 marker.id 에 재능의 id를 넣는다.
//   2. 재능리스트중 하나를 클릭해서 해당 id와 일치하는 id를갖는 marker의 색깔만 변화???

// *. 오른쪽아래 리스트 중 하나를 클릭했을 때 해당 마커를 지도 중심이 되도로 지도 움직이기.

// ---------------------------------- METHOD -------------------------------------------
// --------위도 경도 -----------//
// * 지도의 현재 중심 위도경도
// const center = map.getCenter();
// setLatLng([center.getLat(), center.getLng()])

// ------------지도범위 (bounds) --------- //
// 지도의 현재 영역을 얻어옵니다
// const bounds = map.getBounds();
// {ha 서: 126.71727406977497, qa 남: 37.4825775166787, oa 동: 126.72751284213535, pa 북: 37.49633289086903}

// setMapBounds([
//   [bounds.qa, bounds.pa], //[남, 북]
//   [bounds.ha, bounds.oa], //[서, 동]
// ]);

// ----- 레벨 ------- //
// * 지도의 현재 레벨을 얻어옵니다
// const level = map.getLevel();
// [OPTIONAL] 일정 레벨이상이되면 마커가 안보이거나, 일반마커가아닌 클라스터러 라이브러리로 숫자표시하기
//------------------------------------------------------------------------------------


export interface LocationInterface {
  latitude: number,
  longitude: number,
  area: string
}

export interface PreviewInterface {
  category: string,
  price: number,
  title: string,
  nickname: string,
  subTitle: string,
  ratings: Array<number>,
  location: LocationInterface,
  _id: string
}


function MapSection(): JSX.Element {
  const { kakao } = window;
  const [map, setMap] = useState<any>();
  const [mapLevel, setMapLevel] = useState<number>(6);
  const [mapBounds, setMapBounds] = useState<any>([]);
  const [latLng, setLatLng] = useState<number[]>([37.489457, 126.7223953]); // 지도중심 위도경도
  const [markers, setMarkers] = useState<any[]>([]);
  const [category, setCategory] = useState<string>('all');
  const [preview, setPreview] = useState<PreviewInterface>();
  const { talentId } = useParams<{talentId: string}>();

  // 렌더 초기 맵생성 및 지도 이벤트 등록
  useEffect(() => {
    const container = document.querySelector('.kakaoMap');
    const options = {
      center: new kakao.maps.LatLng(latLng[0], latLng[1]),
      level: mapLevel,
    };
    // 지도 생성
    const map = new kakao.maps.Map(container, options);
    setMap(map);

    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      setBoundsToArray(map);
    });

    kakao.maps.event.addListener(map, 'dragend', () => {
      setBoundsToArray(map);
    });

    // 개발 테스트용 // 클릭한 위도, 경도 정보를 가져온다.
    kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
      const latlng = mouseEvent.latLng;
      console.log('위도:::::::::', latlng.getLat());
      console.log('경도:::::::::', latlng.getLng());
    });
  }, []);

  // 지도가 생성되면 중심좌표와 지도범위를 갱신해준다.
  useEffect(() => {
    if (map) {
      const center = map.getCenter();
      setLatLng([center.getLat(), center.getLng()]);
      setBoundsToArray(map);
    }
  }, [map]);

  // 지도범위와 카테고리가 변경될때마다 마커를 삭제-생성 해준다.
  useEffect(() => {
    deleteMarker();
    makeMarker();
    console.log('bounds', mapBounds);
  }, [mapBounds, category]);

  // 클릭 이벤트 발생시 서버에 요청을 보낸다.
  useEffect(()=>{
    server.get(`telent/${talentId}`)
    .then(response => {
      setPreview(response.data.talent)
    })
    .catch(()=>'')
  },[talentId])

  

  // 마커 생성
  // TODO: 서버연결되면 bounds와 category로 서버에 데이터 요청해서 마커만들기
  const makeMarker = () => {
    // 마커 이미지, 사이즈, 이미지의 위치 설정
    const markerImage = new kakao.maps.MarkerImage(`/images/dango_p.png`, new window.kakao.maps.Size(50, 58), {
      offset: new window.kakao.maps.Point(20, 58),
    });

    const newMarkers = markerDummy.map((data) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(data.lat, data.lng),
        image: markerImage,
        id: data.id,
        clickable: true
      });

      const iwcontent= `<div class="main" style="padding: 7px;">
                        <div class="title">제목${preview?.title}</div>
                        <div class="category">카테고리${preview?.category}</div>
                        <div class="area">지역${preview?.location.area}</div>
                        <div class="ratings">별점${preview?.ratings[1]}</div>
                        <div class="nickname">닉네임${preview?.nickname}</div>
                        <div class="price">가격${preview?.price}</div>
                        <div class="subTitle">내용${preview?.subTitle.slice(0,50)}...</div>
                        <div class="button">More details</div>
                        </div>
                        `
      const iwRemovealbe = true

      const infowindow = new kakao.maps.InfoWindow({
        content: iwcontent,
        removable: iwRemovealbe
      })

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker)
      });

      return marker;
    });
    setMarkers(newMarkers);
    console.log('마커만들었음');
  };

  // 마커 삭제
  const deleteMarker = () => {
    markers?.forEach((marker) => marker.setMap(null));
    console.log('마커삭제함');
  };

  //
  const setBoundsToArray = (map: any) => {
    const bounds = map.getBounds();
    setMapBounds([
      [bounds.qa, bounds.pa],
      [bounds.ha, bounds.oa],
    ]);
  };

  return <CONTAINER className="kakaoMap" />;
}
export default MapSection;
