import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { openModal } from '../../../../_reducer/modal';

const SEARCH = styled.div`
  border: 1px solid blue;
  grid-column: 1/2;
  width: 100%;
`;

//
interface LiType {
  'data-idx': number;
}

const INPUT = styled.input`
  all: 'unset';
  cursor: 'text';
  border: '1px solid';
  min-width: '100%';
`;

const LI = styled.li<LiType>`
  background: ${(props) => props['data-idx'] === 0 && '#DEDCEE'};
  cursor: pointer;
`;

interface LocationSearchProps {
  setLocation: (latLng: number[]) => void;
  setAddress?: (address: string) => void;
  addressRef?: any;
}
LocationSearch.defaultProps = {
  addressRef: undefined,
  setAddress: undefined,
};

function LocationSearch({ setLocation, setAddress, addressRef }: LocationSearchProps): JSX.Element {
  const dispatch = useDispatch();
  const [locationList, setLocationList] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    if (inputValue && inputValue.length >= 2) {
      fetch(`https://dapi.kakao.com/v2/local/search/address.json?analyze_type=exact&query=${inputValue}`, {
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
            // 값이 없을경우 키워드검색으로 요청을 다시 보내본다.
            fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?size=5&query=${inputValue}`, {
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
                    const address = `${document.place_name} (${document.address_name})`;
                    const { x: lng, y: lat } = document;
                    return { address, lat, lng };
                  });

                  console.log('locationDaTA::::::', locationData);
                  setLocationList(locationData);
                } else {
                  setLocationList([]);
                }
              })
              .catch((err) => console.log('카카오맵 키워드검색 에러', err));
          }
        })
        .catch((err) => console.log('카카오맵 지역명검색 에러', err));
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
  const handleEnterKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (!inputValue || inputValue.length === 0 || locationList.length === 0) {
        dispatch(openModal({ type: 'error', text: '거래할 지역을 입력해주세요.' }));
      } else {
        const { address, lat, lng } = locationList[0];
        selectLocationData(address, lat, lng);

        event.preventDefault();
      }
    }
  };

  // 클릭한 지역명,위도,경도를 부모한테 올려준다. 부모가 받아서 create 요청해야하기때문.
  const selectLocationData = useCallback(
    (address?: string, lat?: string, lng?: string) => {
      setLocation([Number(lat), Number(lng)]);
      if (address && setAddress) {
        setAddress(address);
        // 지역명을 div에 띄운다.
        if (addressRef?.current) {
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
    <SEARCH>
      <input
        style={{ all: 'unset', cursor: 'text', border: '1px solid', minWidth: '100%' }}
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
  );
}

export default LocationSearch;
