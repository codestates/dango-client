import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TalentState {
  talentId: string;
  sellerId: string;
  reviews: {
    _id: string;
    reviewId: string;
    nickname: string;
    rating: number;
    review: string;
    date: string;
    reply?: {
      replyDescription: string;
      replyDate: string;
    };
  }[];
  userId?: string;
  userRole: 'normal' | 'reviewer' | 'seller';
}

interface UpdateReplyPayload {
  reviewId: string;
  replyDate: string;
  replyDescription: string;
}

const initialState: TalentState = {
  talentId: '',
  sellerId: '',
  reviews: [],
  userId: '',
  userRole: 'normal',
};

export const talentSlice = createSlice({
  name: 'talent',
  initialState,
  reducers: {
    postTalentData: (state, action: PayloadAction<TalentState>) => {
      return action.payload;
    },
    updateReply: (state, action: PayloadAction<UpdateReplyPayload>) => {
      const { reviewId, replyDate, replyDescription } = action.payload;

      for (let i = 0; i < state.reviews.length; i++) {
        if (state.reviews[i].reviewId === reviewId) {
          state.reviews[i].reply = { replyDate, replyDescription };
          break;
        }
      }
    },
  },
});

export const { postTalentData, updateReply } = talentSlice.actions;

export default talentSlice.reducer;
