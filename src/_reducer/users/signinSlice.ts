import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
    id: number;
    nickname: string | null;
    image: string | undefined;  // null?
    email: string | null;
}

interface SigninState {
    user: UserInfo | null;
    isSignIn: boolean;
}

const initialState: SigninState = {
    user: null,
    isSignIn: false,
}

export const signinSlice = createSlice({
    name: "signin",
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<UserInfo>) => {
            const newState = state;
            newState.user = action.payload;
            newState.isSignIn = true;
        },
        signOut: (state) => {
            const newState = state;
            newState.user = null;
            newState.isSignIn = false;
        },
        getUser: (state, action: PayloadAction<UserInfo>) => {
            const newState = state;
            newState.user = action.payload;
        }
    }
})

export const { signIn, signOut, getUser } = signinSlice.actions;

export default signinSlice.reducer;
// index


// export {};
// 사용 할 때 dispatch(login(response.data?)) 해주면 되려나??
// 로그아웃 할 때는 로컬스토리지를 비워주는??