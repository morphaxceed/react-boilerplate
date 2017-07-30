
import { fromJS } from 'immutable';
import pageAReducer from '../reducer';

describe('pageAReducer', () => {
  it('returns the initial state', () => {
    expect(pageAReducer(undefined, {})).toEqual(fromJS({}));
  });
});
