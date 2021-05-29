import React from 'react';
import ChattingRoomsList from './Sections/ChattingRoomsList';
import Modal from '../../../utils/modal';

function ChattingPage(): JSX.Element {
  return (
    <>
      <Modal />
      <ChattingRoomsList />;
    </>
  );
}

export default ChattingPage;
