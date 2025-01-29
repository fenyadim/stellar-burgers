import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitalState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | undefined;
};

export const initialFeedsState: TInitalState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: undefined
};

export const getFeedsThunk = createAsyncThunk('feeds/getFeeds', getFeedsApi);

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState: initialFeedsState,
  reducers: {},
  selectors: {
    ordersFeedsSelector: (state) => state.orders,
    totalFeedsSelector: (state) => state.total,
    totalTodayFeedsSelector: (state) => state.totalToday,
    isLoadingFeedsSelector: (state) => state.isLoading,
    errorFeedsSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  }
});

export const {
  ordersFeedsSelector,
  errorFeedsSelector,
  isLoadingFeedsSelector,
  totalFeedsSelector,
  totalTodayFeedsSelector
} = feedsSlice.selectors;
