import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

declare global {
  interface Window {
    kakao: any;
  }
}

const CONTAINER = styled.div`
  grid-column: 1/5;
  border: 1px solid black;
`;

const BUTTON = styled.button`
  position: absolute;
  z-index: 10;
`;

const markerDummy = [
  { id: '1', lat: 37.485076030661446, lng: 126.72999597387181 },
  { id: '2', lat: 37.489457, lng: 126.7223953 },
  { id: '3', lat: 37.49523575818197, lng: 126.72842148515839 },
];

// -------------------------------LOGIC ------------------------------------------
// 1. 처음 default 좌표 영역(bounds)안의 전체카테고리 재능판매리스트를 서버에서 받는다.
//   -  서버에서는 재능컬렉션에 위도, 경도값이 있을테니 위도 몇 이상 몇이하 && 경도 몇이상 몇이하 && 카테고리 = 뭐 요렇게 쿼리가능할듯
// 1.1 리스트안의 값들을 리덕스에 저장한다.(재능글ID, 제목,내용,별점,가격,이름,카테고리이미지,위도경도)
//     - 지도의 위치를 중심으로 랜더되기때문에 하나의 리듀서에 넣는게 좋을듯.
//     - 지도가 움직일때마다 리셋시키고 다시 서버에서 받는다.
// 1.2 받은 위도경도로 마커를 만든다.
// 1.3 지도가 움직여서 범위가 변하거나, 카테고리를 골랐을 때 서버에 이 두가지를 만족하는 재능판매리스트를 다시 받는다.
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

function MapSection(): JSX.Element {
  const { kakao } = window;
  const [map, setMap] = useState<any>();
  const [mapLevel, setMapLevel] = useState<number>(6);
  const [mapBounds, setMapBounds] = useState<any>();
  const [latLng, setLatLng] = useState<number[]>([37.489457, 126.7223953]); // 지도중심 위도경도
  const [markers, setMarkers] = useState<any[] | null>(null);
  const [category, setCategory] = useState<string>('all');

  useEffect(() => {
    if (map) {
      const center = map.getCenter();
      setLatLng([center.getLat(), center.getLng()]);
      setBoundsToArray();
    }
  }, [map]);

  useEffect(() => {
    deletemarker();
    makeMarker();
    console.log('bounds', mapBounds);
  }, [mapBounds, category]);

  useEffect(() => {
    console.log('2');
    const container = document.querySelector('.kakaoMap');
    const options = {
      center: new kakao.maps.LatLng(latLng[0], latLng[1]),
      level: mapLevel,
    };
    // 지도 생성
    const map = new kakao.maps.Map(container, options);
    setMap(map);

    kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      const latlng = mouseEvent.latLng;

      console.log('위도:::::::::', latlng.getLat());
      console.log('경도:::::::::', latlng.getLng());
    });

    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      // let level = map.getLevel();
      // setMapLevel(level);
      setBoundsToArray();
    });

    kakao.maps.event.addListener(map, 'dragend', () => {
      // let latlng = map.getCenter();
      // setLatLng([latlng.getLat(), latlng.getLng()]);
      setBoundsToArray();
    });
  }, []);

  const makeMarker = () => {
    const markerImage = new kakao.maps.MarkerImage(`/images/dango_p.png`, new window.kakao.maps.Size(50, 58), {
      offset: new window.kakao.maps.Point(20, 58),
    });
    const markers: any = markerDummy.map((data) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(data.lat, data.lng),
        image: markerImage,
        id: data.id,
      });
      return marker;
    });
    setMarkers(markers);
  };

  const deletemarker = () => {
    markers?.forEach((marker) => marker.setMap(null));
    console.log('마커삭제함');
  };

  const setBoundsToArray = () => {
    if (map) {
      const bounds = map.getBounds();
      setMapBounds([
        [bounds.qa, bounds.pa],
        [bounds.ha, bounds.oa],
      ]);
    }
  };
  useEffect(() => {
    console.log('markers::::::::', markers);
    if (markers) markers.forEach((marker) => console.log('markerID::::::', marker.id));
  }, [markers]);

  return (
    <CONTAINER className="kakaoMap">
      <BUTTON type="button" onClick={deletemarker}>
        마커초기화
      </BUTTON>
    </CONTAINER>
  );
}
export default MapSection;
