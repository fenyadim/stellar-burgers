import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TInitalState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TInitalState = {
  bun: null,
  ingredients: []
};

const moveIngredientFunction =
  (position: 'up' | 'down') =>
  (state: TInitalState, action: PayloadAction<number>) => {
    const [item] = state.ingredients.splice(action.payload, 1);
    if (position === 'down') {
      state.ingredients.splice(action.payload + 1, 0, item);
    } else if (position === 'up') {
      state.ingredients.splice(action.payload - 1, 0, item);
    }
  };

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients = [...state.ingredients, action.payload];
      },
      prepare: (ingredients: TIngredient) => ({
        payload: {
          ...ingredients,
          id: uuidv4()
        }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    clearConstructorData: (state) => {
      (state.bun = null), (state.ingredients = []);
    },
    moveIngredientUp: moveIngredientFunction('up'),
    moveIngredientDown: moveIngredientFunction('down')
  },
  selectors: {
    getBunSelector: (state) => state.bun,
    getIngredientsSelector: (state) => state.ingredients
  }
});

export const { reducer } = burgerConstructorSlice;

export const { getBunSelector, getIngredientsSelector } =
  burgerConstructorSlice.selectors;

export const {
  setBun,
  addIngredient,
  removeIngredient,
  clearConstructorData,
  moveIngredientDown,
  moveIngredientUp
} = burgerConstructorSlice.actions;
