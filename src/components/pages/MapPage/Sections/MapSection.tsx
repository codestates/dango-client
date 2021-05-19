import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../../../_reducer';
import { setInfowindow, setMapConfig } from '../../../../_reducer/map';
import server from '../../../../api';

declare global {
  interface Window {
    kakao: any;
  }
}

const CONTAINER = styled.div`
  grid-column: 1/5;
  border: 1px solid black;
`;

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

export interface PreviewInterface {
  category?: string;
  price?: number;
  title?: string;
  nickname?: string;
  description?: string;
  ratings?: Array<number | null>;
  location?: Array<number | null>;
  address?: string;
  _id?: string;
}

interface MapSectionProps {
  map: any;
  setMap: (map: any) => void;
  infoWindowGroup: any[];
  setInfoWindowGroup: (infoWindowGroup: any) => void;
}

function MapSection({ map, setMap, infoWindowGroup, setInfoWindowGroup }: MapSectionProps): JSX.Element {
  const dispatch = useDispatch();
  const { mapLevel, latLng, width, talentData } = useSelector((state: RootState) => state.map);

  const { kakao } = window;
  const [markers, setMarkers] = useState<any[]>([]);
  const [preview, setPreview] = useState<PreviewInterface>();
  const { talentId } = useParams<{ talentId: string }>();
  const infowindowRef = useRef<any[]>([]);

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
      renewMapConfig(map);
    });

    kakao.maps.event.addListener(map, 'dragend', () => {
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
    console.log('바뀐 talentData', talentData);
    if (talentData && talentData.length > 0 && talentData[0].id !== '') {
      deleteMarker();
      makeMarker();
    }
  }, [talentData]);

  // 마커 생성
  // TODO: 서버연결되면 bounds와 category로 서버에 데이터 요청해서 마커만들기
  const makeMarker = () => {
    setInfoWindowGroup([]);
    infowindowRef.current = [];
    console.log('마커만들기전 인포윈도우', infoWindowGroup);

    // 마커 이미지, 사이즈, 이미지의 위치 설정
    const markerImage = new kakao.maps.MarkerImage(`/images/dango_p.png`, new window.kakao.maps.Size(50, 58), {
      offset: new window.kakao.maps.Point(20, 58),
    });

    const hoverImage = new kakao.maps.MarkerImage(`/images/dango_p.png`, new window.kakao.maps.Size(62, 74), {
      offset: new window.kakao.maps.Point(20, 74),
    });
    if (talentData) {
      const newMarkers = [];
      for (let i = 0; i < talentData.length; i++) {
        if (talentData[i].id === '') {
          continue;
        } else {
          const [lng, lat] = talentData[i].location;

          const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(lat, lng),
            image: markerImage,
            clickable: true,
          });

          const iwcontent = `<div class="main" style="padding: 7px;">
                          <div class="title">제목${preview?.title}</div>
                          <div class="category">카테고리${preview?.category}</div>
                          <div class="address">지역${preview?.address}</div>
                          <div class="ratings">별점${preview?.ratings}</div>
                          <div class="nickname">닉네임${preview?.nickname}</div>
                          <div class="price">가격${preview?.price}</div>
                          <div class="description">내용${preview?.description}</div>
                          <div class="button">More details</div>
                          </div>
                          `;
          const iwRemoveable = true;

          const infowindow = new kakao.maps.InfoWindow({
            content: iwcontent,
            removable: iwRemoveable,
          });

          kakao.maps.event.addListener(marker, 'click', function () {
            infowindowRef.current.forEach((infowindow) => infowindow[1].close());
            infowindow.open(map, marker);
            // 클릭시 지도 이동
            const moveLatLon = new kakao.maps.LatLng(lat, lng);
            map.panTo(moveLatLon);
          });

          kakao.maps.event.addListener(marker, 'mouseover', function () {
            marker.setImage(hoverImage);
          });

          // 마커에 mouseout 이벤트 등록
          kakao.maps.event.addListener(marker, 'mouseout', function () {
            marker.setImage(markerImage);
          });

          newMarkers.push(marker);
          // setInfoWindowGroup((infoWindowGroup: any) => {
          //   infoWindowGroup.push([talentData[i].id, infowindow, marker]);
          // });

          // [talentId,infowindow,marker] 형태로 묶어서 따로 저장한다.
          if (infowindowRef.current.length < talentData.length) {
            infowindowRef.current = [...infowindowRef.current, [talentData[i], infowindow, marker]];
          }
          // if (infowindowRef.current.length === 3) {
          //   dispatch(setInfowindow({ infowindowGroup: infowindowRef.current }));
          // }
        }
      }
      setInfoWindowGroup(infowindowRef.current);
      console.log('ref로 넣은 infowindowGroup', infoWindowGroup);
      setMarkers(newMarkers);
      console.log('마커만들었음');
    }
  };

  // 마커 삭제
  const deleteMarker = () => {
    markers?.forEach((marker) => marker.setMap(null));

    console.log('마커삭제함');
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
        console.log('들어가는 latLng::::', payload.latLng);
        console.log('들어가는 width::::', payload.width);
        dispatch(setMapConfig(payload));
      }
    },
    [map],
  );

  const handleButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('btn;;;;;;;;;;;', event.currentTarget.textContent);
    const talentId = event.currentTarget.dataset.id;
    const infowindow = infowindowRef.current.find((infowindow) => {
      return infowindow[0].id === talentId;
    });
    console.log('타겟 인포윈도우 그룹::::::::::', infowindow); // [id,infowindow,marker]

    // 인포윈도우 모두 끄고
    infowindowRef.current.forEach((infowindow) => infowindow[1].close());
    // 다시 킨다.
    infowindow[1].open(map, infowindow[2]);

    // 클릭시 해당 마커위치로 지도위치 이동
    // ->근데 이렇게 이동하면 지도범위 안불러와짐. 지도범위는 드래그나 휠로만됨지금.
    const [lng, lat] = infowindow[0].location;
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    map.panTo(moveLatLon);

    // console.log('btn;;;;;;;;;;;', event.currentTarget.textContent);
    // const talentId = event.currentTarget.dataset.id;
    // const infowindow = infoWindowGroup.find((infowindow) => {
    //   return infowindow[0] === talentId;
    // });
    // console.log('인포윈도우 그룹정보::::::::::', infoWindowGroup); // [id,infowindow,marker]
    // console.log('타겟 인포윈도우 그룹::::::::::', infowindow); // [id,infowindow,marker]

    // infoWindowGroup.forEach((infowindow) => infowindow[1].close());
    // infowindow[1].open(map, infowindow[2]);
    console.log('ddd');
  };
  return (
    <CONTAINER className="kakaoMap">
      <div style={{ position: 'absolute', zIndex: 110 }}>
        {talentData &&
          talentData.length > 0 &&
          talentData[0].id !== '' &&
          talentData.map((data, idx) => {
            return (
              <button key={idx} type="button" data-id={data.id} onClick={handleButton}>
                {data.title}
              </button>
            );
          })}
        {/* <button type="button" data-id="60a3ed13e372ede3855afc83" onClick={handleButton}>
          1
        </button>
        <button type="button" data-id="60a3ed4de372ede3855afc84" onClick={handleButton}>
          2
        </button>
        <button type="button" data-id="60a3ed8ae372ede3855afc85" onClick={handleButton}>
          3
        </button> */}
      </div>
    </CONTAINER>
  );
}
export default MapSection;
