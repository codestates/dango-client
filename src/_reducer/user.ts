import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Chats {
  roomId: string | null;
  other: string | null;
  count: number | null;
}

export interface UserState {
  userInfo: {
    id: string;
    social: string;
    nickname: string;
    image: string | undefined;
    email: string | undefined;
    selling: [string] | null;
    buying: [string] | null;
    unreviewed: [string];
    reviewed: [string];
    talks: [Chats] | null;
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
    },
    signout: () => {
      return initialState;
    },
    updateReview: (state, action: PayloadAction<UpdateReviewPayload>) => {
      const { talentId } = action.payload;
      if (state.userInfo) {
        const index = state.userInfo.unreviewed.indexOf(talentId);
        state.userInfo?.unreviewed.splice(index, 1);
        state.userInfo.reviewed.push(talentId);
      }
    },
  },
});

export const { signin, signout, updateReview } = userSlice.actions;

export default userSlice.reducer;
