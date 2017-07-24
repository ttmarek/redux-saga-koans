import {
  put,
  takeEvery,
} from 'redux-saga/effects';
import getConfiguredStore from '../utils/get-configured-store';

// - all redux effects have to be yielded

test.skip('I know what a saga is', () => {
  // A saga is a generator.

  const fruits = [];

  function* saga() {
    fruits.push('apple');
    yield;
    fruits.push('orange');
    yield;
    fruits.push('kiwi');
  }

  // FYI: getConfiguredStore is a utility function unique to these koans.
  // The function accepts an initial state, and a saga. The function
  // returns a mock Redux store configured with the redux-saga
  // middleware.
  const { reduxStore } = getConfiguredStore({}, saga);

  expect(fruits).toEqual(); // FIX
});

test.skip('I know what `put` is and how to use it', () => {

  function* saga() {
    yield put({ type: 'FRUIT' }); // FIX
  }

  const { reduxStore } = getConfiguredStore({}, saga);
  const actions = reduxStore.getActions();

  expect(actions).toEqual([
    { type: 'FRUIT', payload: 'apple' }
  ]);
});

test.skip('I know that I can dispatch multiple actions from a saga', () => {

  function* saga() {
    yield put({ type: 'FRUIT', payload: 'apple' });
    yield; // FIX
  }

  const { reduxStore } = getConfiguredStore({}, saga);
  const actions = reduxStore.getActions();

  expect(actions).toEqual([
    { type: 'FRUIT', payload: 'apple' },
    { type: 'FRUIT', payload: 'orange' },
  ]);
});

test.skip('I know what `takeEvery` does', () => {

  let count = 0;
  function incrementCount() {
    count++;
  }

  function* saga() {
    yield takeEvery('SOME_ACTION_TYPE', incrementCount);
  }

  const { reduxStore } = getConfiguredStore({}, saga);
  const actions = reduxStore.getActions();

  reduxStore.dispatch({ type: 'SOME_ACTION_TYPE' });
  reduxStore.dispatch({ type: 'SOME_ACTION_TYPE' });

  expect(count).toBe(); // FIX
});
