import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TConstructor = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

type TInitalState = {
  constructorItems: TConstructor;
  orderRequest: boolean;
  error: string | undefined;
};

const initialState: TInitalState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  error: undefined
};

export const getOrdersThunk = createAsyncThunk('orders/getOrders', () =>
  getOrdersApi()
);

export const createOrderThunk = createAsyncThunk(
  'orders/createOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setIngredientToOrder: (state, action) => {
      state.constructorItems.ingredients = [
        ...state.constructorItems.ingredients,
        action.payload
      ];
    },
    setBunToOrder: (state, action) => {
      state.constructorItems.bun = action.payload;
    }
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.pending, (state) => {})
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        // state.order = action.payload;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const { getConstructorItems, getOrderRequest } = ordersSlice.selectors;
export const { setIngredientToOrder, setBunToOrder } = ordersSlice.actions;
