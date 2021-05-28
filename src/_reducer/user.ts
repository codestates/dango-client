import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Chats {

export interface UserState {
  userInfo: {
    id: string;
    social: string;
    nickname: string;
    image: string | undefined;
    email: string | undefined;
    selling: any;
    buying: any;
    unreviewed: any;
    reviewed: any;
    chatRooms: any;
  } | null;
  accessToken: string | null;
  isSignin?: boolean;
}

export interface UpdateReviewPayload {
  talentId: string;
}

const initialState: UserState = {
  userInfo: null,
  accessToken: null,
  isSignin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<UserState>) => {
      state.userInfo = action.payload.userInfo;
      state.isSignin = true;
      state.accessToken = action.payload.accessToken;
      console.log('유저 정보', state.userInfo);
    },
    signout: () => {
      return initialState;
    },
    // 구매자가 리뷰를 등록하면 unreviewed에 있던 talentId를 reviewed로 옮겨준다.
    updateReview: (state, action: PayloadAction<UpdateReviewPayload>) => {
      const { talentId } = action.payload;
      if (state.userInfo) {
        const index = state.userInfo.unreviewed.indexOf(talentId);
        state.userInfo?.unreviewed.splice(index, 1);
        state.userInfo.reviewed.push(talentId);
      }
    },
    // 테스트용
    updateUnreviewed: (state, action: PayloadAction<{ talentId: string }>) => {
      state.userInfo?.unreviewed.push(action.payload.talentId);
    },

    modifyNickname: (state, action: PayloadAction<{ nickname: string }>) => {
      if (state.userInfo) {
        state.userInfo.nickname = action.payload.nickname;
      }
    },
  },
});

export const { signin, signout, updateReview, updateUnreviewed, modifyNickname } = userSlice.actions;

export default userSlice.reducer;
