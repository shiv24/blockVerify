/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import VerifyIcon from '@material-ui/icons/PhotoCamera';

import messages from './messages';

const styles = theme => ({
  container: {
    padding: '1rem',
    height: '100%',
  },
  addFab: {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
  },
  verifyFab: {
    position: 'fixed',
    bottom: '5rem',
    right: '1rem',
  },
});

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  render() {
    const {
      history,
      classes,
    } = this.props;
    return (
      <div className={classes.container}>
        <Typography variant="h6" color="inherit" noWrap>
          <FormattedMessage {...messages.heading} />
        </Typography>

        <Button
          variant="fab"
          color="primary"
          aria-label="Add"
          className={classes.addFab}
          onClick={() => { history.push('/items/create') }}
        >
          <AddIcon />
        </Button>

        <Button
          variant="fab"
          color="primary"
          aria-label="Verify"
          className={classes.verifyFab}
          onClick={() => { history.push('/items/lookup') }}
        >
          <VerifyIcon />
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
