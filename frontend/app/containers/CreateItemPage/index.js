/**
 *
 * CreateItemPage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import QrReader from 'react-qr-reader';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import blockchainFunctions from '../../../../backend/index';
import messages from './messages';

const styles = theme => ({
  container: {
    padding: '1rem 0',
    height: '100%',
  },
  textContainer: {
    margin: '1rem 0',
    padding: '0 1rem',
    transition: 'all .4s ease-in',
    opacity: 1,
  },
  field: {
    margin: '1rem 0',
  },
  textSuccess: {
    color: '#279f27',
  },
  textError: {
    color: '#dd0909',
  },
  textMuted: {
    color: 'rgba(0, 0, 0, 0.35)',
  },
  qrcode: {
    width: '100%',
    height: 'auto',
  },
  progress: {
    display: 'block',
    margin: '2rem auto',
  },
  button: {
    display: 'block',
    margin: '1rem auto 2rem',
  },
  successAnimation: {
    transition: 'all 0.8s ease',
  },
});

/* eslint-disable react/prefer-stateless-function */
export class CreateItemPage extends React.Component {
  state = {
    name: '',
    description: '',
    uid: null,
    isLoadingLookup: false,
    lookupError: false,
    success: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      name,
      description,
      uid,
    } = this.state;
    if (!name || !uid) {
      return;
    }

    this.setState({
      success: false,
      transaction: null,
    });
    try {
      const address = blockchainFunctions.address;
      const result = blockchainFunctions.createItem(address, Number(uid), name, description);
      console.log('blockchainFunctions.createItem', result);
      this.setState({
        success: true,
        transaction: result,
      });
    } catch (err) {
      console.error(err);
    }
  }

  handleScan = (value) => {
    if (!value) { return; }
    const {
      intl,
    } = this.props;
    this.setState({
      uid: null,
      isLoadingLookup: true,
    });
    const result = blockchainFunctions.getItemById(value);
    console.log('blockchainFunctions.getItemById', result);
    if (result) {
      this.setState({
        uid: null,
        isLoadingLookup: false,
        lookupError: intl.formatMessage(messages['uidConflict']),
      });
    } else {
      this.setState({
        uid: value,
        isLoadingLookup: false,
        lookupError: null,
      });
    }
  }

  render() {
    const {
      intl,
      classes,
      history,
    } = this.props;
    const {
      name,
      description,
      uid,
      isLoadingLookup,
      lookupError,
      transaction,
      success,
    } = this.state;
    return (
      <div className={classes.container}>
        <Helmet>
          <title>Create Item</title>
        </Helmet>

        <form
          onSubmit={this.handleSubmit}
          className={classes.textContainer}
          style={{ display: success ? 'none' : ''}}
        >
          <Typography variant="h6" color="inherit">
            <FormattedMessage {...messages.heading} />
          </Typography>

          <TextField
            id="item-name"
            type="text"
            className={classes.field}
            placeholder={intl.formatMessage(messages.nameLabel)}
            onChange={({ target }) => this.setState({ name: target.value })}
            value={name}
            fullWidth
            required
          />
          <TextField
            id="item-description"
            type="text"
            className={classes.field}
            placeholder={intl.formatMessage(messages.descriptionLabel)}
            onChange={({ target }) => this.setState({ description: target.value })}
            value={description}
            multiline
            fullWidth
          />
          {!uid && (
            <Fragment>
              {(!isLoadingLookup && !lookupError) && (
                <Fragment>
                  <p className={classes.textMuted} style={{ marginBottom: 0 }}>
                    <FormattedMessage {...messages.uidLabel} />
                  </p>
                  <QrReader
                    className={classes.qrcode}
                    delay={500}
                    onScan={this.handleScan}
                    onError={(err) => console.error(err)}
                  />
                </Fragment>
              )}
              {isLoadingLookup && (
                <CircularProgress className={classes.progress} />
              )}
              {lookupError && (
                <Fragment>
                  <p
                    className={classes.textContainer + ' ' + classes.textError}
                    style={{ padding: 0 }}
                  >
                    {lookupError}
                  </p>

                  <Button
                    variant="contained"
                    color="secondary"
                    type="button"
                    className={classes.button}
                    onClick={() => this.setState({ uid: null, lookupError: null })}
                    style={{ marginLeft: '0' }}
                  >
                    <FormattedMessage {...messages.rescan} />
                  </Button>
                </Fragment>
              )}
            </Fragment>
          )}
          {uid && (
            <Fragment>
              <p
                className={classes.textContainer + ' ' + classes.textSuccess}
                style={{ padding: 0 }}
              >
                <FormattedMessage {...messages.uidOk} />
              </p>

              <Button
                variant="contained"
                color="secondary"
                type="button"
                className={classes.button}
                onClick={() => this.setState({ uid: null, lookupError: null })}
                style={{ marginLeft: '0' }}
              >
                <FormattedMessage {...messages.rescan} />
              </Button>
            </Fragment>
          )}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
            style={{ marginRight: '0' }}
          >
            <FormattedMessage {...messages.save} />
          </Button>
        </form>

        <div className={classes.textContainer + ' ' + classes.successAnimation} style={{ opacity: success ? 1 : 0}}>
          <Typography variant="h6" color="inherit">
            <FormattedMessage {...messages.successHeading} />
          </Typography>

          <p
            style={{ overflowWrap: 'break-word' }}
          >
            <FormattedMessage {...messages.successDescription} />
          </p>

          <p
            className={classes.textSuccess}
            style={{ overflowWrap: 'break-word' }}
          >
            Transaction <code>{transaction}</code>
          </p>

          <Button
            variant="contained"
            color="primary"
            type="button"
            className={classes.button}
            style={{ marginRight: '0' }}
            onClick={() => history.push('/')}
          >
            <FormattedMessage {...messages.done} />
          </Button>
        </div>
      </div>
    );
  }
}

CreateItemPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default withRouter(compose(withConnect)(injectIntl(withStyles(styles)(CreateItemPage))));
