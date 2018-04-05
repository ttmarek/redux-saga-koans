test('I know what a generator function is', () => {
  // This is a generator function.
  function* foo() {
    // A generator function is like a regular function except
    // you yield things rather than returning them.
    yield 'goodbye'; // FIX
  }
  // When called, generator functions return Generator objects.
  const gen = foo();
  // Generator objects have a next method which you can call to
  // get the next yielded value.
  const yieldedValue = gen.next();

  // Yielded values from Generator.next() are always plain old objects
  // with two properties.
  // - value: the yielded value (any JavaScript return value)
  // - done: a boolean that is true if there are no remaining yields,
  //         false othwerise.
  expect(yieldedValue).toEqual({
    value: 'goodbye',
    done: false,
  });
});

test('I know what generators yield when there is nothing left to yield', () => {
  function* foo() {
    yield 'hello';
  }

  const gen = foo();
  const firstYield = gen.next();
  const secondYield = gen.next();

  expect(firstYield).toEqual({
    value: 'hello',
    done: false
  });

  expect(secondYield).toEqual({
    value: undefined,
    done: true,
  });
});

test('I know how to create a generator function', () => {
  // FIX
  function* foo() {
    yield 'hello'
    yield 'world'
  }
  // ---

  // Tip: You need to turn the above regular function into a generator
  // function, then you need to yield things from it.

  const gen = foo();

  const firstYield = gen.next();
  const secondYield = gen.next();
  const thirdYield = gen.next();

  expect(firstYield).toEqual({
    value: 'hello',
    done: false,
  });

  expect(secondYield).toEqual({
    value: 'world',
    done: false,
  });

  expect(thirdYield).toEqual({
    value: undefined,
    done: true,
  });
});

test('I know what gets executed when I call the next() method', () => {
  // When the next() method is called, the generator function
  // body is executed up to the next yield.

  const someArray = [];

  // FIX
  function* foo() {
    someArray.push('a');
    yield 'hello';
    someArray.push('b')
    yield
    someArray.push('c');
  }
  // ---

  const gen = foo();

  expect(someArray.length).toBe(0);
  expect(someArray).toEqual([]);

  gen.next();

  expect(someArray.length).toBe(1);
  expect(someArray).toEqual(['a']);

  gen.next();

  expect(someArray.length).toBe(2);
  expect(someArray).toEqual(['a', 'b']);

  gen.next();

  expect(someArray.length).toBe(3);
  expect(someArray).toEqual(['a', 'b', 'c']);
});

test('I know what Generator.return() does', () => {
  function* foo() {
    yield 'hello';
    yield 'world';
  }

  const gen = foo();

  expect(gen.next()).toEqual({
    value: 'hello',
    done: false,
  });

  // FIX
  // hint: executing the return method finishes the generator. Any yields left in the
  // generator will be ignored. It will be as if they never existed :(
  gen.return()
  // ---

  expect(gen.next()).toEqual({
    value: undefined,
    done: true,
  });
});

test('I know that I can yield functions from a generator', () => {
  function* foo() {
    yield function sayHello() {
      return 'hello'; // FIX
    };
    yield function sayWorld() {
      return 'world'
    }// FIX
  }

  const gen = foo();

  const sayHello = gen.next().value; // FIX
  const sayWorld = gen.next().value; // FIX

  expect(sayHello() + ' ' + sayWorld()).toEqual('hello world');
});

test('I know that you can wrap yields in conditionals and loops', () => {
  let addOrange;

  function* foo() {
    for(let i = 0; i <= 1; i++) { // FIX
      yield 'apple';
    }
    if (addOrange) {
      yield 'orange';
    } else {
      yield 'kiwi';
    }
  }

  const gen = foo();
  const fruitBasket = [];

  addOrange = false; // FIX

  while(true) {
    const nextYield = gen.next();
    if (nextYield.done) break;
    fruitBasket.push(nextYield.value);
  }

  expect(fruitBasket).toEqual(['apple', 'apple', 'kiwi']);
});

test('I know that I can wrap yields in an infinite while loop', () => {

  function* sayHi() {
    while(true) { // FIX
      yield 'hi';
    }
  }

  const gen = sayHi();

  for (let i = 0; i < 99; i++) { // EXPERIMENT
    gen.next();
  }

  const hundredth = gen.next();

  expect(hundredth.value).toBe('hi');
  expect(hundredth.done).toBe(false);
});

test('I am comfortable with generators', () => {
  const fruits = [];
  // FIX
  function* foo() {
    yield 'apple'
    fruits.push('orange')
    yield () => 'kiwi'
    fruits.push('pineapple')
  }
  // ---

  const gen = foo();

  expect(fruits).toEqual([]);

  const firstYieldedValue = gen.next().value;
  expect(firstYieldedValue).toBe('apple');

  expect(fruits).toEqual([]);

  const secondYieldedValue = gen.next().value;
  expect(secondYieldedValue()).toBe('kiwi');

  expect(fruits).toEqual(['orange']);

  const lastYield = gen.next();

  expect(fruits).toEqual(['orange', 'pineapple']);

  expect(lastYield).toEqual({ value: undefined, done: true });
});
