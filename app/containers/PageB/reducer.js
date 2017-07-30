/*
 *
 * PageB reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({});

function pageBReducer(state = initialState, action) {
	console.log(new Date(), 'PageB reducer')
  switch (action.type) {
    case 'test-action':
    	console.log(new Date(), 'PageB "test-action"')
      return state;
    default:
      return state;
  }
}

export default pageBReducer;
