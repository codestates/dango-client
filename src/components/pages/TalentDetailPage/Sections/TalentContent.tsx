import React from 'react';
import styled from 'styled-components';

const CONTAINER = styled.div`
  grid-row: 2/9;
  grid-column: 1/3;
  border: 1px solid black;
`;

function TalentContent(): JSX.Element {
  return <CONTAINER>상세내용</CONTAINER>;
}

export default TalentContent;
