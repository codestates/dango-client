import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChattingsState {
  isFromDetail: boolean;
  isFirstChat: boolean;
  talentId: string;
  render: any[];
  page: number;
}

const initialState: ChattingsState = {
  isFromDetail: false,
  isFirstChat: true,
  talentId: '',
  render: [],
  page: 0,
};

interface setIsFirstChatPayLoad {
  isFromDetail: boolean;
  isFirstChat: boolean;
  talentId: string;
}
export const chattingsSlice = createSlice({
  name: 'chattings',
  initialState,
  reducers: {
    setIsFirstChat: (state, action: PayloadAction<setIsFirstChatPayLoad>) => {
      state.isFromDetail = action.payload.isFromDetail;
      state.isFirstChat = action.payload.isFirstChat;
      state.talentId = action.payload.talentId;
    },
    newChattingRoom: (state) => {
      state.render = [];
      state.page = 0;
    },

    clickMoreBtn: (state) => {
      state.page++;
    },
    getChattingData: (state, action: PayloadAction<{ data: any[] }>) => {
      const newState = { ...state, render: [...action.payload.data, ...state.render] };
      return newState;
    },
  },
});

export const { setIsFirstChat, newChattingRoom, clickMoreBtn, getChattingData } = chattingsSlice.actions;
export default chattingsSlice.reducer;
