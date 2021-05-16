import React from 'react';
import styled from 'styled-components';
import MapSection from './Sections/MapSection';
import TalentsSection from './Sections/TalentsSection';

const CONTAINER = styled.div`
  display: grid;
  height: 100vh;
  grid-column-gap: 20px;
`;

function MapPage() {
  return (
    <CONTAINER>
      <MapSection />
      <TalentsSection />
    </CONTAINER>
  );
}
export default MapPage;
