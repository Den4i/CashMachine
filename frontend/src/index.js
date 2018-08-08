import React from 'react';
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import { Provider } from "react-redux";
import { ConnectedRouter, routerReducer, routerMiddleware } from "react-router-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";

import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const middleware = routerMiddleware(history);

import Navigation from './components/Navigation'
import cardReducer from "./store/reducers";

const reducers = combineReducers({ cardReducer: cardReducer, router: routerReducer });
const store = createStore(reducers, composeWithDevTools(applyMiddleware(middleware, thunk)));

store.subscribe(() => {
    console.log(store.getState());
});

import '../stylesheets/less/common.less';


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Navigation />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);