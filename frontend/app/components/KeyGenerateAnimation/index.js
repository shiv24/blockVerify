/**
 *
 * KeyGenerateAnimation
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import PersonIcon from '@material-ui/icons/Person';
import messages from './messages';

const styles = theme => ({
  container: {
    textAlign: 'center',
    padding: '3rem 0',
  },
  heading: {
    fontSize: '1rem',
    marginBottom: '3rem',
  },
  icon: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
});

function KeyGenerateAnimation(props) {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <PersonIcon className={classes.icon} />

      <Typography className={classes.heading} variant="h1" color="inherit">
        <FormattedMessage {...messages.heading} />
      </Typography>

      <CircularProgress className={classes.progress} />
    </div>
  );
}

KeyGenerateAnimation.propTypes = {};

export default withStyles(styles)(KeyGenerateAnimation);
