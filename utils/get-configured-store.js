import createSagaMiddleware from 'redux-saga';
import configureStore from 'redux-mock-store';

function getConfiguredStore(initialState, saga) {
  const sagaMiddleware = createSagaMiddleware();
  const mockStore = configureStore([sagaMiddleware]);
  const reduxStore = mockStore(initialState);
  sagaMiddleware.run(saga);
  return { reduxStore };
}

export default getConfiguredStore;
