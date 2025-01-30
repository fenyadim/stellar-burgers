import store, { rootReducer } from './store';

describe('Тестирование rootReducer', () => {
  test('Инициализация', () => {
    const state = rootReducer(undefined, { type: 'INIT' });
    expect(state).toEqual(store.getState());
  });
  test('Возвращение начального состояния', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(store.getState());
  });
});
