import React, { useEffect } from 'react';
import server from '../../../api';
import { CONTAINER, SELLER, DETAIL, PHOTOS, REVIEW } from './TalentDetailPageStyle';

function TalentDetailPage() {
  useEffect(() => {
    server.get('/talents/detail/60a5c5ea35cfa506fbb9bebc').then((res) => console.log(res.data));
  }, []);
  return (
    <CONTAINER>
      <SELLER>seller</SELLER>
      <DETAIL>detail</DETAIL>
      <PHOTOS>photos</PHOTOS>
      <REVIEW>review</REVIEW>
    </CONTAINER>
  );
}

export default TalentDetailPage;
