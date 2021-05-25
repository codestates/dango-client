import React from 'react';
import styled from 'styled-components';
import ChattingRoomsList from './Sections/ChattingRoomsList';

import ChattingRoomTest1 from './Sections/ChattingRoomTest1';
import ChattingRoomTest2 from './Sections/ChattingRoomTest2';

const CONTAINER = styled.div`
  display: grid;
  height: 85vh;
  grid-column-gap: 20px;
  margin: 100px 20px 20px 20px;
`;

const CHATLIST = styled.div`
  grid-column: 1/3;
  border: 1px solid black;
`;

const CHAT = styled.div`
  grid-column: 3/7;
  border: 1px solid black;
`;

function ChattingPage(): JSX.Element {
  return (
    <CONTAINER>
      <CHATLIST>
        <ChattingRoomsList />
      </CHATLIST>
      <CHAT>
        <ChattingRoomTest1 />
        <ChattingRoomTest2 />
      </CHAT>
    </CONTAINER>
  );
}

export default ChattingPage;
