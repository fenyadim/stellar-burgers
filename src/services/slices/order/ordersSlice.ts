import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
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
  orderNumber: TOrder[] | [];
  error: string | undefined;
};

const initialState: TInitalState = {
  orders: [],
  isLoading: false,
  orderRequest: false,
  orderModal: null,
  orderNumber: [],
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

export const getOrderNumberThunk = createAsyncThunk(
  'orders/getOrderNumber',
  async (number: number) => getOrderByNumberApi(number)
);

const isRejectedAction = (action: Action): action is RejectedAction =>
  action.type.endsWith('rejected');

const isPendingAction = (action: Action) => action.type.endsWith('pending');

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
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
      .addCase(getOrderNumberThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderNumber = action.payload.orders;
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
