import createSagaMiddleware from "@redux-saga/core";
import { configureStore, Store } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { Task } from "redux-saga";
import reducer from "../reducers";
import rootSaga from "../sagas";

interface SagaStore extends Store {
  sagaTask?: Task;
}

const store = () => {
  const devMode = process.env.NODE_ENV === "development"; // 개발모드
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: reducer,
    middleware: [sagaMiddleware],
    devTools: devMode,
  });

  // Next Redux Toolkit 에서 saga를 사용해야할 때
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(store, {
  // 이 부분이 true면 디버그때 자세한 설명이 나옵니다. (개발할때는 true로)
  debug: process.env.NODE_ENV === "development",
});

export default store;
