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
});
