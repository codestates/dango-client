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
    openModal: (state, action: PayloadAction<OpenPayload>) => {
      console.log('open');
      const newState = { ...action.payload, open: true };
      return newState;
    },
    closeModal: () => {
      console.log('close');
      return initialState;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
