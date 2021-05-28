import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChattingsState {
  isFirstChat: boolean;
}

const initialState: ChattingsState = {
  isFirstChat: false,
};

export const chattingsSlice = createSlice({
  name: 'chattings',
  initialState,
  reducers: {
    setIsFirstChat: (state, action: PayloadAction<ChattingsState>) => {
      state.isFirstChat = action.payload.isFirstChat;
    },
  },
});

export const { setIsFirstChat } = chattingsSlice.actions;
export default chattingsSlice.reducer;
