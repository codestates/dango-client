import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import server from '../../../api/index';
import { RootState } from '../../../_reducer';
import { openModal } from '../../../_reducer/modal';
import ImageUploader from './Sections/imageUploader';
import LocationSearch from './Sections/LocationSearch';
import Modal from '../../../utils/modal';
import {
  CONTAINER,
  SEARCHBOX,
  ADDRESS,
  FORM,
  BUTTON,
  TITLE,
  CATEGORY,
  PRICE,
  PRICEINPUT,
  FREE,
  FREEINPUT,
  FREELABEL,
  DESCRIPTION,
  BUTTONDIV,
  OPTION,
  TITLEBOX,
  TITLE_SPAN,
  CATEGORYBOX,
  CATEGORY_SPAN,
  PRICE_SPAN,
  SEARCH_SPAN,
  ADDRESSBOX,
  ADDRESS_SPAN,
  DESCRIPTIONBOX,
  DESCRIPTION_SPAN,
  PRICEBOX,
} from './TalentRegistrationPageStyle';

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

  const handleFreeTalent = (event: any) => {
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
        <TITLEBOX>
          <TITLE_SPAN>제목</TITLE_SPAN>
          <TITLE onChange={handleChange('title')} placeholder="ex) 냉장고 정리의 달인" />
        </TITLEBOX>

        <SEARCHBOX>
          <SEARCH_SPAN>지역 검색</SEARCH_SPAN>
          <LocationSearch setLocation={setLocation} setAddress={setAddress} addressRef={addressRef} />
        </SEARCHBOX>
        <ADDRESSBOX>
          <ADDRESS_SPAN>주소</ADDRESS_SPAN>
          <ADDRESS ref={addressRef} />
        </ADDRESSBOX>

        <CATEGORYBOX>
          <CATEGORY_SPAN>카테고리</CATEGORY_SPAN>
          <CATEGORY onBlur={handleChange('category')}>
            {categoryList.map((category) => (
              <OPTION key={category}>{category}</OPTION>
            ))}
          </CATEGORY>
        </CATEGORYBOX>

        <PRICEBOX>
          <PRICE_SPAN>가격</PRICE_SPAN>
          <PRICE>
            <FREE onChange={handleFreeTalent}>
              <FREEINPUT type="checkbox" id="free" />
              <FREELABEL htmlFor="free">✓ 재능 기부</FREELABEL>
            </FREE>
            <PRICEINPUT onChange={handleChange('price')} value={registerData.price} type="number" />
          </PRICE>
        </PRICEBOX>

        <DESCRIPTIONBOX>
          <DESCRIPTION_SPAN>설명</DESCRIPTION_SPAN>
          <DESCRIPTION
            onChange={handleChange('description')}
            placeholder="ex) 비좁아진 냉장고의 공간을 되찾아 드립니다! &#13;&#10; 주부 경력 20년!!"
          />
        </DESCRIPTIONBOX>
      </FORM>
      <ImageUploader />
      <BUTTONDIV>
        <BUTTON type="button" onClick={handleFormSubmit}>
          재능 등록
        </BUTTON>
      </BUTTONDIV>
    </CONTAINER>
  );
}
