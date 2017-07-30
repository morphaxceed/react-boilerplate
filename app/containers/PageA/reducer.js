/*
 *
 * PageA reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({});

function pageAReducer(state = initialState, action) {
	console.log(new Date(), 'PageA reducer')
  switch (action.type) {
    case 'test-action':
    	console.log(new Date(), 'PageA "test-action"')
      return state;
    default:
      return state;
  }
}

export default pageAReducer;
