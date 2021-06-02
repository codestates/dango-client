import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { openModal } from '../../../../_reducer/modal';

const SEARCH = styled.div`
  // border: 1px solid blue;
  // grid-column: 1/2;
  width: 400px;
  height: 100%;
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
  // border: 1px solid;
  width: 368px;
  height: 100%;
  box-shadow: 1px 1px 3px 1px #dadce0;
  &:focus {
    // border-bottom: 2px solid #835af1;
    box-shadow: 1px 1px 3px 1px #835af1;
  }
  padding: 0 1rem;
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
  // background-color: rgba(198, 191, 191, 0.1);
  // background-color: ${(props) => props.idx === props.liIdx && '#835af1'};
  color: ${(props) => props.idx === props.liIdx && '#835af1'};
  color: ${(props) => props.idx === 0 && props.liIdx === -2 && '#835af1'};

  cursor: pointer;
  padding: 0.5rem;
`;
const SUBLI = styled.li<LiType>`
  // background-color: rgba(198, 191, 191, 0.1);
  // background-color: ${(props) => props.idx === props.liIdx && '#DEDCEE'};
  color: ${(props) => props.idx === props.liIdx && '#835af1'};
  color: ${(props) => props.idx === 0 && props.liIdx === -2 && '#835af1'};
  // color: grey;
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
    // 검색창을 다 지울때마다 가장 위의 결과가 하이라이팅되도록 인덱스를 초기값으로 바꿔준다.
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
                    // 키워드명으로 검색할때는 [키워드명, 주소명] 으로 넣어준다.
                    const address = [document.place_name, document.address_name];
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
    setLiIdx(-2);
  }, []);

  // 직접 클릭 시, 해당 정보를 선택하여 뿌린다.
  const handleClickLocation = (location: any) => {
    const { address, lat, lng } = location;

    if (address && lat && lng) {
      selectLocationData(address, lat, lng);
      setLiIdx(-2);
    }
  };

  // 엔터키 입력 시, 해당 인덱스의 값을 선택한다.
  const handleEnterKey = (event: React.KeyboardEvent) => {
    console.log('엔터함수 event:::', event.key);
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
        inputRef.current?.blur();
        event.preventDefault();
      }
    }
  };

  // 크롬브라우저의 문제로 한글로 끝나면 key down,up 이벤트가 맨처음에 2번발생함
  //  검색어 끝이 한글이 아닌 숫자,영어로끝나면 이벤트가 1번발생함.
  // 이를위한 임시방편으로 시작idx를 -2로두고, 검색어 끝에 숫자가 오면 그대로 idx를 2 증가시키고
  // 검색어 끝에 한글이오면 2번실행되기때문에 1만증가시킨다. 영어는...
  const handleKeyDown = (event: React.KeyboardEvent) => {
    console.log('event.key::', event.key);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (inputValue && event.key === 'ArrowDown' && liIdx < locationList.length - 1) {
        const numberArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        const lastStr = inputValue.slice(-1);
        // 검색직후에는 가장맨위의 지역이 선택되어있는 상태이니까 아래키를 눌렀을때 1씩 더더해준다.
        if (liIdx === -2) {
          // 마지막글자가 숫자면 이벤트가 1번실행되므로 1을 더더해준다.
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

  // 클릭한 지역명,위도,경도를 부모한테 올려주는 함수.
  // 서버에보내는 값이다. selectLocationData(지역명,위도,경도)로 호출하여 올려준다.
  const selectLocationData = useCallback(
    // address는 두가지일수 있다.
    // 주소명으로 API를 보냈으면 단순 string이지만
    // 키워드로 API를 보냈으면 [키워드명,주소명]이담긴 배열이다.
    // 따라서 이를 분기하여 myAddress에 할당해주고 부모에 올려준다.
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
        // 지역명을 div에 띄운다.
        if (addressRef?.current) {
          addressRef.current.textContent = myAddress;
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
      <INPUT
        type="text"
        placeholder="예) 한빛로, 동교동, 강남역, 스타벅스  🔍"
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
