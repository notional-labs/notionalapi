import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { all, fork, put, takeLatest, call, delay } from "redux-saga/effects";
import { authAction } from "./slice";

// async function nickNameChangeAPI(
//   nickNameChangeRequest: INickNameChangeRequest,
// ) {
//   return await axios.put('member/nick', nickNameChangeRequest);
// }

// function* nickNameChange(action: PayloadAction<INickNameChangeRequest>) {
//   const {nickNameChangeSuccess, nickNameChangeFailure} = authAction;
//   try {
//     const result: AxiosResponse<INickNameChangeResponse> = yield call(
//       nickNameChangeAPI,
//       action.payload,
//     );
//     if (result?.data?.common?.message === 'success') {
//       yield put(nickNameChangeSuccess(action.payload.nickNm));
//     }
//   } catch (error: any | AxiosError) {
//     console.log('catch!!!');
//     if (axios.isAxiosError(error)) {
//       // Access to config, request, and response
//       const errorResponse: InickNameChangeErrorResponse = error.response!.data;
//       yield put(nickNameChangeFailure(errorResponse));
//     } else {
//       // Just a stock error
//       yield put(nickNameChangeFailure(error));
//     }
//   }
// }

// export function* watchNickNameChange() {
//   const {nickNameChangeRequest} = authAction;
//   yield takeLatest(nickNameChangeRequest, nickNameChange);
// }

// async function getMeAPI() {
//   try {
//     const response = await axios.get('auth/me');
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }

// function* getMe() {
//   const {getMeSuccess, getMeFailure} = authAction;
//   try {
//     const result: AxiosResponse<IGetMeResponse> = yield call(getMeAPI);
//     if (result.data.common.message === 'success') {
//       yield put(getMeSuccess(result.data.data));
//     } else {
//       yield put(getMeFailure(result.data.common.message));
//     }
//   } catch (error: any | AxiosError) {
//     if (axios.isAxiosError(error)) {
//       // Access to config, request, and response
//       const errorResponse: IGetMeErrorResponse = error.response!;
//       yield put(getMeFailure(errorResponse));
//     } else {
//       // Just a stock error
//       console.log('error!!!!');
//       yield put(getMeFailure(error));
//     }
//   }
// }

// export function* watchGetMe() {
//   const {getMeRequest} = authAction;
//   yield takeLatest(getMeRequest, getMe);
// }

function* loadTestAPI() {
  console.log("loadTestAPI");
  yield delay(5000);
}
function* loadTest() {
  console.log("loadTest");
  yield call(loadTestAPI);
  console.log("finish");
}

export function* watchTest() {
  const { test } = authAction;
  yield takeLatest(test, loadTest);
}

export default function* mainSaga() {
  yield all([fork(watchTest)]);
}
