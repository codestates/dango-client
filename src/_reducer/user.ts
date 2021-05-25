import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Checked {
  _id: string | null;
  confirmed: [string] | null;
}

export interface UserState {
  userInfo: {
    id: string;
    social: string;
    nickname: string;
    image: string | undefined;
    email: string | undefined;
    selling: [string] | null;
    buying: [Checked] | null;
    unreviewed: [string] | null;
    reviewed: [string] | null;
    talks: [string] | null;
  } | null;
  accessToken: string | null;
  isSignin?: boolean;
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
  },
});

export const { signin, signout } = userSlice.actions;

export default userSlice.reducer;
