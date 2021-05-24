import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
  type: 'ok' | 'yesno';
  open: boolean;
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
    open: (state, action: PayloadAction<ModalState>) => {
      state = action.payload;
    },
    close: () => {
      return initialState;
    },
  },
});

export const { open, close } = modalSlice.actions;

export default modalSlice.reducer;
