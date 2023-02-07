import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../reducers";

type State = {
  getMeLoading: boolean;
  getMeDone: boolean;
  getMeError: null | any;
  me: null;
  nickNameChangeLoading: boolean;
  nickNameChangeDone: boolean;
  nickNameChangeError: null | any;
  customId: string;
  number: number;
};

const initialState: State = {
  getMeLoading: false,
  getMeDone: false,
  getMeError: null,
  me: null,
  nickNameChangeLoading: false,
  nickNameChangeDone: false,
  nickNameChangeError: null,
  customId: "",
  number: 0,
};

const reducers = {
  test: (state: State) => {
    console.log("11111");
    state.number = state.number + 1;
  },
  // updateConsultationTopics: (
  //   state: State,
  //   action: PayloadAction<IConsultationTopic[]>,
  // ) => {
  //   if (state.me) {
  //     state.me.memberAdvisorTotalInfoDto.consultationFields = action.payload;
  //   }
  // },
  // updateMe: (state: State, action: PayloadAction<IMember>) => {
  //   state.me = action.payload;
  // },
  // switchCustAssetsPublic: (state: State, action: PayloadAction<number>) => {
  //   if (state.me) {
  //     state.me.isCustAssetsPublic = action.payload;
  //   }
  // },
  // updateIncome: (state: State, action: PayloadAction<string>) => {
  //   if (state.me) {
  //     state.me.income = action.payload;
  //   }
  // },
  // updateTypeWorks: (state: State, action: PayloadAction<string>) => {
  //   if (state.me) {
  //     state.me.typeWorks = action.payload;
  //   }
  // },
  // updateOccupation: (state: State, action: PayloadAction<string>) => {
  //   if (state.me) {
  //     state.me.occupation = action.payload;
  //   }
  // },
  // updateDescription: (state: State, action: PayloadAction<string>) => {
  //   if (state.me) {
  //     state.me.description = action.payload;
  //   }
  // },
  // updateProfileImageUrl: (state: State, action: PayloadAction<string>) => {
  //   if (state.me) {
  //     state.me.profileImageUrl = action.payload;
  //   }
  // },
  // updateNickname: (state: State, action: PayloadAction<string>) => {
  //   if (state.me) {
  //     state.me.nickName = action.payload;
  //   }
  // },
  // nickNameChangeInit: (state: State) => {
  //   state.nickNameChangeLoading = false;
  //   state.nickNameChangeDone = false;
  //   state.nickNameChangeError = false;
  // },
  // nickNameChangeRequest: (
  //   state: State,
  //   _action: PayloadAction<INickNameChangeRequest>,
  // ) => {
  //   state.nickNameChangeLoading = true;
  // },
  // // nickNameChangeSuccess: (state: State, action: PayloadAction<string>) => {
  // //   state.nickNameChangeLoading = false;
  // //   state.nickNameChangeDone = true;
  // //   if (state.me) {
  // //     state.me.custNicknm = action.payload;
  // //   }
  // // },
  // nickNameChangeFailure: (state: State, action: PayloadAction<any>) => {
  //   state.nickNameChangeLoading = false;
  //   state.nickNameChangeDone = false;
  //   state.nickNameChangeError = action.payload;
  // },
  // getMeInit: (state: State) => {
  //   state.getMeLoading = false;
  //   state.getMeDone = false;
  //   state.getMeError = false;
  //   state.me = null;
  // },
  // getMeRequest: (state: State) => {
  //   state.getMeLoading = true;
  // },
  // getMeSuccess: (state: State, action: PayloadAction<IMember>) => {
  //   state.getMeLoading = false;
  //   state.getMeDone = true;
  //   state.me = action.payload;
  // },
  // getMeFailure: (state: State, action: PayloadAction<any>) => {
  //   state.getMeLoading = false;
  //   state.getMeDone = false;
  //   state.getMeError = action.payload;
  //   state.customId = uuidv4();
  // },
};

const name: string = "auth";
export const authSlice = createSlice({
  name,
  initialState,
  reducers,
});
const selectGetMeState = createSelector(
  (state: State) => state.getMeLoading,
  (state: State) => state.getMeDone,
  (state: State) => state.getMeError,
  (state: State) => state.me,
  (state: State) => state.customId,
  (state: State) => state.number,
  (getMeLoading, getMeDone, getMeError, me, customId, number) => {
    return {
      getMeLoading,
      getMeDone,
      getMeError,
      me,
      customId,
      number,
    };
  }
);

const selectNickNameChangeState = createSelector(
  (state: State) => state.nickNameChangeLoading,
  (state: State) => state.nickNameChangeDone,
  (state: State) => state.nickNameChangeError,
  (nickNameChangeLoading, nickNameChangeDone, nickNameChangeError) => {
    return {
      nickNameChangeLoading,
      nickNameChangeDone,
      nickNameChangeError,
    };
  }
);

export const auth = authSlice.name;
export const authReducer = authSlice.reducer;
export const authAction = authSlice.actions;

export const authSelector = {
  getMe: (state: RootState) => selectGetMeState(state[auth]),
  nickNameChange: (state: RootState) => selectNickNameChangeState(state[auth]),
};
