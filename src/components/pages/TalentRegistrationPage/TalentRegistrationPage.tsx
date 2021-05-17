import React from 'react';
import styled from 'styled-components';
import ImageUploadr from './Sections/imageUploader';
import LocationSearch from './Sections/LocationSearch';

const CONTAINER = styled.div`
  display: grid;
  height: 100vh;
  gap: 20px;
`;

export default function TalentRegistrationPage(): JSX.Element {
  return (
    <CONTAINER>
      <ImageUploadr />
      <LocationSearch />
    </CONTAINER>
  );
}
