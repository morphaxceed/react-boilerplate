import { createSelector } from 'reselect';

/**
 * Direct selector to the pageB state domain
 */
const selectPageBDomain = () => (state) => state.get('pageB');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PageB
 */

const makeSelectPageB = () => createSelector(
  selectPageBDomain(),
  (substate) => substate.toJS()
);

export default makeSelectPageB;
export {
  selectPageBDomain,
};
