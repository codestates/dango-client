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
    if (location.length > 0) {
      const [lat, lng] = location;
      const moveLatLon = new kakao.maps.LatLng(lat, lng);
      map.setCenter(moveLatLon);
      renewMapConfig(map);
    }
  }, [location]);

  useEffect(() => {
    const container = document.querySelector('.kakaoMap');
    const options = {
      center: latLng && new kakao.maps.LatLng(latLng[0], latLng[1]),
      level: mapLevel,
    };
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

    kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
      const latlng = mouseEvent.latLng;
      infowindowRef.current.forEach((infowindow) => infowindow[1].close());
    });

    renewMapConfig(map);
  }, []);

  useEffect(() => {
    deleteMarker();
    if (talentData && talentData.length > 0 && talentData[0].id !== '') {
      makeMarker();
    }
  }, [talentData]);

  const makeMarker = () => {
    infowindowRef.current = [];

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
                                  <div class="title">${talentData[i]?.title.slice(0, 17)}</div>
                                  <div class="category">${talentData[i]?.category}</div>
                                  <div class="price">${talentData[i]?.price}원</div>
                                </div>
                              </div>
                                
                              <div class="middle">
                                <div class="middle-top">
                                  <div class="nickname">${talentData[i]?.nickname}</div>
                                  <div class="ratings">별점 : ${
                                    Math.round(talentData[i]?.ratings[0] * 10) / 10 ?? '0'
                                  } / 5</div>
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
          });

          kakao.maps.event.addListener(marker, 'click', function () {
            infowindowRef.current.forEach((infowindow) => {
              infowindow[2].setImage(markerImage);
              infowindow[1].close();
            });
            marker.setImage(clickImage);
            infowindow.open(map, marker);
            dispatch(setMarkerLatLng({ clickedMarkerLatLng: [lat, lng] }));

            const moveLatLon = new kakao.maps.LatLng(lat, lng);
            map.panTo(moveLatLon);
          });

          newMarkers.push(marker);

          if (infowindowRef.current.length < talentData.length) {
            infowindowRef.current = [...infowindowRef.current, [talentData[i], infowindow, marker]];
          }
        }
      }
      setInfoWindowGroup(infowindowRef.current);
      setMarkers(newMarkers);
    }
  };

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
          latLng: [center.getLat(), center.getLng()],
          width: [bounds.qa, bounds.pa],
        };

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
