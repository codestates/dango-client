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
    // [내가 구매완료 눌렀는지 정보, 모두 눌렀는지에 대한 정보]
    clickPurchase: boolean[];
  };
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
      console.log('유저 정보', state.userInfo);
    },
    signout: () => {
      return initialState;
    },
    // 구매자가 리뷰를 등록하면 unreviewed에 있던 talentId를 reviewed로 옮겨준다.
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

    purchaseComplete: (state, action: PayloadAction<{ talentId: string; confirmed: boolean }>) => {
      // 거래완료버튼을 눌렀을때 서버에서 confirmed를 boolean값으로 준다.

      const { talentId, confirmed } = action.payload;
      // 거래완료여부에 상관없이 해당 채팅룸의 clickPurchase를 true로 바꿔준다.
      if (state.userInfo) {
        const roomIndex = state.userInfo.chatRooms.findIndex((room: any) => room.talentId === talentId);
        console.log('찾은 roomIndex의 chatRooms', state.userInfo.chatRooms[roomIndex]);
        state.userInfo.chatRooms[roomIndex].clickPurchase[0] = true;

        // confirmed가 true면 거래완료된 것이므로 buying에있던 talentId를 unreviewed로 옮겨준다.
        if (confirmed) {
          state.userInfo.chatRooms[roomIndex].clickPurchase[1] = true;
          const index = state.userInfo.buying.indexOf(talentId);
          state.userInfo.buying.splice(index, 1);
          state.userInfo.unreviewed.push(talentId);
        }
      }
    },

    escapeRoom: (state, action: PayloadAction<{ talentId: string }>) => {
      const { talentId } = action.payload;
      if (state.userInfo) {
        // 나간 방과 일치하는 구매중목록의 talentId를 없애준다.
        const buyingIndex = state.userInfo.buying.indexOf(talentId);
        state.userInfo.buying.splice(buyingIndex, 1);

        // 나간 방과 일치하는 방을 chatRooms배열에서 없애준다.
        const roomIndex = state.userInfo.chatRooms.findIndex((room: any) => room.talentId === talentId);
        state.userInfo.chatRooms.splice(roomIndex, 1);
      }
    },
  },
});

export const { signin, signout, updateReview, modifyNickname, updateChatRooms, purchaseComplete, escapeRoom } =
  userSlice.actions;

export default userSlice.reducer;
