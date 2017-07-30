/*
 *
 * PageA
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectPageA from './selectors';
import messages from './messages';

export class PageA extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />

        <br />
        <button onClick={() => this.props.dispatch({ type: 'test-action' })} style={{ backgroundColor: 'red' }}>Generate a 'test-action'</button>
      </div>
    );
  }
}

PageA.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  PageA: makeSelectPageA(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageA);
