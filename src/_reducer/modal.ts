import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
  type: 'ok' | 'error' | 'danger';
  open: boolean;
  text: string;
}

export interface OpenPayload {
  type: 'ok' | 'error' | 'danger';
  text: string;
}

const initialState: ModalState = {
  type: 'ok',
  open: false,
  text: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // 사용: dispatch(openModal({type: 'ok', text:'에러메시지입니다.'}))
    openModal: (state, action: PayloadAction<OpenPayload>) => {
      console.log('open');
      const newState = { ...action.payload, open: true };
      return newState;
    },
    // 따로 사용x 모달에 내장되어있음.
    closeModal: () => {
      console.log('close');
      return initialState;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;