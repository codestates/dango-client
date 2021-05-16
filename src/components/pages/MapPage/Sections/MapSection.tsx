import React, { useEffect } from 'react';
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

function MapSection() {
  const { kakao } = window;

  useEffect(() => {
    const container = document.querySelector('.kakaoMap');
    const options = {
      center: new kakao.maps.LatLng(37.489457, 126.7223953),
      level: 3,
    };
    // 지도 생성
    const map = new kakao.maps.Map(container, options);

    // ----------------------마커-------------------- //

    // 마커를 생성하여 지도에표시
    // 여러개를 생성할 경우 배열을 forEach돌린다.
    // title: el.title
    // position: new kakao.maps.latLng(el.lat, el.lng)
    const marker = new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(37.489457, 126.7223953),
      title: '테스트',
    });
  }, []);

  return <CONTAINER className="kakaoMap">map</CONTAINER>;
}
export default MapSection;
