import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Review from './Sections/Review';
import { RootState } from '../../../_reducer';
import { postTalentData, TalentState } from '../../../_reducer/talent';
import { updateChatRooms } from '../../../_reducer/user';
import { setIsFirstChat } from '../../../_reducer/chattings';
import server from '../../../api';
import { CONTAINER, SELLER, DETAIL, PHOTOS } from './TalentDetailPageStyle';
import Modal from '../../../utils/modal';

// 여기서 해당 글의 정보를 서버에서 받고, 리덕스에 저장한다.
// 서버요청의 useEffect의 deps배열안에는 변할수 있는 상태를 넣어준다.
// 어떤걸 넣어줄까. 유저닉네임, 리뷰목록,거래완료?
// FIXME:
/*  talent Reducer = {talentId:'', seller: id, buyer:[id,id,id], 
 랜더에필요한내용들, review: {[ id,닉네임,별점,날짜,내용,reply:{ 닉네임, 내용, 날짜 } ], [...], [...]} 
 } */
// user reducer에 role추가. normal, seller, buyer

// TODO: 구매자인경우 userReducer에서 구매내역의 talentId의 수와
//       talet의 review를 작성한 내userId의 개수를 비교해야함
//       내구매내역의 talentId의 갯수(또는 talent의 buyer안의 내 userId 갯수) > 리뷰작성한 내 userId의 갯수이면 리뷰작성창 나와야한다.
declare global {
  interface Window {
    Kakao: any;
  }
}

