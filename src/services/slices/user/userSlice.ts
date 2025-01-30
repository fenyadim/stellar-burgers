import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUserThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  updateUserThunk
} from './action';

interface RejectedAction extends Action {
  error: Error;
}

type TInitalState = {
  isAuthChecked: boolean;
  user: TUser | null;
  error: string | undefined;
};

export const initialUserState: TInitalState = {
  isAuthChecked: false,
  user: null,
  error: undefined
};

const fulfilledAction = (state: TInitalState, payload: TUser | null) => {
  state.user = payload;
  state.isAuthChecked = true;
  state.error = undefined;
};

const isRejectedAction = (action: Action): action is RejectedAction =>
  action.type.endsWith('rejected');

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    userDataSelector: (state) => state.user,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    errorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.fulfilled, (state, action) =>
        fulfilledAction(state, action.payload.user)
      )
      .addCase(updateUserThunk.fulfilled, (state, action) =>
        fulfilledAction(state, action.payload.user)
      )
      .addCase(loginUserThunk.fulfilled, (state, action) =>
        fulfilledAction(state, action.payload)
      )
      .addCase(registerUserThunk.fulfilled, (state, action) =>
        fulfilledAction(state, action.payload)
      )
      .addCase(logoutUserThunk.fulfilled, (state) => {
        fulfilledAction(state, null);
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.error = action.error.message;
        state.isAuthChecked = true;
      });
  }
});

export const { setIsAuthChecked, setUser } = userSlice.actions;

export const { errorSelector, userDataSelector, isAuthCheckedSelector } =
  userSlice.selectors;
