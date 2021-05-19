import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../_reducer';
import { postData } from '../../../_reducer/map';
import MapSection from './Sections/MapSection';
import TalentsSection from './Sections/TalentsSection';
import server from '../../../api';

const CONTAINER = styled.div`
  display: grid;
  height: 100vh;
  grid-column-gap: 20px;
`;

function MapPage(): JSX.Element {
  const dispatch = useDispatch();
  const { latLng, width, sort = null, filter = null } = useSelector((state: RootState) => state.map);

  const [map, setMap] = useState<any>();
  const [infoWindowGroup, setInfoWindowGroup] = useState<any[]>([]);

  useEffect(() => {
    const data = { sort, category: filter, location: latLng, width };
    server.post('/talents/map', data).then((response) => {
      const newTalentData = response.data.result.map((data: any) => {
        const {
          _id: id,
          title,
          userInfo: { nickname },
          location,
          category,
          ratings,
          price,
          address,
          description,
        } = data;
        return { id, title, nickname, location, category, ratings, price, address, description };
      });
      console.log('콘솔로찍은 서버에서온 talentData:::::::::;', newTalentData);
      // 지도범위, 정렬기준, 카테고리가 바뀔때마다 해당하는 talentData를 서버에서 받아서 갱신시킨다.
      dispatch(postData({ talentData: newTalentData }));
    });
  }, [latLng, sort, filter]);

  return (
    <CONTAINER>
      <MapSection map={map} setMap={setMap} infoWindowGroup={infoWindowGroup} setInfoWindowGroup={setInfoWindowGroup} />
      <TalentsSection />
    </CONTAINER>
  );
}
export default MapPage;