function TalentDetailPage(): JSX.Element {
  const { Kakao } = window;
  const { userInfo } = useSelector((state: RootState) => state.user, shallowEqual);

  const dispatch = useDispatch();
  const history = useHistory();
  const [detailData, setDetailData] = useState<any>();
  const [editDetail, setEditDetail] = useState<any>(); // 수정 가능한 데이터
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const input = useRef<HTMLInputElement | null>(null);

  const { talentId } = useParams<{ talentId: string }>();
  const categoryList = ['홈/리빙', '비즈니스', '개발/디자인', '건강', '레슨', '반려동물', '기타'];

  // 렌더할 데이터 서버에서 불러오기
  useEffect(() => {
    server
      .get(`/talents/detail/${talentId}`)
      .then((res) => {
        let userRole: 'normal' | 'seller' | 'reviewer' = 'normal';

        // 작성자의 id와 유저의 id가 같으면 판매자
        if (res.data.userInfo._id === userInfo?.id) {
          userRole = 'seller';
          // 유저의 unreviewed 에 해당 글의 id가있으면 리뷰작성가능자
        } else if (userInfo?.unreviewed.indexOf(talentId) !== -1) {
          userRole = 'reviewer';
        }

        const payload: TalentState = {
          talentId,
          sellerId: res.data.userInfo._id,
          reviews: res.data.reviews,
          userId: userInfo?.id,
          userRole,
        };
        dispatch(postTalentData(payload));

        setDetailData(res.data);
        setEditDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, [userInfo]);

  // 카카오톡으로 공유하기
  useEffect(() => {
    Kakao.Link.createDefaultButton({
      container: '.create-kakao-link-btn', // 버튼 class name
      objectType: 'location',
      address: detailData ? detailData.address : '경기 성남시 분당구 판교역로 235 에이치스퀘어 N동 8층', // required라서 없으면 에러가 난다.
      addressTitle: 'DANGO', // 지도에서 표시될 이름
      content: {
        title: `DANGO와 나누는 재능, ${detailData?.title}`,
        description: detailData?.description,
        // 이미지 파일 url 형태로 올리거나 카카오 서버에 업로드된 이미지여야 한다.
        imageUrl: 'http://k.kakaocdn.net/dn/bSbH9w/btqgegaEDfW/vD9KKV0hEintg6bZT4v4WK/kakaolink40_original.png',
        link: {
          mobileWebUrl: `http://localhost:3000/detail/${talentId}`,
          webUrl: `http://localhost:3000/detail/${talentId}`,
        },
      },
      social: {
        likeCount: 286,
        commentCount: 45,
        sharedCount: 845,
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: `http://localhost:3000/detail/${talentId}`,
            webUrl: `http://localhost:3000/detail/${talentId}`,
          },
        },
      ],
    });
  }, [detailData]);

  // Edit 버튼 클릭
  const handleClick = (): void => {
    setIsClicked(true);
  };

  const changeInput = (key: string) => (event: any) => {
    setEditDetail({
      ...editDetail,
      [key]: event.target.value,
    });
    input.current = event.target.value;
  };

  const submitEdit = (): void => {
    if (!editDetail.title || !editDetail.description) {
      alert('모든 내용을 입력해주세요!');
    } else {
      // body 넣을 예정
      server
        .post('/talents/edit')
        .then((response) => {
          setDetailData(response.data);
          setIsClicked(false);
        })
        .catch(() => '');
    }
  };

  // [채팅으로 거래하기] 버튼 눌렀을 때 새로운 채팅방 만들어주기
  const handleFirstChat = () => {
    const body = {
      userId: userInfo?.id, // buyer id (동네 이웃 id)
      otherId: detailData.userInfo._id, // seller id (동네 고수 id)
      talentId,
    };
    server
      .post('/chats/createchat', body)
      .then((res) => {
        const payload = {
          chatRooms: [
            ...userInfo?.chatRooms,
            {
              roomId: res.data.roomId,
              other: detailData.userInfo._id,
              count: 0,
            },
          ],
        };
        dispatch(updateChatRooms(payload)); // 새로운 채팅방 chatRooms에 추가
        dispatch(setIsFirstChat({ isFirstChat: true }));
      })
      .then(() => {
        history.push('/chatting');
      })
      .catch((err) => console.log(err));
  };

  return (
    <CONTAINER>
      <Modal />
      <SELLER>
        <img src={detailData?.userInfo.socialData.image} alt="프로필사진" />
        <div>{detailData?.userInfo.nickname}</div>
        <div>{detailData?.address}</div>
        <div>별점 평균 : {detailData?.ratings[0] ?? '별점 없음'}</div>
        <div>고용 횟수 : {detailData?.ratings[1] ?? '0'}회</div>
        <button onClick={handleFirstChat} type="button">
          채팅으로 거래하기
        </button>
      </SELLER>
      <DETAIL>
        {isClicked ? (
          <>
            <div>
              카테고리 :
              <select onBlur={(event) => setEditDetail(event.target.value)}>
                {categoryList.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
            가격 :{' '}
            <input
              type="number"
              ref={input}
              value={editDetail?.price}
              onChange={changeInput('price')}
              placeholder="입력값이 없으면 무료재능기부가 됩니다!"
            />
            원
            <input
              ref={input}
              value={editDetail?.title}
              onChange={changeInput('title')}
              placeholder="제목을 입력해주세요."
            />
            <input
              ref={input}
              value={editDetail?.description}
              onChange={changeInput('description')}
              placeholder="내용을 입력해주세요."
            />
            <button type="button" onClick={submitEdit}>
              {' '}
              Complete{' '}
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={handleClick}>
              {' '}
              Edit{' '}
            </button>
            <div>카테고리 : {editDetail?.category}</div>
            <div>가격 : {editDetail?.price}원</div>
            <div>{editDetail?.title}</div>
            <div>{editDetail?.description}</div>
            <button
              style={{ border: 'none', backgroundColor: '#FEE500', padding: '5px 10px', borderRadius: '20px' }}
              type="button"
              className="create-kakao-link-btn"
            >
              카톡으로 공유하기
            </button>
          </>
        )}
      </DETAIL>
      <PHOTOS>photos</PHOTOS>
      <Review />
    </CONTAINER>
  );
}

export default TalentDetailPage;
