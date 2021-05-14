import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  id: number;
  social: string;
  nickname: string;
  image: string | undefined;
  email: string | undefined;
}

export interface UserState {
  userInfo: UserInfo | null;
  accessToken: string | null;
  isSignIn?: boolean;
}

const initialState: UserState = {
  userInfo: null,
  accessToken: null,
  isSignIn: false,
};

export const userSilce = createSlice({
  name: 'signin',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserState>) => {
      state.userInfo = action.payload.userInfo;
      state.isSignIn = true;
      state.accessToken = action.payload.accessToken;
    },
    signOut: (state) => {
      return initialState;
    },
  },
});

export const { signIn, signOut } = userSilce.actions;

export default userSilce.reducer;
// index

// export {};
// 사용 할 때 dispatch(login(response.data?)) 해주면 되려나??
// 로그아웃 할 때는 로컬스토리지를 비워주는??
