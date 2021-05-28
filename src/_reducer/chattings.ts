import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChattingsState {
  isFromDetail: boolean;
  isFirstChat: boolean;
  talentId: string;
}

const initialState: ChattingsState = {
  isFromDetail: false,
  isFirstChat: true,
  talentId: '',
};

export const chattingsSlice = createSlice({
  name: 'chattings',
  initialState,
  reducers: {
    setIsFirstChat: (state, action: PayloadAction<ChattingsState>) => {
      state.isFromDetail = action.payload.isFromDetail;
      state.isFirstChat = action.payload.isFirstChat;
      state.talentId = action.payload.talentId;
    },
  },
});

export const { setIsFirstChat } = chattingsSlice.actions;
export default chattingsSlice.reducer;
