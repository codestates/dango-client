import React from 'react';
import styled from 'styled-components';

const CONTAINER = styled.div`
  flex: 6 1 auto;

  border: 1px solid black;
`;

function TalentContent(): JSX.Element {
  return <CONTAINER>상세내용</CONTAINER>;
}

export default TalentContent;
