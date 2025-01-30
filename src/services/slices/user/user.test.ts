import { getUserThunk } from './action';
import { initialUserState, setUser, userSlice } from './userSlice';

const mockUser = {
  email: 'test@mail.ru',
  name: 'Виктор'
};

describe('Тестирование user', () => {
  describe('Тестирование экшена getUser', () => {
    test('Fulfilled process', () => {
      const action = {
        type: getUserThunk.fulfilled.type,
        payload: { user: mockUser }
      };
      const state = userSlice.reducer(initialUserState, action);
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe(undefined);
      expect(state.user).toEqual(mockUser);
    });
    test('Rejected process', () => {
      const action = {
        type: getUserThunk.rejected.type,
        error: { message: 'error' }
      };
      const state = userSlice.reducer(initialUserState, action);
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe('error');
    });
  });
  test('Тестирование редьюсера setUser', () => {
    const newState = userSlice.reducer(initialUserState, setUser(mockUser));
    const { user } = newState;
    expect(user).toEqual(mockUser);
  });
  // describe('Тестирование экшена createOrder', () => {
  //   test('Pending process', () => {
  //     const action = { type: createOrderThunk.pending.type };
  //     const state = ordersSlice.reducer(initialOrdersState, action);
  //     expect(state.isLoading).toBe(true);
  //     expect(state.error).toBe(undefined);
  //     expect(state.orderRequest).toBe(true);
  //   });
  //   test('Fulfilled process', () => {
  //     const mockData = [
  //       '643d69a5c3f7b9001cfa093c',
  //       '643d69a5c3f7b9001cfa0941',
  //       '643d69a5c3f7b9001cfa0941',
  //       '643d69a5c3f7b9001cfa0941',
  //       '643d69a5c3f7b9001cfa0941',
  //       '643d69a5c3f7b9001cfa0941',
  //       '643d69a5c3f7b9001cfa093c'
  //     ];
  //     const action = {
  //       type: createOrderThunk.fulfilled.type,
  //       payload: { order: mockData }
  //     };
  //     const state = ordersSlice.reducer(initialOrdersState, action);
  //     expect(state.isLoading).toBe(false);
  //     expect(state.error).toBe(undefined);
  //     expect(state.orderModal).toEqual(mockData);
  //     expect(state.orderRequest).toBe(false);
  //   });
  //   test('Rejected process', () => {
  //     const action = {
  //       type: createOrderThunk.rejected.type,
  //       error: { message: 'error' }
  //     };
  //     const state = ordersSlice.reducer(initialOrdersState, action);
  //     expect(state.isLoading).toBe(false);
  //     expect(state.error).toBe('error');
  //   });
  // });
});
