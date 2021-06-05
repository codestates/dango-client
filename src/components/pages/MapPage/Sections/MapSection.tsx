import React, { useState, useEffect, useRef, useCallback, SetStateAction } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../../_reducer';
import { setMapConfig, SetMapconfigPayload, setMarkerLatLng } from '../../../../_reducer/map';
import LocationSearch from '../../TalentRegistrationPage/Sections/LocationSearch';
import './infoWindowStyle.css';
import { CONTAINER, SEARCH } from './MapSectionStyle';

declare global {
  interface Window {
    kakao: any;
  }
}

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

interface MapSectionProps {
  map: any;
  setMap: SetStateAction<any>;
  infoWindowGroup: any[];
  setInfoWindowGroup: (infoWindowGroup: any) => void;
}

function MapSection({ map, setMap, infoWindowGroup, setInfoWindowGroup }: MapSectionProps): JSX.Element {
  const { kakao } = window;
  const dispatch = useDispatch();
  const { mapLevel, latLng, talentData, clickedMarkerLatLng } = useSelector(
    (state: RootState) => state.map,
    shallowEqual,
  );
  const [markers, setMarkers] = useState<any[]>([]);
  const [location, setLocation] = useState<number[]>([]);
  const infowindowRef = useRef<any[]>([]);

  useEffect(() => {
    // 검색창에 입력한 지역의 위도경도로 이동시킨다.
    if (location.length > 0) {
      const [lat, lng] = location;
      const moveLatLon = new kakao.maps.LatLng(lat, lng);
      // map.panTo(moveLatLon);
      map.setCenter(moveLatLon);

      renewMapConfig(map);
    }
  }, [location]);

  // 렌더 초기 맵생성 및 지도 이벤트 등록
  useEffect(() => {
    const container = document.querySelector('.kakaoMap');
    const options = {
      center: latLng && new kakao.maps.LatLng(latLng[0], latLng[1]),
      level: mapLevel,
    };
    // 지도 생성
    const map = new kakao.maps.Map(container, options);
    setMap(map);

    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      infowindowRef.current.forEach((infowindow) => {
        infowindow[1].close();
      });
      renewMapConfig(map);
    });

    kakao.maps.event.addListener(map, 'dragend', () => {
      infowindowRef.current.forEach((infowindow) => {
        infowindow[1].close();
      });

      renewMapConfig(map);
    });

    // 개발 테스트용 // 클릭한 위도, 경도 정보를 가져온다.
    kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
      const latlng = mouseEvent.latLng;
      console.log('위도:::::::::', latlng.getLat());
      console.log('경도:::::::::', latlng.getLng());
      infowindowRef.current.forEach((infowindow) => infowindow[1].close());

      // // 클릭한 곳으로 지도이동
      // const moveLatLon = new kakao.maps.LatLng(latlng.getLat(), latlng.getLng());
      // map.panTo(moveLatLon);
    });

    // 지도를 만들었으니 지도범위 상태를 갱신시킨다.
    renewMapConfig(map);
  }, []);

  // talentData가 갱신될때마다 마커를 새로만들어준다.
  useEffect(() => {
    deleteMarker();
    if (talentData && talentData.length > 0 && talentData[0].id !== '') {
      makeMarker();
    }
  }, [talentData]);

  // 마커 생성
  const makeMarker = () => {
    infowindowRef.current = [];

    // 마커 이미지, 사이즈, 이미지의 위치 설정
    const markerImage = new kakao.maps.MarkerImage(`/images/purpleMarker.png`, new window.kakao.maps.Size(40, 50), {
      offset: new window.kakao.maps.Point(14, 38),
    });

    const clickImage = new kakao.maps.MarkerImage(`/images/redMarker.png`, new window.kakao.maps.Size(44, 55), {
      offset: new window.kakao.maps.Point(19, 45),
    });

    if (talentData && mapLevel && mapLevel <= 10) {
      const newMarkers = [];
      for (let i = 0; i < talentData.length; i++) {
        if (talentData[i].id === '') {
          continue;
        } else {
          const [lng, lat] = talentData[i].location;

          const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(lat, lng),
            image: clickedMarkerLatLng?.toString() === `${lat},${lng}` ? clickImage : markerImage,
            clickable: true,
          });

          const iwcontent = `<div class="main">
                              <div class="top">
                                <div class="top-left">
                                  <img class='image' src='/images/dango1.png' alt='dango'/>                                                                
                                </div>
                                <div class="top-right">
                                  <div class="title">${talentData[i]?.title.slice(0, 13)}</div>
                                  <div class="category">${talentData[i]?.category}</div>
                                  <div class="price">${talentData[i]?.price}원</div>
                                </div>
                              </div>
                                
                              <div class="middle">
                                <div class="middle-top">
                                  <div class="nickname">${talentData[i]?.nickname}</div>
                                  <div class="ratings">별점 : ${talentData[i]?.ratings[0] ?? '0'} / 5</div>
                                </div>
                                <div class="description">${talentData[i]?.description.slice(0, 50)}</div>
                                <div class="address">${talentData[i]?.address}</div>
                              </div>  

                              <div class="bottom">
                                  <a href="/detail/${talentData[i]?.id}" target="_self">
                                    <button class="button">상세 페이지로 이동</button>
                                  </a>
                              </div>    
                          </div>
                          `;

          const infowindow = new kakao.maps.InfoWindow({
            content: iwcontent,
            // removable: iwRemoveable,
          });
          /// ---------------marker,infowindow 생성 끝 -------------------------- ///

          kakao.maps.event.addListener(marker, 'click', function () {
            infowindowRef.current.forEach((infowindow) => {
              infowindow[2].setImage(markerImage);
              infowindow[1].close();
            });
            marker.setImage(clickImage);
            infowindow.open(map, marker);
            dispatch(setMarkerLatLng({ clickedMarkerLatLng: [lat, lng] }));

            // 클릭시 지도 이동
            const moveLatLon = new kakao.maps.LatLng(lat, lng);
            map.panTo(moveLatLon);
          });

          newMarkers.push(marker);

          // useRef는 랜더링과 상관없이 값이 계속쌓이므로 데이터만큼저장한뒤에 또 중복저장하지않도록 범위를 설정해준다.
          if (infowindowRef.current.length < talentData.length) {
            infowindowRef.current = [...infowindowRef.current, [talentData[i], infowindow, marker]];
          }
        }
      }
      setInfoWindowGroup(infowindowRef.current);
      setMarkers(newMarkers);
    }
  };

  // 마커 삭제
  const deleteMarker = () => {
    setInfoWindowGroup([]);
    markers?.forEach((marker) => marker.setMap(null));
  };

  const renewMapConfig = useCallback(
    (map: any) => {
      if (map) {
        const bounds = map.getBounds();
        const mapLevel = map.getLevel();
        const center = map.getCenter();

        const payload = {
          mapLevel,
          latLng: [center.getLat(), center.getLng()], // 지도중심의 [위도,경도]
          width: [bounds.qa, bounds.pa], // 지도범위의 [남,북]
        };
        console.log('lat: ', payload.latLng[0], ',  lng: ', payload.latLng[1], ',  width: ', payload.width);
        dispatch(setMapConfig(payload));
      }
    },
    [map],
  );

  return (
    <CONTAINER className="kakaoMap">
      <SEARCH>
        <LocationSearch setLocation={setLocation} />
      </SEARCH>
    </CONTAINER>
  );
}
export default MapSection;
