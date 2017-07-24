import {
  put,
  call,
  takeEvery,
} from 'redux-saga/effects';
import getConfiguredStore from '../utils/get-configured-store';

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

test.skip('I know what `call` does', () => {
  let fruitBasket = [];

  function addToFruitBasket(...fruit) {
    fruitBasket = [...fruitBasket, ...fruit];
  }

  function* saga() {
    yield call(addToFruitBasket, 'apple');
    yield call(addToFruitBasket, 'orange', 'pineapple');
    yield call(addToFruitBasket); // FIX
  }

  const { reduxStore } = getConfiguredStore({}, saga);

  expect(fruitBasket).toEqual(['apple', 'orange', 'pineapple', 'kiwi']);
  // Try adding a few more fruit to the fruit basket
});

test.skip('I know that you can use returned values from a `call`', () => {

  function addToFruitBasket(basket, ...fruit) {
    return [...basket, ...fruit];
  }

  function* saga() {
    const basket1 = yield call(addToFruitBasket, [], 'apple');
    const basket2 = yield call(addToFruitBasket, basket1, 'orange', 'pineapple');
    const basket3 = yield call(addToFruitBasket, basket2, 'kiwi');
    expect(basket3).toEqual([]); // FIX
  }

  const { reduxStore } = getConfiguredStore({}, saga);
});

test.skip('I know that you can `call` other generators', () => {

  function* dispatchFruit(fruit) {
    yield put({ type: 'FRUIT_ADDED', payload: fruit });
  }

  function* saga() {
    yield call(dispatchFruit, 'apple');
    yield call(dispatchFruit, 'orange');
  }

  const { reduxStore } = getConfiguredStore({}, saga);
  const actions = reduxStore.getActions();

  expect(actions).toEqual([]); // FIX
});

test.skip('I know that you can `call` functions that return promises', (done) => {
  const responseData = {
    weight: 1,
    fruits: ['apple', 'orange'],
  };

  function fetchFruitBasket() {
    return new Promise((resolve) => {
      resolve(responseData);
    });
  }

  function* saga() {
    const fruitBasket = yield call(fetchFruitBasket);
    expect(fruitBasket).toEqual(); // FIX
    done();
  }

  const { reduxStore } = getConfiguredStore({}, saga);
});

test.skip('I understand the call effect', () => {


  // FIX
  function saga() {
  }
  // ----

  const { reduxStore } = getConfiguredStore({}, saga);

  expect().toEqual();
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

  reduxStore.dispatch({ type: 'SOME_ACTION_TYPE' });
  reduxStore.dispatch({ type: 'SOME_ACTION_TYPE' });

  expect(count).toBe(); // FIX
});

test.skip('I know that you can pass a generator to `takeEvery`', () => {
});

test.skip('I know how to use `put`, `takeEvery` and `call` together', (done) => {
  function *doAwesomeThings() {
  }

  function *watchTriggeringAction() {
    yield takeEvery('TRIGGER', doAwesomeThings);
  }

  const { reduxStore } = getConfiguredStore({}, watchTriggeringAction);

  reduxStore.dispatch({ type: 'TRIGGER' });
  reduxStore.dispatch({ type: 'TRIGGER' });
  reduxStore.dispatch({ type: 'TRIGGER' });
});

test.skip('I know the basics of redux saga', () => {
});
