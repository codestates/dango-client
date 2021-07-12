import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Review from './Sections/Review';
import { RootState } from '../../../_reducer';
import { postTalentData, TalentState } from '../../../_reducer/talent';
import { updateChatRooms, UpdateChatRoomsPayload } from '../../../_reducer/user';
import { setIsFirstChat } from '../../../_reducer/chattings';
import { openModal } from '../../../_reducer/modal';
import Loading from '../LandingPage/Sections/Loading';
import server from '../../../api';
import {
  CONTAINER,
  SELLER,
  DETAIL,
  PHOTOS,
  PROFILE,
  PROFILEIMG,
  NICKNAME,
  ADDRESS,
  GRADE,
  RATING,
  COUNT,
  BUTTONDIV,
  TOP,
  CATEGORY,
  PRICE,
  TITLE,
  DESCRIPTION,
  BOTTOM,
  SHAREBOX,
  IMG,
  TEXTAREA,
  SHAREDIV,
  SHARETEXTAREA,
  KAKAO,
  CLIP,
  PRICEINPUT,
  TITLEINPUT,
  EDITDESC,
  EDITCATEGORY,
  OPTION,
  PHOTODIV,
  PHOTO,
  NO_PHOTO,
} from './TalentDetailPageStyle';
import Modal from '../../../utils/modal';
import { SBUTTON } from '../../../styles/Buttons';

declare global {
  interface Window {
    Kakao: any;
  }
}

