import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitalState = {
  items: TOrder[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: TInitalState = {
  items: [],
  isLoading: false,
  hasError: false
};

export const getOrdersThunk = createAsyncThunk('orders/getOrders', () =>
  getFeedsApi()
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        // state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrdersThunk.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  }
});
