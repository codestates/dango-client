import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Review from './Sections/Review';
import { RootState } from '../../../_reducer';
import { postTalentData, TalentState } from '../../../_reducer/talent';
import { updateChatRooms, UpdateChatRoomsPayload } from '../../../_reducer/user';
import { setIsFirstChat } from '../../../_reducer/chattings';
import { openModal } from '../../../_reducer/modalSlice';
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
  const categoryList = ['???/??????', '????????????', '??????/?????????', '??????', '??????', '????????????', '??????'];

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
      address: detailData ? detailData.address.split('(')[0] : '???????????????',
      addressTitle: 'DANGO',
      content: {
        title: `DANGO??? ????????? ??????, ${detailData?.title}`,
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
          title: '????????? ??????',
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
      dispatch(openModal({ type: 'error', text: '?????? ????????? ??????????????????.' }));
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
          dispatch(openModal({ type: 'ok', text: '????????? ?????????????????????.' }));
        })
        .catch(() => '');
    }
  };

  const handleChat = () => {
    if (!userInfo) {
      dispatch(openModal({ type: 'error', text: '???????????? ????????? ??????????????????.' }));
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
      dispatch(openModal({ type: 'error', text: '?????? ????????? ???????????? ?????? ?????????????????????.' }));
    }
    if (copyUrlRef.current) {
      copyUrlRef.current.select();
      document.execCommand('copy');
      event.target.focus();
      setTimeout(() => {
        dispatch(openModal({ type: 'ok', text: '?????? ?????? ??????!' }));
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
            <IMG src={detailData?.userInfo?.socialData?.image} alt="???????????????" />
          </PROFILEIMG>
          <NICKNAME>{detailData?.userInfo?.nickname}</NICKNAME>
        </PROFILE>
        <GRADE>
          <RATING>?????? ?????? : {Math.round(detailData?.ratings[0] * 10) / 10 ?? '0'} / 5</RATING>
          <COUNT>?????? ?????? : {detailData?.ratings[1] ?? '0'}???</COUNT>
        </GRADE>
        <BUTTONDIV>
          {userRole === 'seller' ? (
            isClicked ? (
              <></>
            ) : (
              <SBUTTON style={{ marginTop: '5px' }} type="button" onClick={handleClick}>
                ?????? ????????????
              </SBUTTON>
            )
          ) : (
            <SBUTTON onClick={handleChat} type="button">
              ???????????? ????????????
            </SBUTTON>
          )}
        </BUTTONDIV>
      </SELLER>
      <DETAIL>
        {isClicked ? (
          <>
            <CATEGORY>
              ???????????? :
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
                placeholder="????????? ??????????????????."
              />
            </TITLE>
            <PRICE>
              <PRICEINPUT
                type="number"
                ref={input}
                defaultValue={editDetail?.price}
                onChange={changeInput('price')}
                placeholder="???????????? ????????? ????????????????????? ?????????!"
                min="0"
              />
              ???
            </PRICE>

            <EDITDESC>
              <TEXTAREA
                ref={textarea}
                defaultValue={editDetail?.description}
                onChange={changeInput('description')}
                placeholder="????????? ??????????????????."
              />
            </EDITDESC>
            <BOTTOM>
              <ADDRESS>{detailData?.address}</ADDRESS>
              <SBUTTON type="button" onClick={submitEdit}>
                ?????? ??????
              </SBUTTON>
            </BOTTOM>
          </>
        ) : (
          <>
            <CATEGORY>???????????? : {editDetail?.category}</CATEGORY>
            <TITLE>{editDetail?.title}</TITLE>
            <PRICE>{editDetail?.price}???</PRICE>
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
            <PHOTO src={detailData.images[0]} alt="??????" onLoad={() => setLoaded((previous) => previous + 1)} />
          ) : (
            <NO_PHOTO src="/images/No_image.png" alt="??????" />
          )}
        </PHOTODIV>
        <PHOTODIV>
          {detailData?.images[1] ? (
            <PHOTO src={detailData.images[1]} alt="??????" onLoad={() => setLoaded((previous) => previous + 1)} />
          ) : (
            <NO_PHOTO src="/images/No_image.png" alt="??????" />
          )}
        </PHOTODIV>
        <PHOTODIV>
          {detailData?.images[2] ? (
            <PHOTO src={detailData.images[2]} alt="??????" onLoad={() => setLoaded((previous) => previous + 1)} />
          ) : (
            <NO_PHOTO src="/images/No_image.png" alt="??????" />
          )}
        </PHOTODIV>
      </PHOTOS>
      <Review />
    </CONTAINER>
  );
}

export default TalentDetailPage;
