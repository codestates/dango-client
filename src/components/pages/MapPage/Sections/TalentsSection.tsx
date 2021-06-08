import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../_reducer';
import { handleSort, handleFilter, MapState, setMarkerLatLng } from '../../../../_reducer/map';

import { filterData, sortData } from './data';
import * as emoticons from './functions';
import {
  CONTAINER,
  FILTERSECTION,
  TALENTSLIST,
  TALENT,
  CATEGORY,
  NICKNAME,
  RATINGS,
  PRICE,
  TITLE,
  EMOJI,
  TEXT,
  STARNICK,
  CHECKBOX,
  RADIOBOX,
  UL,
  LI,
  INPUT,
  LABEL,
  RADIOINPUT,
  RADIOLABEL,
  CHECKBOX_SPAN,
  RADIOBOX_SPAN,
  RADIODIV,
} from './TalentsSectionStyle';

interface TalentsSectionProps {
  map: any;
  setMap: (map: any) => void;
  infoWindowGroup: any[];
  setInfoWindowGroup: (infoWindowGroup: any) => void;
}

function TalentsSection({ map, setMap, infoWindowGroup, setInfoWindowGroup }: TalentsSectionProps): JSX.Element {
  const dispatch = useDispatch();
  const { filter, talentData } = useSelector((state: RootState) => state.map);

  const handleCheckBox = (currentValue: any) => {
    if (infoWindowGroup.length > 0) {
      infoWindowGroup.forEach((infowindow) => {
        infowindow[1].close();
      });
    }

    if (filter === null) {
      const payload: MapState = {
        filter: [],
      };
      dispatch(handleFilter(payload));
    }

    const currentIndex = filter.indexOf(currentValue);
    const newCheckBoxList = [...filter];

    if (currentIndex === -1) {
      newCheckBoxList.push(currentValue);
    } else {
      newCheckBoxList.splice(currentIndex, 1);
    }

    const payload: MapState = {
      filter: newCheckBoxList,
    };
    dispatch(handleFilter(payload));
  };

  const handleRadioBox = (event: any) => {
    if (infoWindowGroup.length > 0) {
      infoWindowGroup.forEach((infowindow) => {
        infowindow[1].close();
      });
    }

    const payload: MapState = {
      sort: event.target.value,
    };
    dispatch(handleSort(payload));
  };

  const handleInfoWindow = (talent: any) => {
    const markerImage = new window.kakao.maps.MarkerImage(
      `/images/purpleMarker.png`,
      new window.kakao.maps.Size(40, 50),
      {
        offset: new window.kakao.maps.Point(14, 38),
      },
    );

    const clickImage = new window.kakao.maps.MarkerImage(`/images/redMarker.png`, new window.kakao.maps.Size(44, 55), {
      offset: new window.kakao.maps.Point(19, 45),
    });

    if (infoWindowGroup.length > 0) {
      infoWindowGroup.forEach((infowindow) => {
        infowindow[1].close();
        infowindow[2].setImage(markerImage);
      });

      talent[1].open(map, talent[2]);
      talent[2].setImage(clickImage);

      const [lng, lat] = talent[0].location;
      dispatch(setMarkerLatLng({ clickedMarkerLatLng: [lat, lng] }));
      const moveLatLon = new window.kakao.maps.LatLng(lat, lng);
      map.panTo(moveLatLon);
    }
  };

  return (
    <CONTAINER>
      <FILTERSECTION>
        <CHECKBOX>
          <CHECKBOX_SPAN>카테고리</CHECKBOX_SPAN>
          <UL>
            {filterData.map((ele) => (
              <LI key={ele.id} onChange={() => handleCheckBox(ele.name)}>
                <INPUT
                  type="checkbox"
                  id={ele.value}
                  name={ele.value}
                  value={ele.value}
                  checked={filter.indexOf(ele.name) !== -1}
                />
                <LABEL htmlFor={ele.value}>✓ {ele.name}</LABEL>
              </LI>
            ))}
          </UL>
        </CHECKBOX>
        <RADIOBOX>
          <RADIOBOX_SPAN>정렬</RADIOBOX_SPAN>
          <UL>
            {sortData.map((ele) => (
              <LI key={ele.id} onChange={handleRadioBox} style={{ marginRight: '0.5rem' }}>
                <RADIOINPUT type="radio" id={ele.id} name="sort" value={ele.id} />
                <LABEL htmlFor={ele.id}>{ele.name}</LABEL>
              </LI>
            ))}
          </UL>
        </RADIOBOX>
      </FILTERSECTION>
      <TALENTSLIST>
        {infoWindowGroup.map((talent) => (
          <TALENT onClick={() => handleInfoWindow(talent)} key={talent[0].id}>
            <CATEGORY>
              <EMOJI>{emoticons.handleCategory(talent[0].category)}</EMOJI>
            </CATEGORY>
            <TEXT>
              <TITLE>{talent[0].title}</TITLE>
              <PRICE>{talent[0].price}원</PRICE>
              <STARNICK>
                <RATINGS>
                  {emoticons.handleStarRatings(talent[0].ratings[0])}
                  {talent[0].ratings[1] !== undefined ? `(${talent[0].ratings[1]})` : '(0)'}
                </RATINGS>
                <NICKNAME>{talent[0].nickname}</NICKNAME>
              </STARNICK>
            </TEXT>
          </TALENT>
        ))}
      </TALENTSLIST>
    </CONTAINER>
  );
}
export default TalentsSection;
