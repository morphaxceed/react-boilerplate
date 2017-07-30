import conformsTo from 'lodash/conformsTo';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import invariant from 'invariant';
import warning from 'warning';

import createReducer from '../reducers';

/**
 * Validate the shape of redux store
 */
export function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    asyncReducers: isObject,
  };
  invariant(
    conformsTo(store, shape),
    '(app/utils...) asyncInjectors: Expected a valid redux store'
  );
}

/**
 * Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer(store, isValid) {
  return function injectReducer(name, asyncReducer) {
    if (!isValid) checkStore(store);

    invariant(
      isString(name) && !isEmpty(name) && isFunction(asyncReducer),
      '(app/utils...) injectAsyncReducer: Expected `asyncReducer` to be a reducer function'
    );

    // if (Reflect.has(store.asyncReducers, name)) return;

    // store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign

    // Try 1
    // This approach gets selectors to be executed with an 'undefined' state.

    // Object.keys(store.asyncReducers).forEach(function(key) { delete store.asyncReducers[key]; });
    // store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign

    // store.asyncReducers = {
    //   [name]: asyncReducer
    // }

    // Try 2 (also disabling the above `Reflect.has()` call)
    // This approach gets 'webpack:///./~/redux-immutable/dist/combineReducers.js?:39' (that is 'reducerKeys.forEach(function (reducerName) {...}' handler) to get 'currentDomainState' as 'undefined', thus making the disabled version (below handler) return an 'undefined'.

    // Disabled all reducers we know so far
    Object.keys(store.asyncReducers).forEach(function(key) { store.asyncReducers[key] = (state) => state });
    // Enable on the reducer we've just got
    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign

    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

/**
 * Inject an asynchronously loaded saga
 */
export function injectAsyncSagas(store, isValid) {
  return function injectSagas(sagas) {
    if (!isValid) checkStore(store);

    invariant(
      Array.isArray(sagas),
      '(app/utils...) injectAsyncSagas: Expected `sagas` to be an array of generator functions'
    );

    warning(
      !isEmpty(sagas),
      '(app/utils...) injectAsyncSagas: Received an empty `sagas` array'
    );

    sagas.map(store.runSaga);
  };
}

/**
 * Helper for creating injectors
 */
export function getAsyncInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectAsyncReducer(store, true),
    injectSagas: injectAsyncSagas(store, true),
  };
}