interface Props {
  connectSocket: any;
}
function TalentDetailPage({ connectSocket }: Props): JSX.Element {
  const { Kakao } = window;
  const { userInfo } = useSelector((state: RootState) => state.user, shallowEqual);
  const { isFromDetail, isFirstChat } = useSelector((state: RootState) => state.chattings);
  const { userRole } = useSelector((state: RootState) => state.talent, shallowEqual);

  const dispatch = useDispatch();
  const history = useHistory();
  const [detailData, setDetailData] = useState<any>();
  const [editDetail, setEditDetail] = useState<any>();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<number>(0);
  const input = useRef<HTMLInputElement | null>(null);
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const copyUrlRef = useRef<HTMLTextAreaElement | null>(null);
  const select = useRef<HTMLSelectElement | null>(null);

  const { talentId } = useParams<{ talentId: string }>();
  const categoryList = ['홈/리빙', '비즈니스', '개발/디자인', '건강', '레슨', '반려동물', '기타'];

  useEffect(() => {
    server
      .get(`/talents/detail/${talentId}`)
      .then((res) => {
        let userRole: 'normal' | 'seller' | 'reviewer' = 'normal';

        if (userInfo) {
          if (res.data.userInfo._id === userInfo.id) {
            userRole = 'seller';
          } else if (userInfo.unreviewed?.indexOf(talentId) !== -1) {
            userRole = 'reviewer';
          }
        }

        const payload: TalentState = {
          talentId,
          sellerId: res.data.userInfo._id,
          sellerNickname: res.data.userInfo.nickname,
          reviews: res.data.reviews.reverse(),
          userId: userInfo?.id,
          userRole,
        };
        dispatch(postTalentData(payload));
        setDetailData(res.data);
        setEditDetail(res.data);
      })
      .catch(() => '');
  }, [userInfo]);

  useEffect(() => {
    Kakao.Link.createDefaultButton({
      container: '.create-kakao-link-btn',
      objectType: 'location',
      address: detailData ? detailData.address.split('(')[0] : '홍대입구역',
      addressTitle: 'DANGO',
      content: {
        title: `DANGO와 나누는 재능, ${detailData?.title}`,
        description: detailData?.description,
        imageUrl: 'https://dango.s3.amazonaws.com/image/original/kakaodango.png',
        link: {
          mobileWebUrl: `http://dango.kr/detail/${talentId}`,
          webUrl: `http://dango.kr/detail/${talentId}`,
        },
      },
      social: {
        likeCount: 930,
        commentCount: 75,
        sharedCount: 401,
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: `http://dango.kr/detail/${talentId}`,
            webUrl: `http://dango.kr/detail/${talentId}`,
          },
        },
      ],
    });
  }, [detailData]);

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
      dispatch(openModal({ type: 'error', text: '모든 내용을 입력해주세요.' }));
    } else {
      const body = {
        userId: userInfo?.id,
        talentId,
        ...editDetail,
      };
      server
        .post('/talents/edit', body)
        .then((response) => {
          setEditDetail(response.data.data);
          setIsClicked(false);
          dispatch(openModal({ type: 'ok', text: '수정이 완료되었습니다.' }));
        })
        .catch(() => '');
    }
  };

  const handleChat = () => {
    if (!userInfo) {
      dispatch(openModal({ type: 'error', text: '로그인이 필요한 서비스입니다.' }));
    } else {
      if (userInfo?.chatRooms?.find((room: any) => room.talentId === talentId) === undefined) {
        const body = {
          userId: userInfo?.id,
          otherId: detailData.userInfo._id,
          talentId,
        };
        server
          .post('/chats/createchat', body)

          .then((res) => {
            connectSocket.emit('initChat', body.otherId, res.data.roomId);
            return res;
          })
          .then((res) => {
            const payload: UpdateChatRoomsPayload = {
              chatRooms: {
                talentId,
                roomId: res.data.roomId,
                count: 0,
                otherId: detailData.userInfo._id,
                otherNickname: detailData.userInfo.nickname,
                profileImage: detailData.userInfo.socialData.image,
                clickPurchase: [false, false],
                otherIsJoined: true,
              },
            };
            dispatch(updateChatRooms(payload));
            dispatch(setIsFirstChat({ isFromDetail: true, isFirstChat: true, talentId }));
          })
          .then(() => {
            history.push('/chatting');
          })
          .catch(() => '');
      } else {
        dispatch(setIsFirstChat({ isFromDetail: true, isFirstChat: false, talentId }));
        history.push('/chatting');
      }
    }
  };

  const handleCopyUrl = (event: any): void => {
    if (!document.queryCommandSupported('copy')) {
      dispatch(openModal({ type: 'error', text: '링크 복사가 지원되지 않는 브라우저입니다.' }));
    }
    if (copyUrlRef.current) {
      copyUrlRef.current.select();
      document.execCommand('copy');
      event.target.focus();
      setTimeout(() => {
        dispatch(openModal({ type: 'ok', text: '링크 복사 완료!' }));
      }, 200);
    }
  };

  return (
    <CONTAINER>
      <Modal />
      {detailData?.images.length !== loaded && <Loading size="12vw" />}
      <SELLER>
        <PROFILE>
          <PROFILEIMG>
            <IMG src={detailData?.userInfo?.socialData?.image} alt="프로필사진" />
          </PROFILEIMG>
          <NICKNAME>{detailData?.userInfo?.nickname}</NICKNAME>
        </PROFILE>
        <GRADE>
          <RATING>별점 평균 : {Math.round(detailData?.ratings[0] * 10) / 10 ?? '0'} / 5</RATING>
          <COUNT>고용 횟수 : {detailData?.ratings[1] ?? '0'}회</COUNT>
        </GRADE>
        <BUTTONDIV>
          {userRole === 'seller' ? (
            isClicked ? (
              <></>
            ) : (
              <SBUTTON style={{ marginTop: '5px' }} type="button" onClick={handleClick}>
                재능 수정하기
              </SBUTTON>
            )
          ) : (
            <SBUTTON onClick={handleChat} type="button">
              채팅으로 거래하기
            </SBUTTON>
          )}
        </BUTTONDIV>
      </SELLER>
      <DETAIL>
        {isClicked ? (
          <>
            <CATEGORY>
              카테고리 :
              <EDITCATEGORY ref={select} onChange={changeInput('category')} defaultValue={editDetail?.category}>
                {categoryList.map((category) => (
                  <OPTION key={category}>{category}</OPTION>
                ))}
              </EDITCATEGORY>
            </CATEGORY>
            <TITLE>
              <TITLEINPUT
                ref={input}
                defaultValue={editDetail?.title}
                onChange={changeInput('title')}
                placeholder="제목을 입력해주세요."
              />
            </TITLE>
            <PRICE>
              <PRICEINPUT
                type="number"
                ref={input}
                defaultValue={editDetail?.price}
                onChange={changeInput('price')}
                placeholder="입력값이 없으면 무료재능기부가 됩니다!"
                min="0"
              />
              원
            </PRICE>

            <EDITDESC>
              <TEXTAREA
                ref={textarea}
                defaultValue={editDetail?.description}
                onChange={changeInput('description')}
                placeholder="내용을 입력해주세요."
              />
            </EDITDESC>
            <BOTTOM>
              <ADDRESS>{detailData?.address}</ADDRESS>
              <SBUTTON type="button" onClick={submitEdit}>
                수정 완료
              </SBUTTON>
            </BOTTOM>
          </>
        ) : (
          <>
            <CATEGORY>카테고리 : {editDetail?.category}</CATEGORY>
            <TITLE>{editDetail?.title}</TITLE>
            <PRICE>{editDetail?.price}원</PRICE>
            <DESCRIPTION>{editDetail?.description}</DESCRIPTION>

            <BOTTOM>
              <ADDRESS>{detailData?.address}</ADDRESS>
              <SHAREBOX>
                <SHAREDIV className="create-kakao-link-btn" style={{ marginRight: '1rem' }}>
                  <KAKAO src="/images/kakao.png" alt="kakao" />
                </SHAREDIV>
                <SHAREDIV onClick={handleCopyUrl}>
                  <CLIP src="/images/link.png" alt="link" />
                  <form>
                    <SHARETEXTAREA ref={copyUrlRef} defaultValue={window.location.href} />
                  </form>
                </SHAREDIV>
              </SHAREBOX>
            </BOTTOM>
          </>
        )}
      </DETAIL>
      <PHOTOS>
        <PHOTODIV>
          {detailData?.images[0] ? (
            <PHOTO src={detailData.images[0]} alt="사진" onLoad={() => setLoaded((previous) => previous + 1)} />
          ) : (
            <NO_PHOTO src="/images/No_image.png" alt="사진" />
          )}
        </PHOTODIV>
        <PHOTODIV>
          {detailData?.images[1] ? (
            <PHOTO src={detailData.images[1]} alt="사진" onLoad={() => setLoaded((previous) => previous + 1)} />
          ) : (
            <NO_PHOTO src="/images/No_image.png" alt="사진" />
          )}
        </PHOTODIV>
        <PHOTODIV>
          {detailData?.images[2] ? (
            <PHOTO src={detailData.images[2]} alt="사진" onLoad={() => setLoaded((previous) => previous + 1)} />
          ) : (
            <NO_PHOTO src="/images/No_image.png" alt="사진" />
          )}
        </PHOTODIV>
      </PHOTOS>
      <Review />
    </CONTAINER>
  );
}

export default TalentDetailPage;
