import {
  createOrderThunk,
  getOrdersThunk,
  initialOrdersState,
  ordersSlice
} from './ordersSlice';

const mockOrders = [
  {
    _id: '678793d3133acd001be4a681',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный био-марсианский бургер',
    createdAt: '2025-01-15T10:54:11.135Z',
    updatedAt: '2025-01-15T10:54:12.043Z',
    number: 65539
  },
  {
    _id: '67879480133acd001be4a684',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный бессмертный бургер',
    createdAt: '2025-01-15T10:57:04.163Z',
    updatedAt: '2025-01-15T10:57:05.049Z',
    number: 65540
  }
];

describe('Тестирование orders', () => {
  describe('Тестирование экшена getOrders', () => {
    test('Pending process', () => {
      const action = { type: getOrdersThunk.pending.type };
      const state = ordersSlice.reducer(initialOrdersState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(undefined);
    });
    test('Fulfilled process', () => {
      const action = {
        type: getOrdersThunk.fulfilled.type,
        payload: mockOrders
      };
      const state = ordersSlice.reducer(initialOrdersState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(undefined);
      expect(state.orders).toEqual(mockOrders);
    });
    test('Rejected process', () => {
      const action = {
        type: getOrdersThunk.rejected.type,
        error: { message: 'error' }
      };
      const state = ordersSlice.reducer(initialOrdersState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('error');
    });
  });
  describe('Тестирование экшена createOrder', () => {
    test('Pending process', () => {
      const action = { type: createOrderThunk.pending.type };
      const state = ordersSlice.reducer(initialOrdersState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(undefined);
      expect(state.orderRequest).toBe(true);
    });
    test('Fulfilled process', () => {
      const mockData = [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ];
      const action = {
        type: createOrderThunk.fulfilled.type,
        payload: { order: mockData }
      };
      const state = ordersSlice.reducer(initialOrdersState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(undefined);
      expect(state.orderModal).toEqual(mockData);
      expect(state.orderRequest).toBe(false);
    });
    test('Rejected process', () => {
      const action = {
        type: createOrderThunk.rejected.type,
        error: { message: 'error' }
      };
      const state = ordersSlice.reducer(initialOrdersState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('error');
    });
  });
});
