import { call, put, takeLatest, race, take } from 'redux-saga/effects';
import { clickConfirm, openModal } from './modalSlice';

export function* handleConfirm(action: ReturnType<typeof openModal>) {
  const { confirm } = yield race({ confirm: take(clickConfirm.type) });

  if (confirm) {
    action.payload.callback?.();
  }
}

export default function* watchOpen() {
  yield takeLatest(openModal.type, handleConfirm);
}
