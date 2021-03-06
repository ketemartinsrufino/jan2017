import { takeLatest } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from 'api/actions';
import defaultFetch from 'api/sagas/fetch/defaultFetch.js';

export const failure = payload => ({
  type: actions.user.registerFailure,
  payload,
});

export function* prepareSaga(action) {
  const payload = yield call(defaultFetch, '/api/register', action.payload, 'POST');
  const { error } = payload;
  if (error) {
    yield put(failure(error));
  } else {
    yield put({ type: actions.user.logged, payload });
    yield put(push('/'));
  }
}

export default function* watchRegister() {
  yield takeLatest(actions.user.register, prepareSaga);
}
