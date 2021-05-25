import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';

const CONTAINER = styled.div`
  display: grid;
  justify-items: start;
  align-items: center;
  border: 1px solid black;
  width: 100%;
`;

const SEARCH = styled.div`
  border: 1px solid blue;
  grid-column: 1/2;
`;

const ADDRESS = styled.div`
  border: 1px solid red;
  grid-column: 2/3;
`;

//
interface LiType {
  'data-idx': number;
}

// const LI = styled.li<LiType>`
//   ${(props) =>
//     props['data-idx'] === 0
//       ? css`
//           background: blue;
//           color: red;
//         `
//       : css``}
// `;
const LI = styled.li<LiType>`
  background: ${(props) => props['data-idx'] === 0 && '#DEDCEE'};
  cursor: pointer;
`;

interface LocationSearchProps {
  setLocation: (latLng: number[]) => void;
  setAddress: (address: string) => void;
}

function LocationSearch({ setLocation, setAddress }: LocationSearchProps): JSX.Element {
  const [locationList, setLocationList] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputValue) {
      fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${inputValue}`, {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_RESTAPI_KEY}`,
        },
      })
        .then((res) => res.json())
        .then((body) => {
          // 검색결과 데이터가 있을 경우 지역이름,위도,경도가 담긴 정보를 배열형태로 locationList에 저장한다.
          if (body.documents.length > 0) {
            const { documents } = body;

            const locationData = documents.map((document: any) => {
              if (document.road_address) {
                const { address_name: address, x: lng, y: lat } = document.road_address;
                return { address, lat, lng };
              }
              const { address_name: address, x: lng, y: lat } = document;
              return { address, lat, lng };
            });

            console.log('locationDaTA::::::', locationData);
            setLocationList(locationData);
          } else {
            setLocationList([]);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [inputValue]);

  // input내용이 바뀔때마다 inputValue를 갱신시킨다.
  const handleChangeLocation = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }, []);

  // 직접 클릭 시, 해당 정보를 선택하여 뿌린다.
  const handleClickLocation = (event: React.MouseEvent<HTMLLIElement>) => {
    const {
      dataset: { lat, lng },
      textContent: address,
    } = event.currentTarget;

    if (address && lat && lng) {
      selectLocationData(address, lat, lng);
    }
  };

  // 엔터키 입력 시, 가장 상위의 정보를 선택한다.
  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const { address, lat, lng } = locationList[0];
      selectLocationData(address, lat, lng);
    }
  };

  // 클릭한 지역명,위도,경도를 부모한테 올려준다. 부모가 받아서 create 요청해야하기때문.
  const selectLocationData = useCallback(
    (address?: string, lat?: string, lng?: string) => {
      setLocation([Number(lat), Number(lng)]);
      if (address) {
        setAddress(address);
        // 지역명을 div에 띄운다.
        if (addressRef.current) {
          addressRef.current.textContent = address;
        }
      }

      setLocationList([]);
      // input value를 초기화시킨다.
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [setAddress, setLocationList],
  );

  return (
    <CONTAINER>
      <SEARCH>
        <input
          type="text"
          placeholder="예) 판교역로, 한빛로 13, 역삼동"
          onChange={handleChangeLocation}
          onKeyPress={handleEnterKey}
          ref={inputRef}
        />
        <ul style={{ position: 'absolute' }}>
          {locationList.length > 0 &&
            locationList.map((location, idx) => {
              return (
                <LI
                  key={idx}
                  onClick={handleClickLocation}
                  data-idx={idx}
                  data-lat={location.lat}
                  data-lng={location.lng}
                >
                  {location.address}
                </LI>
              );
            })}
        </ul>
      </SEARCH>
      <ADDRESS ref={addressRef} />
    </CONTAINER>
  );
}

export default LocationSearch;
