import {
  put,
  call,
  takeEvery,
} from 'redux-saga/effects';
import getConfiguredStore from '../utils/get-configured-store';


test('I know that yield* delegates the yielding to another function', () => {
  function* sagaA(arrayOfFruits) {
    for (let i = 0; i < arrayOfFruits.length; i++) {
      yield arrayOfFruits[i];
    }
  }

  function* sagaB() {
    yield 'banana';
    // FIX
    yield 'mango';
  }

  const fruits = [];
  for (let fruit of sagaB()) {
    fruits.push(fruit);
  }

  expect(fruits).toEqual([
    'banana',
    'apple',
    'kiwi',
    'pineapple',
    'mango',
  ]);
});
