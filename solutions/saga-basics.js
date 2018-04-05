test('I know the basics of redux saga', () => {
  // call fetchData
  // call transform the data
  // put the data somewhere

  const getData = () => Promise.resolve(
    'Bill Gates, Steve Jobs, Jeff Bezos, Elon Musk'
  );
  const transformData = (data) => Promise.resolve(
    data.split(', ').map(person => {
      const nameSegments = person.split(' ')
      return { first: nameSegments[0], last: nameSegments[1] }
    })
  );

  function* handleTrigger() {
    const names = yield call(getData); // FIX
    const namesAsObj = yield call(transformData, names); // FIX
    yield put({ type: 'NAMES_RETRIEVED', payload: namesAsObj });
  }

  function* watchTriggeringAction() {
    yield takeEvery('TRIGGER', handleTrigger); // FIX
  }

  function* rootSaga() {
    yield call(watchTriggeringAction);
  }

  const { reduxStore } = getConfiguredStore({}, rootSaga);

  const expectedActions = [
    { type: 'TRIGGER' },
    {
      type: 'NAMES_RETRIEVED',
      payload: [
        {first: 'Bill', last: 'Gates'},
        {first: 'Steve', last: 'Jobs'},
        {first: 'Jeff', last: 'Bezos'},
        {first: 'Elon', last: 'Musk'}
    ]}
  ]

  reduxStore.subscribe(() => {
    const actions = reduxStore.getActions()

    if (actions.length >= expectedActions.length) {
      expect(actions).toEqual(expectedActions)
    }
  })

  reduxStore.dispatch({ type: 'TRIGGER' })
});
