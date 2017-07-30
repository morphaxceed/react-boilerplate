
import { fromJS } from 'immutable';
import pageBReducer from '../reducer';

describe('pageBReducer', () => {
  it('returns the initial state', () => {
    expect(pageBReducer(undefined, {})).toEqual(fromJS({}));
  });
});
