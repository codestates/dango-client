import { call, put, takeLatest, race, take } from 'redux-saga/effects';
import { clickConfirm, openModal, closeModal } from './modalSlice';

export function* handleConfirm(action: ReturnType<typeof openModal>) {
  const { confirm } = yield race({ confirm: take(clickConfirm), cancle: take(closeModal) });

  if (confirm) {
    action.payload.onConfirm?.();
  } else {
    action.payload.onCancle?.();
  }
}

export default function* watchOpen() {
  yield takeLatest(openModal.type, handleConfirm);
}
