import { all } from "redux-saga/effects";
import auth from "../features/Auth/saga";

export default function* userSaga() {
  yield all([auth()]);
}
