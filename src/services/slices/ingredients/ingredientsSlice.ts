import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TInitalState = {
  items: TIngredient[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: TInitalState = {
  items: [],
  isLoading: false,
  hasError: false
};

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  () => getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    ingredientsSelector: (state) => state.items,
    isIngredientsLoadingSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(getIngredientsThunk.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  }
});

export const { ingredientsSelector, isIngredientsLoadingSelector } =
  ingredientsSlice.selectors;
