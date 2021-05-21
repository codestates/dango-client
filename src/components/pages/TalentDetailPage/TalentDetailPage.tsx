// talent detail
import React from 'react';
import styled from 'styled-components';
import Review from './Sections/Review';
import TalentContent from './Sections/TalentContent';

const CONTAINER = styled.div`
  display: grid;
  height: 100vh;
  grid-column-gap: 20px;
`;

// 여기서 해당 글의 정보를 서버에서 받고, 리덕스에 저장한다.
// 서버요청의 useEffect의 deps배열안에는 변할수 있는 상태를 넣어준다.
// 어떤걸 넣어줄까. 유저닉네임, 리뷰목록,거래완료?

function TalentDetailPage(): JSX.Element {
  return (
    <CONTAINER>
      <TalentContent />
      <Review />
    </CONTAINER>
  );
}

export default TalentDetailPage;
