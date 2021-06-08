import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export interface UpdateChatRoomsPayload {
  chatRooms: {
    talentId: string;
    roomId: string;
    count: number;
    otherId: string;
    otherNickname: string;
    profileImage: string;
    clickPurchase: boolean[];
    otherIsJoined: boolean;
  };
}
export interface RenewChatRoomsPayload {
  chatRooms: {
    talentId: string;
    roomId: string;
    count: number;
    otherId: string;
    otherNickname: string;
    profileImage: string;
    clickPurchase: boolean[];
    otherIsJoined: boolean;
  }[];
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
        state.userInfo.unreviewed.splice(index, 1);
        state.userInfo.reviewed.push(talentId);
      }
    },

    modifyNickname: (state, action: PayloadAction<{ nickname: string }>) => {
      if (state.userInfo) {
        state.userInfo.nickname = action.payload.nickname;
      }
    },

    updateChatRooms: (state, action: PayloadAction<UpdateChatRoomsPayload>) => {
      if (state.userInfo) {
        state.userInfo.chatRooms.push(action.payload.chatRooms);
      }
    },
    renewChatRooms: (state, action: PayloadAction<RenewChatRoomsPayload>) => {
      if (state.userInfo) {
        state.userInfo.chatRooms = action.payload.chatRooms;
      }
    },

    updatePurchase: (state, action: PayloadAction<{ roomId: string; who: 'mine' | 'other'; talentId: string }>) => {
      // 거래완료버튼을 눌렀을때 서버에서 confirmed를 boolean값으로 준다.

      const { roomId, who, talentId } = action.payload;
      if (state.userInfo) {
        const roomIndex = state.userInfo.chatRooms.findIndex((room: any) => room.roomId === roomId);

        const { clickPurchase } = state.userInfo.chatRooms[roomIndex];
        if (who === 'mine') {
          clickPurchase[0] = true;
          // who가 'other'이고 내가 이미 구매완료버튼을 누른경우, buying의 talentId를 unreviewed로 옮겨준다.
        } else {
          clickPurchase[1] = true;
        }

        if (clickPurchase[0] === true && clickPurchase[1] === true) {
          const index = state.userInfo.buying.indexOf(talentId);
          state.userInfo.buying.splice(index, 1);
          state.userInfo.unreviewed.push(talentId);
        }
      }
    },

    escapeRoom: (state, action: PayloadAction<{ talentId: string }>) => {
      const { talentId } = action.payload;
      if (state.userInfo) {
        const buyingIndex = state.userInfo.buying.indexOf(talentId);
        state.userInfo.buying.splice(buyingIndex, 1);

        const roomIndex = state.userInfo.chatRooms.findIndex((room: any) => room.talentId === talentId);
        state.userInfo.chatRooms.splice(roomIndex, 1);
      }
    },
    initCount: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      if (state.userInfo) {
        state.userInfo.chatRooms[index].count = 0;
      }
    },
  },
});

export const {
  signin,
  signout,
  updateReview,
  modifyNickname,
  updateChatRooms,
  renewChatRooms,
  updatePurchase,
  escapeRoom,
  initCount,
} = userSlice.actions;

export default userSlice.reducer;
