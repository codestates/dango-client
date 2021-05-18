import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ImageUploadr from './Sections/imageUploader';
import LocationSearch from './Sections/LocationSearch';

const CONTAINER = styled.div`
  display: grid;
  height: 100vh;
  gap: 20px;
`;

const FORM = styled.form`
  display: grid;
  justify-items: center;
  align-items: start;
  grid-column: 1/10;
  grid-row: 3/13;
  border: 1px solid black;
`;

export default function TalentRegistrationPage(): JSX.Element {
  const [location, setLocation] = useState<number[]>([]);
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    console.log('location::::', location);
    console.log('address::::', address);
  }, [location, address]);
  return (
    <CONTAINER>
      <FORM>
        <LocationSearch setLocation={setLocation} setAddress={setAddress} />
      </FORM>
      <ImageUploadr />
    </CONTAINER>
  );
}
