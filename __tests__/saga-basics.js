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

test.skip('I understand the call effect', (done) => {
  let names;

  function saveNames(data) {
    names = data.map((name) => `${name.first} ${name.last}`).join(', ');
  }

  function fetchNames() {
    return new Promise((resolve) => {
      resolve([
        { first: 'Bill', last: 'Gates' },
        { first: 'Steve', last: 'Jobs' },
        { first: 'Jeff', last: 'Bezos' },
        { first: 'Elon', last: 'Musk' },
      ]);
    });
  }

  function* saga() {
    // FIX

    // ---

    // keep this:
    try {
      expect(names).toEqual('Bill Gates, Steve Jobs, Jeff Bezos, Elon Musk');
    } catch(err) {
      throw Error(err);
    } finally {
      done();
    }
  }

  const { reduxStore } = getConfiguredStore({}, saga);
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
  let count = 0;
  function incrementCount() {
    count++;
  }

  function* doSomethingAwesome() {
    yield call(incrementCount);
    yield call(incrementCount);
    yield call(incrementCount);
  }

  function* saga() {
    yield takeEvery('SOME_ACTION_TYPE', doSomethingAwesome);
  }

  const { reduxStore } = getConfiguredStore({}, saga);

  reduxStore.dispatch({ type: 'SOME_ACTION_TYPE' });

  expect(count).toBe(); // FIX
});

test.skip('I understand takeEvery', () => {
  const basket = [];

  function* addFruits() {
    yield call(() => basket.push('apple'));
    yield call(() => basket.push('orange'));
    yield call(() => basket.push('kiwi'));
  }

  function addVeggies() {
    basket.push('carrot');
    basket.push('broccoli');
    basket.push('potato');
  }

  // FIX
  function saga() {
  }
  // ---

  const { reduxStore } = getConfiguredStore({}, saga);

  reduxStore.dispatch({ type: 'FRUITS_WANTED' });
  reduxStore.dispatch({ type: 'VEGGIES_WANTED' });
  reduxStore.dispatch({ type: 'FRUITS_WANTED' });

  expect(basket).toEqual([
    'apple', 'orange', 'kiwi',
    'carrot', 'broccoli', 'potato',
    'apple', 'orange', 'kiwi',
  ]);
});

test.skip('I know the basics of redux saga', () => {
  // call fetchData
  // call transform the data
  // put the data somewhere
  expect.assertions(1);

  const getData = () => new Promise((resolve) => {
    resolve('Bill Gates, Steve Jobs, Jeff Bezos, Elon Musk');
  });

  const transformData = (data) => new Promise((resolve) => {
    resolve(
      data.split(', ').map((person) => {
        const nameSegments = person.split(' ');
        return {first: nameSegments[0], last: nameSegments[1]};
      })
    )
  });

  // FIX
  function *handleTrigger() {
  }
  // ---

  function *rootSaga() {
    yield takeEvery('TRIGGER', handleTrigger);
  }

  const { reduxStore } = getConfiguredStore({}, rootSaga);

  const execute = () => new Promise((resolve) => {
    reduxStore.dispatch({type: 'TRIGGER'});
    setTimeout(() => {
      const actions = reduxStore.getActions();
      resolve(actions);
    }, 0);
  });

  const expected = [
    { type: 'TRIGGER' },
    { type: 'NAMES_RETRIEVED', payload: [
      { first: 'Bill', last: 'Gates' },
      { first: 'Steve', last: 'Jobs' },
      { first: 'Jeff', last: 'Bezos' },
      { first: 'Elon', last: 'Musk' },
    ] }
  ];

  return expect(execute()).resolves.toEqual(expected);

});
