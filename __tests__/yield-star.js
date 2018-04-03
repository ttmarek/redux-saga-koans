import {
  put,
  call,
  takeEvery,
} from 'redux-saga/effects';
import getConfiguredStore from '../utils/get-configured-store';


test.skip('...', () => {

  const fruits = [];

  function* sagaA(arrayOfFruits) {
    for (let i = 0; i < arrayOfFruits.length; i++) {
      yield fruits.push(arrayOfFruits[i]);
    }
  }

  function* sagaB() {
    yield fruits.push('banana');
    // yield call(sagaA, ['apple', 'kiwi', 'pineapple']);
    // yield* sagaA(['apple', 'kiwi', 'pineapple']);
    // yield sagaA(['apple', 'kiwi', 'pineapple']);
    yield fruits.push('mango');
  }

  const { reduxStore } = getConfiguredStore({}, sagaB);

  expect(fruits).toEqual([
    'banana',
    'apple',
    'kiwi',
    'pineapple',
    'mango',
  ]);
});
