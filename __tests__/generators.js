test.skip('I know what a generator function is', () => {
  // This is a generator function.
  function* foo() {
    // A generator function is like a regular function except
    // you yield things rather than returning them.
    yield 'hello';
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
    value: '', // FIX
    done: '', // FIX
  });
});

test.skip('I know what generators yield when there is nothing left to yield', () => {
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
    value: '', // FIX
    done: '', // FIX
  });
});

test.skip('I know how to create a generator function', () => {
  // FIX
  function foo() {
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

test.skip('I know what gets executed when I call the next() method', () => {
  // When the next() method is called, the generator function
  // body is executed up to the next yield.

  const someArray = [];

  function* foo() {
    someArray.push('a');
    yield 'hello';
    someArray.push('b');
    yield 'world';
    someArray.push('c');
  }

  const gen = foo();

  expect(someArray.length).toBe(0);
  expect(someArray).toEqual([]);

  gen.next();

  expect(someArray.length).toBe(1);
  expect(someArray).toEqual(['a']);

  gen.next();

  expect(someArray.length).toBe(2);
  expect(someArray).toEqual(); // FIX

  gen.next();

  expect(someArray.length).toBe(); // FIX
  expect(someArray).toEqual(); // FIX
});

test.skip('I know what Generator.return() does', () => {
  function* foo() {
    yield 'hello';
    yield 'world';
  }

  const gen = foo();

  expect(gen.next()).toEqual({
    value: 'hello',
    done: false,
  });

  // The return method finishes the generator. Any yields left in the
  // generator will be ignored. It will be as if they never existed :(
  gen.return();

  expect(gen.next()).toEqual({
    value: '', // FIX
    done: '', // FIX
  });
});

test.skip('I know that I can yield funtions from a generator', () => {
  function* foo() {
    yield function sayHello() {
      return 'hello';
    };
    yield function sayWorld() {
      return; // FIX
    };
  }

  const gen = foo();

  const sayHello = gen.next().value;
  const sayWorld = gen.next().value;

  expect(sayHello() + ' ' + sayWorld()).toEqual('world'); // FIX
});

test.skip('I am comfortable with generators', () => {
  const fruits = [];
  // FIX
  function foo() {
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
