import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  id: string;
  social: string;
  nickname: string;
  image: string | undefined;
  email: string | undefined;
}

export interface UserState {
  userInfo: UserInfo | null;
  accessToken: string | null;
  isSignin?: boolean;
}

const initialState: UserState = {
  userInfo: null,
  accessToken: null,
  isSignin: false,
};

export const userSilce = createSlice({
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

export const { signin, signout } = userSilce.actions;

export default userSilce.reducer;
// index

// export {};
// 사용 할 때 dispatch(login(response.data?)) 해주면 되려나??
// 로그아웃 할 때는 로컬스토리지를 비워주는??
