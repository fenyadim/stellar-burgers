import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TInitalState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TInitalState = {
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
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients = [...state.ingredients, action.payload];
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item._id !== action.payload
      );
    },
    moveIngredientUp: moveIngredientFunction('up'),
    moveIngredientDown: moveIngredientFunction('down')
  },
  selectors: {
    getBunSelector: (state) => state.bun,
    getIngredientsSelector: (state) => state.ingredients
  }
});

export const { getBunSelector, getIngredientsSelector } =
  burgerConstructorSlice.selectors;
export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp
} = burgerConstructorSlice.actions;
