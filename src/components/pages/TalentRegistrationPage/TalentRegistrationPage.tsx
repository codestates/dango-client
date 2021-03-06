import React, { useState, useEffect, useRef, memo } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import server from '../../../api/index';
import { RootState } from '../../../_reducer';
import { openModal } from '../../../_reducer/modalSlice';
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
import { MBUTTON } from '../../../styles/Buttons';

const categoryList = ['홈/리빙', '비즈니스', '개발/디자인', '건강', '레슨', '반려동물', '기타'];

function TalentRegistrationPage(): JSX.Element {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [location, setLocation] = useState<number[]>([]);
  const [address, setAddress] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [registerData, setRegisterData] = useState({
    images: imageUrl,
    description: '',
    price: 0,
    category: '홈/리빙',
    title: '',
    userId: userInfo?.id,
  });
  const addressRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      dispatch(openModal({ type: 'error', text: '로그인이 필요한 서비스입니다.', callbackName: 'goToRoot' }));
    }
  }, []);

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
        images: imageUrl,
        address,
        location,
        description: registerData.description.replace('\r\n', '<br>'),
      };
      server
        .post('/talents/create', body)
        .then(() => {
          dispatch(openModal({ type: 'ok', text: '재능이 등록되었습니다!' }));
          setImageUrl([]);
          history.push('/map');
        })
        .catch(() => '');
    }
  };

  return (
    <>
      <Modal />
      <CONTAINER>
        <FORM>
          <TITLEBOX>
            <TITLE_SPAN>제목</TITLE_SPAN>
            <TITLE onChange={handleChange('title')} placeholder="예) 냉장고 정리의 달인" maxLength={20} />
          </TITLEBOX>

          <SEARCHBOX>
            <SEARCH_SPAN>지역 검색</SEARCH_SPAN>
            <LocationSearch setLocation={setLocation} setAddress={setAddress} addressRef={addressRef} />
          </SEARCHBOX>
          <ADDRESSBOX>
            <ADDRESS_SPAN />
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
              placeholder="예) 비좁아진 냉장고의 공간을 되찾아 드립니다!"
              maxLength={170}
            />
          </DESCRIPTIONBOX>
        </FORM>
        <ImageUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
        <BUTTONDIV>
          <BUTTON type="button" onClick={handleFormSubmit} style={{ padding: '0 1.5rem' }}>
            재능 등록
          </BUTTON>
        </BUTTONDIV>
      </CONTAINER>
    </>
  );
}

export default memo(TalentRegistrationPage);
