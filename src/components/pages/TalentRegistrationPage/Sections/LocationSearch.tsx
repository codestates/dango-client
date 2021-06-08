import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { openModal } from '../../../../_reducer/modal';

const SEARCH = styled.div`
  //border: 1px solid blue;
  // grid-column: 1/2;
  // width: 400px;
  // height: 100%;
  // position: relative;
`;

//
interface LiType {
  idx: number;
  liIdx: number;
}

const INPUT = styled.input`
  all: unset;
  cursor: text;
  width: 368px;
  box-shadow: 1px 1px 3px 1px #dadce0;
  transition: all 0.2s ease-in-out;
  &:focus {
    box-shadow: 3px 3px 6px 1px #dadce0;
  }
  padding: 0 1rem;
  height: 2.5rem;
`;

const UL = styled.ul`
  list-style: none;
  margin-top: 0.2rem;
  position: absolute;
  width: 400px;
`;

const LIBOX = styled.div`
  background-color: ${({ theme }) => theme.colors.lightgray};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  &:hover {
    color: ${({ theme }) => theme.colors.purple};
  }
`;
const LI = styled.li<LiType>`
  color: ${(props) => props.idx === props.liIdx && '#835af1'};
  color: ${(props) => props.idx === 0 && props.liIdx === -2 && '#835af1'};
  cursor: pointer;
  padding: 0.5rem;
`;
const SUBLI = styled.li<LiType>`
  color: ${(props) => props.idx === props.liIdx && '#835af1'};
  color: ${(props) => props.idx === 0 && props.liIdx === -2 && '#835af1'};
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.5rem;
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
  const [liIdx, setLiIdx] = useState(-2);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue === '') {
      setLiIdx(-2);
    }
    if (inputValue && inputValue.length >= 2) {
      fetch(`https://dapi.kakao.com/v2/local/search/address.json?size=5&analyze_type=exact&query=${inputValue}`, {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_RESTAPI_KEY}`,
        },
      })
        .then((res) => res.json())
        .then((body) => {
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

            setLocationList(locationData);
          } else {
            fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?size=5&query=${inputValue}`, {
              method: 'GET',
              headers: {
                Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_RESTAPI_KEY}`,
              },
            })
              .then((res) => res.json())
              .then((body) => {
                if (body.documents.length > 0) {
                  const { documents } = body;

                  const locationData = documents.map((document: any) => {
                    const address = [document.place_name, document.address_name];
                    const { x: lng, y: lat } = document;
                    return { address, lat, lng };
                  });

                  setLocationList(locationData);
                } else {
                  setLocationList([]);
                }
              })
              .catch(() => '');
          }
        })
        .catch(() => '');
    }
  }, [inputValue]);

  const handleChangeLocation = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setLiIdx(-2);
  }, []);

  const handleClickLocation = (location: any) => {
    const { address, lat, lng } = location;

    if (address && lat && lng) {
      selectLocationData(address, lat, lng);
      setLiIdx(-2);
    }
  };

  const handleEnterKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (!inputValue || inputValue.length === 0 || locationList.length === 0) {
        dispatch(openModal({ type: 'error', text: '거래할 지역을 입력해주세요.' }));
      } else {
        let index;
        if (liIdx < 0) {
          index = 0;
        } else if (liIdx >= locationList.length) {
          index = locationList.length - 1;
        } else {
          index = liIdx;
        }
        const { address, lat, lng } = locationList[index];
        selectLocationData(address, lat, lng);
        setLiIdx(-2);
        inputRef.current?.focus();
        event.preventDefault();
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (inputValue && event.key === 'ArrowDown' && liIdx < locationList.length - 1) {
        const numberArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        const lastStr = inputValue.slice(-1);
        if (liIdx === -2) {
          if (numberArr.indexOf(lastStr) !== -1) {
            setLiIdx((prevIdx) => prevIdx + 3);
          } else {
            setLiIdx((prevIdx) => prevIdx + 2);
          }
        } else {
          setLiIdx((prevIdx) => prevIdx + 1);
        }
      } else if (event.key === 'ArrowUp' && liIdx > 0) {
        setLiIdx((prevIdx) => prevIdx - 1);
      }
      event.preventDefault();
    } else if (event.key === 'Escape' && inputRef.current) {
      setInputValue('');
      inputRef.current.value = '';
      event.preventDefault();
    }
  };

  const selectLocationData = useCallback(
    (address?: string | string[], lat?: string, lng?: string) => {
      setLocation([Number(lat), Number(lng)]);

      if (address && setAddress) {
        let myAddress;
        if (Array.isArray(address)) {
          myAddress = `${address[0]} (${address[1]})`;
        } else {
          myAddress = address;
        }
        setAddress(myAddress);
        if (addressRef?.current) {
          addressRef.current.textContent = myAddress;
        }
      }

      setLocationList([]);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [setAddress, setLocationList],
  );

  return (
    <SEARCH>
      <INPUT
        type="text"
        placeholder="예) 양화로, 서교동, 강남역, Starbucks                          🔍"
        onChange={handleChangeLocation}
        onKeyPress={handleEnterKey}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <UL>
        {locationList.length > 0 && inputValue && inputValue.length >= 1
          ? locationList.map((location, idx) => {
              if (Array.isArray(location.address)) {
                return (
                  <LIBOX key={idx} onClick={() => handleClickLocation(location)} onMouseEnter={() => setLiIdx(-3)}>
                    <LI idx={idx} liIdx={liIdx}>
                      {location.address[0]}
                    </LI>
                    <SUBLI idx={idx} liIdx={liIdx}>
                      {location.address[1]}
                    </SUBLI>
                  </LIBOX>
                );
              }
              return (
                <LIBOX key={idx} onClick={() => handleClickLocation(location)} onMouseEnter={() => setLiIdx(-3)}>
                  <LI idx={idx} liIdx={liIdx}>
                    {location.address}
                  </LI>
                </LIBOX>
              );
            })
          : ''}
      </UL>
    </SEARCH>
  );
}

export default LocationSearch;
