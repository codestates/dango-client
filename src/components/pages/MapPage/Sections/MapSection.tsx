import React from 'react';
import styled from 'styled-components';

const CONTAINER = styled.div`
  border: 1px solid black;
  grid-column: 1/4;
`;

function MapSection() {
  return <CONTAINER>map</CONTAINER>;
}
export default MapSection;
