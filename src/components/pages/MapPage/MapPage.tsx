import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../_reducer';
import { postData } from '../../../_reducer/map';
import MapSection from './Sections/MapSection';
import TalentsSection from './Sections/TalentsSection';
import server from '../../../api';
import Modal from '../../../utils/modal';
import CONTAINER from './MapPageStyle';

function MapPage(): JSX.Element {
  const dispatch = useDispatch();
  const { latLng, width, sort = null, filter = null } = useSelector((state: RootState) => state.map, shallowEqual);

  const [map, setMap] = useState<any>();
  const [infoWindowGroup, setInfoWindowGroup] = useState<any[]>([]);

  useEffect(() => {
    const data = { sort, category: filter.length > 0 ? filter : null, location: latLng, width };
    server
      .post('/talents/map', data)
      .then((response) => {
        const newTalentData = response.data.result!.map((data: any) => {
          const { _id: id, title, userInfo, location, category, ratings, price, address, description } = data;
          return { id, title, nickname: userInfo.nickname, location, category, ratings, price, address, description };
        });

        dispatch(postData({ talentData: newTalentData }));
      })
      .catch(() => '');
  }, [latLng, sort, filter]);

  return (
    <CONTAINER>
      <Modal />
      <MapSection map={map} setMap={setMap} infoWindowGroup={infoWindowGroup} setInfoWindowGroup={setInfoWindowGroup} />
      <TalentsSection
        map={map}
        setMap={setMap}
        infoWindowGroup={infoWindowGroup}
        setInfoWindowGroup={setInfoWindowGroup}
      />
    </CONTAINER>
  );
}
export default MapPage;
