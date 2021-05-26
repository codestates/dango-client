import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import server from '../../../api/index';
import { RootState } from '../../../_reducer';
import { openModal } from '../../../_reducer/modal';
import ImageUploader from './Sections/imageUploader';
import LocationSearch from './Sections/LocationSearch';
import Modal from '../../../utils/modal';

const CONTAINER = styled.div`
  display: grid;
  height: 100vh;
  gap: 20px;
`;

const SEARCHBOX = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: start;
  align-items: center;
  border: 1px solid black;
  width: 100%;
`;
const ADDRESS = styled.div`
  border: 1px solid red;
  grid-column: 2/3;
  width: 100%;
  height: 100%;
`;

const FORM = styled.form`
  display: grid;
  justify-items: center;
  align-items: start;
  grid-column: 1/10;
  grid-row: 3/13;
  border: 1px solid black;
`;

const BUTTON = styled.button`
  grid-column: 10/13;
  grid-row: 12/13;
`;

const categoryList = ['홈/리빙', '비즈니스', '개발/디자인', '건강', '레슨', '반려동물', '기타'];

export default function TalentRegistrationPage(): JSX.Element {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [location, setLocation] = useState<number[]>([]);
  const [address, setAddress] = useState<string>();
  const [registerData, setRegisterData] = useState({
    images: ['사진'],
    description: '',
    price: 0,
    category: '홈/리빙',
    title: '',
    userId: userInfo?.id,
  });
  const addressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('location::::', location);
    console.log('address::::', address);
  }, [location, address]);

  const handleChange = (key: string) => (event: any) => {
    setRegisterData({
      ...registerData,
      [key]: event.currentTarget.value,
    });
  };

  const handleFreeTalent = () => {
    setRegisterData({
      ...registerData,
      price: 0,
    });
  };

  const handleFormSubmit = () => {
    if (!registerData.title || !registerData.description || !address) {
      dispatch(openModal({ type: 'error', text: '정보를 모두 입력해주세요!' }));
    } else {
      const body = {
        ...registerData,
        address,
        location,
        description: registerData.description.replace('\r\n', '<br>'),
      };
      server
        .post('/talents/create', body)
        .then((res) => {
          console.log(res);
          dispatch(openModal({ type: 'ok', text: '재능이 등록되었습니다!' }));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <CONTAINER>
      <Modal />
      <FORM>
        <SEARCHBOX>
          <LocationSearch setLocation={setLocation} setAddress={setAddress} addressRef={addressRef} />
          <ADDRESS ref={addressRef} />
        </SEARCHBOX>
        <label>글 제목</label>
        <input onChange={handleChange('title')} placeholder="ex) 냉장고 정리의 달인" />
        <label>카테고리 선택</label>
        <select onBlur={handleChange('category')}>
          {categoryList.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        <label>가격</label>
        <input onChange={handleChange('price')} value={registerData.price} />
        <div onChange={handleFreeTalent}>
          <input type="checkbox" />
          <label>무료 재능 기부</label>
        </div>
        <label>재능 설명</label>
        <textarea onChange={handleChange('description')} placeholder="ex) 비좁아진 냉장고의 공간을 되찾아 드립니다!" />
      </FORM>
      <ImageUploader />
      <BUTTON type="button" onClick={handleFormSubmit}>
        제출
      </BUTTON>
    </CONTAINER>
  );
}
