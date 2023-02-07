import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ReducerState } from "react";
import { auth, authReducer } from "../features/Auth/slice";

const rootReducer = combineReducers({
  [auth]: authReducer,
});

export const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return rootReducer(state, action);
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
