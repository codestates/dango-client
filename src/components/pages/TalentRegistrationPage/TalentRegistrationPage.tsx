import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import server from '../../../api/index';
import ImageUploader from './Sections/imageUploader';
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

const categoryList = ['홈/리빙', '비즈니스', '디자인/개발', '건강', '레슨', '반려동물', '기타'];

export default function TalentRegistrationPage(): JSX.Element {
  const [location, setLocation] = useState<number[]>([]);
  const [address, setAddress] = useState<string>();
  const [registerData, setRegisterData] = useState({
    images: ['사진'],
    description: '',
    price: 0,
    category: '',
    title: '',
    userId: '609ec5a42b6cd4396e5d2bcf',
  });
  // FIXME: userinfo.id 리듀서에서 가져와서 담기.

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

  const handleFormSubmit = () => {
    const body = {
      ...registerData,
      address,
      location,
    };
    server
      .post('/talents/create', body)
      .then((res) => {
        console.log(res);
        alert('재능 등록에 성공하였습니다!');
      })
      .catch((err) => console.log(err));
  };

  return (
    <CONTAINER>
      <FORM>
        <LocationSearch setLocation={setLocation} setAddress={setAddress} />
        <label>글 제목 input</label>
        <input onChange={handleChange('title')} />
        <label>카테고리 선택</label>
        <select onBlur={handleChange('category')}>
          {categoryList.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        <label>가격 input</label>
        <input onChange={handleChange('price')} />

        <label>재능 설명 textarea</label>
        <textarea onChange={handleChange('description')} />
        <button type="button" onClick={handleFormSubmit}>
          제출
        </button>
      </FORM>
      <ImageUploader />
    </CONTAINER>
  );
}
