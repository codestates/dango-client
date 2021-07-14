import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
  type: 'ok' | 'error' | 'danger';
  open: boolean;
  text: string;
  callbackName?: string;
  callbackData?: any;
}

export interface OpenPayload {
  type: 'ok' | 'error' | 'danger';
  text: string;
  callbackName?: 'goToRoot' | 'googleWithdrawal' | 'kakaoWithdrawal' | 'renewPage';
  callbackData?: any;
  onConfirm?: any;
  onCancle?: any;
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
    openModal: (state, action: PayloadAction<OpenPayload>) => {
      const newState = { ...action.payload, open: true };
      return newState;
    },

    closeModal: () => {
      return initialState;
    },

    // clickConfirm이 dispatch되면 openModal의 callback함수가 실행된다.
    clickConfirm: () => {
      return initialState;
    },
  },
});

export const { openModal, closeModal, clickConfirm } = modalSlice.actions;

export default modalSlice.reducer;
