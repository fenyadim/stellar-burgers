import { feedsSlice, getFeedsThunk, initialFeedsState } from './feedsSlice';

const mockFeeds = [
  {
    _id: '6798d9af133acd001be4d2ab',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa094a',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Астероидный флюоресцентный spicy био-марсианский бургер',
    createdAt: '2025-01-28T13:20:47.805Z',
    updatedAt: '2025-01-28T13:20:48.518Z',
    number: 67115
  },
  {
    _id: '6798cb2c133acd001be4d29a',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный space бургер',
    createdAt: '2025-01-28T12:18:52.600Z',
    updatedAt: '2025-01-28T12:18:53.329Z',
    number: 67114
  },
  {
    _id: '67989739133acd001be4d262',
    ingredients: ['643d69a5c3f7b9001cfa093d'],
    status: 'done',
    name: 'Флюоресцентный бургер',
    createdAt: '2025-01-28T08:37:13.393Z',
    updatedAt: '2025-01-28T08:37:14.034Z',
    number: 67113
  },
  {
    _id: '67987d78133acd001be4d245',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2025-01-28T06:47:20.109Z',
    updatedAt: '2025-01-28T06:47:20.729Z',
    number: 67112
  },
  {
    _id: '67987caa133acd001be4d243',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2025-01-28T06:43:54.066Z',
    updatedAt: '2025-01-28T06:43:54.721Z',
    number: 67111
  }
];

describe('Тестирование экшена getIngredients', () => {
  test('Pending process', () => {
    const action = { type: getFeedsThunk.pending.type };
    const state = feedsSlice.reducer(initialFeedsState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(undefined);
  });
  test('Fulfilled process', () => {
    const data = {
      total: 100,
      totalToday: 10,
      orders: mockFeeds
    };
    const action = { type: getFeedsThunk.fulfilled.type, payload: data };
    const state = feedsSlice.reducer(initialFeedsState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(undefined);
    expect(state.orders).toEqual(data.orders);
  });
  test('Rejected process', () => {
    const action = {
      type: getFeedsThunk.rejected.type,
      error: { message: 'error' }
    };
    const state = feedsSlice.reducer(initialFeedsState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('error');
  });
});
