import { getOrdersApi, orderBurgerApi } from '@api';
import { Action, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clearConstructorData } from '@slices';
import { TOrder } from '@utils-types';

interface RejectedAction extends Action {
  error: Error;
}

type TInitalState = {
  orders: TOrder[];
  isLoading: boolean;
  orderRequest: boolean;
  orderModal: TOrder | null;
  error: string | undefined;
};

export const initialOrdersState: TInitalState = {
  orders: [],
  isLoading: false,
  orderRequest: false,
  orderModal: null,
  error: undefined
};

export const getOrdersThunk = createAsyncThunk(
  'orders/getOrders',
  getOrdersApi
);

export const createOrderThunk = createAsyncThunk(
  'orders/createOrder',
  async (data: string[], { dispatch }) =>
    orderBurgerApi(data).then((res) => {
      dispatch(clearConstructorData());
      return res;
    })
);

const isRejectedAction = (action: Action): action is RejectedAction =>
  action.type.endsWith('rejected');

const isPendingAction = (action: Action) => action.type.endsWith('pending');

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialOrdersState,
  reducers: {
    clearOrder: (state) => {
      state.orderModal = null;
    }
  },
  selectors: {
    getOrders: (state) => state.orders,
    getOrderRequest: (state) => state.orderRequest,
    getOrderModal: (state) => state.orderModal
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(createOrderThunk.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderModal = action.payload.order;
        state.orderRequest = false;
      })
      .addMatcher(isPendingAction, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearOrder } = ordersSlice.actions;
export const { getOrders, getOrderRequest, getOrderModal } =
  ordersSlice.selectors;
