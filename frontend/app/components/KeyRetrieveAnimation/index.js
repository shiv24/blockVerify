/**
 *
 * KeyRetrieveAnimation
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import VpnKey from '@material-ui/icons/VpnKey';
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
    animation: 'wiggle 1.5s infinite ease-in-out',
  },
});

function KeyRetrieveAnimation(props) {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <VpnKey className={classes.icon} />

      <Typography className={classes.heading} variant="h1" color="inherit">
        <FormattedMessage {...messages.heading} />
      </Typography>

      <CircularProgress className={classes.progress} />
    </div>
  );
}

KeyRetrieveAnimation.propTypes = {};

export default withStyles(styles)(KeyRetrieveAnimation);
