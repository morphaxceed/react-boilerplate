import { createSelector } from 'reselect';

/**
 * Direct selector to the pageA state domain
 */
const selectPageADomain = () => (state) => state.get('pageA');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PageA
 */

const makeSelectPageA = () => createSelector(
  selectPageADomain(),
  (substate) => substate.toJS()
);

export default makeSelectPageA;
export {
  selectPageADomain,
};
