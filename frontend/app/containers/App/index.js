/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from 'components/Navigation';
import HomePage from 'containers/HomePage/Loadable';
import LookupItemPage from 'containers/LookupItemPage/Loadable';
import CreateItemPage from 'containers/CreateItemPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <Fragment>
      <Navigation />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/items/lookup" component={LookupItemPage} />
        <Route exact path="/items/create" component={CreateItemPage} />
        <Route component={NotFoundPage} />
      </Switch>

      <GlobalStyle />
    </Fragment>
  );
}
